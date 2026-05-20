from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Barber, Service, Appointment
from datetime import date, timedelta
import json


class TrimlyAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser', password='testpass123', email='test@example.com'
        )
        self.barber = Barber.objects.create(
            name='TestBarber',
            specialties='Haircuts, Beard Trims',
            phone='9803184863',
            is_available=True,
        )
        self.service = Service.objects.create(
            name='Classic Haircut',
            duration_minutes=30,
            price='35.00',
            description='Classic haircut service',
        )
        self.future_date = str(date.today() + timedelta(days=3))
        self.past_date = str(date.today() - timedelta(days=1))

    def _post(self, url, data):
        return self.client.post(url, json.dumps(data), content_type='application/json')

    # ── Routes ──────────────────────────────────────────────────────────────

    def test_get_routes(self):
        r = self.client.get('/api/routes/')
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)

    # ── Barbers & Services ───────────────────────────────────────────────────

    def test_get_barbers(self):
        r = self.client.get('/api/barbers/')
        self.assertEqual(r.status_code, 200)
        names = [b['name'] for b in r.json()]
        self.assertIn('TestBarber', names)

    def test_get_services(self):
        r = self.client.get('/api/services/')
        self.assertEqual(r.status_code, 200)
        names = [s['name'] for s in r.json()]
        self.assertIn('Classic Haircut', names)

    # ── Appointments (all) ───────────────────────────────────────────────────

    def test_get_appointments_unauthenticated(self):
        r = self.client.get('/api/appointments/')
        self.assertEqual(r.status_code, 401)

    def test_get_appointments_authenticated_only_own(self):
        other = User.objects.create_user(username='other', password='pass')
        Appointment.objects.create(
            customer=other, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='09:00',
            customer_phone='9803184863',
        )
        self.client.force_login(self.user)
        r = self.client.get('/api/appointments/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(len(r.json()), 0)  # user's own appointments only

    # ── My Appointments ──────────────────────────────────────────────────────

    def test_get_my_appointments_unauthenticated(self):
        r = self.client.get('/api/my-appointments/')
        self.assertEqual(r.status_code, 401)

    def test_get_my_appointments_authenticated(self):
        self.client.force_login(self.user)
        r = self.client.get('/api/my-appointments/')
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)

    # ── Book Appointment ─────────────────────────────────────────────────────

    def test_book_appointment_unauthenticated(self):
        r = self._post('/api/book/', {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 401)

    def test_book_appointment_valid(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
            'notes': 'Test note',
        })
        self.assertEqual(r.status_code, 200)
        self.assertIn('appointment_id', r.json())

    def test_book_appointment_past_date(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': self.past_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 400)
        self.assertIn('past', r.json()['error'].lower())

    def test_book_appointment_missing_barber_id(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 400)

    def test_book_appointment_invalid_barber(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': 9999,
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 404)

    def test_book_appointment_missing_phone(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
        })
        self.assertEqual(r.status_code, 400)

    def test_book_appointment_invalid_date_format(self):
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': '20-05-2026',  # wrong format
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 400)

    def test_book_appointment_double_booking_prevented(self):
        self.client.force_login(self.user)
        payload = {
            'barber_id': self.barber.id,
            'service_id': self.service.id,
            'appointment_date': str(date.today() + timedelta(days=5)),
            'appointment_time': '14:00',
            'customer_phone': '9803184863',
        }
        r1 = self._post('/api/book/', payload)
        self.assertEqual(r1.status_code, 200)
        r2 = self._post('/api/book/', payload)
        self.assertEqual(r2.status_code, 400)

    def test_book_appointment_unavailable_barber(self):
        unavailable = Barber.objects.create(
            name='Busy', specialties='Cuts', phone='9803184864', is_available=False
        )
        self.client.force_login(self.user)
        r = self._post('/api/book/', {
            'barber_id': unavailable.id,
            'service_id': self.service.id,
            'appointment_date': self.future_date,
            'appointment_time': '10:00',
            'customer_phone': '9803184863',
        })
        self.assertEqual(r.status_code, 404)

    # ── Cancel Appointment ───────────────────────────────────────────────────

    def test_cancel_own_appointment(self):
        self.client.force_login(self.user)
        appt = Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='11:00',
            customer_phone='9803184863',
        )
        r = self._post(f'/api/cancel/{appt.id}/', {})
        self.assertEqual(r.status_code, 200)
        appt.refresh_from_db()
        self.assertEqual(appt.status, 'cancelled')

    def test_cancel_another_users_appointment(self):
        other = User.objects.create_user(username='other2', password='pass')
        appt = Appointment.objects.create(
            customer=other, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='12:00',
            customer_phone='9803184863',
        )
        self.client.force_login(self.user)
        r = self._post(f'/api/cancel/{appt.id}/', {})
        self.assertEqual(r.status_code, 404)

    def test_cancel_already_cancelled_appointment(self):
        self.client.force_login(self.user)
        appt = Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='13:00',
            customer_phone='9803184863', status='cancelled',
        )
        r = self._post(f'/api/cancel/{appt.id}/', {})
        self.assertEqual(r.status_code, 400)

    def test_cancel_unauthenticated(self):
        appt = Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='15:00',
            customer_phone='9803184863',
        )
        r = self._post(f'/api/cancel/{appt.id}/', {})
        self.assertEqual(r.status_code, 401)

    # ── Delete Appointment ───────────────────────────────────────────────────

    def test_delete_cancelled_appointment(self):
        self.client.force_login(self.user)
        appt = Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='16:00',
            customer_phone='9803184863', status='cancelled',
        )
        r = self.client.delete(f'/api/delete/{appt.id}/', content_type='application/json')
        self.assertEqual(r.status_code, 200)
        self.assertFalse(Appointment.objects.filter(id=appt.id).exists())

    def test_delete_scheduled_appointment_fails(self):
        self.client.force_login(self.user)
        appt = Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='17:00',
            customer_phone='9803184863',
        )
        r = self.client.delete(f'/api/delete/{appt.id}/', content_type='application/json')
        self.assertEqual(r.status_code, 400)
        self.assertTrue(Appointment.objects.filter(id=appt.id).exists())

    def test_delete_another_users_appointment(self):
        other = User.objects.create_user(username='other3', password='pass')
        appt = Appointment.objects.create(
            customer=other, barber=self.barber, service=self.service,
            appointment_date=str(date.today() + timedelta(days=4)),
            appointment_time='09:00', customer_phone='9803184863', status='cancelled',
        )
        self.client.force_login(self.user)
        r = self.client.delete(f'/api/delete/{appt.id}/', content_type='application/json')
        self.assertEqual(r.status_code, 404)

    # ── Available Times ──────────────────────────────────────────────────────

    def test_get_available_times(self):
        r = self.client.get(f'/api/available-times/?date={self.future_date}&barber_id={self.barber.id}')
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn('slots', data)
        self.assertGreater(len(data['slots']), 0)

    def test_get_available_times_no_params(self):
        r = self.client.get('/api/available-times/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['slots'], [])

    def test_get_available_times_missing_barber_id(self):
        r = self.client.get(f'/api/available-times/?date={self.future_date}')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['slots'], [])

    def test_get_available_times_invalid_barber(self):
        r = self.client.get(f'/api/available-times/?date={self.future_date}&barber_id=9999')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['slots'], [])

    def test_booked_slot_marked_unavailable(self):
        Appointment.objects.create(
            customer=self.user, barber=self.barber, service=self.service,
            appointment_date=self.future_date, appointment_time='10:00',
            customer_phone='9803184863',
        )
        r = self.client.get(f'/api/available-times/?date={self.future_date}&barber_id={self.barber.id}')
        slots = r.json()['slots']
        booked = [s for s in slots if s['raw_time'] == '10:00']
        self.assertEqual(len(booked), 1)
        self.assertFalse(booked[0]['available'])

    # ── Auth: Login ──────────────────────────────────────────────────────────

    def test_login_valid(self):
        r = self._post('/api/login/', {'username': 'testuser', 'password': 'testpass123'})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()['success'])
        self.assertEqual(r.json()['username'], 'testuser')

    def test_login_invalid_password(self):
        r = self._post('/api/login/', {'username': 'testuser', 'password': 'wrong'})
        self.assertEqual(r.status_code, 400)
        self.assertFalse(r.json()['success'])

    def test_login_nonexistent_user(self):
        r = self._post('/api/login/', {'username': 'nobody', 'password': 'pass'})
        self.assertEqual(r.status_code, 400)
        self.assertFalse(r.json()['success'])

    # ── Auth: Logout ─────────────────────────────────────────────────────────

    def test_logout(self):
        self.client.force_login(self.user)
        r = self._post('/api/logout/', {})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()['success'])

    # ── Auth: Signup ─────────────────────────────────────────────────────────

    def test_signup_valid(self):
        r = self._post('/api/signup/', {
            'username': 'newuser', 'email': 'new@example.com', 'password': 'newpass123'
        })
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()['success'])
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_signup_duplicate_username(self):
        r = self._post('/api/signup/', {
            'username': 'testuser', 'email': 'dupe@example.com', 'password': 'pass123'
        })
        self.assertEqual(r.status_code, 400)
        self.assertFalse(r.json()['success'])

    # ── Auth: User ───────────────────────────────────────────────────────────

    def test_user_authenticated(self):
        self.client.force_login(self.user)
        r = self.client.get('/api/user/')
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()['isAuthenticated'])
        self.assertEqual(r.json()['username'], 'testuser')

    def test_user_unauthenticated(self):
        r = self.client.get('/api/user/')
        self.assertEqual(r.status_code, 200)
        self.assertFalse(r.json()['isAuthenticated'])

    # ── Chatbot ──────────────────────────────────────────────────────────────

    def test_chatbot_missing_message(self):
        r = self._post('/api/chatbot/', {})
        self.assertEqual(r.status_code, 400)

    def test_chatbot_empty_message(self):
        r = self._post('/api/chatbot/', {'message': ''})
        self.assertEqual(r.status_code, 400)

    def test_chatbot_returns_response(self):
        # OpenAI will fail in test env; fallback response should still return 200
        r = self._post('/api/chatbot/', {'message': 'What are your hours?'})
        self.assertEqual(r.status_code, 200)
        self.assertIn('response', r.json())
