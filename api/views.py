from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Appointment, Barber, Service
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.middleware.csrf import get_token

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/hello/',
        '/api/barbers/',
        '/api/services/',
        '/api/appointments/',
        '/api/my-appointments/',
        '/api/book/',
        '/api/cancel/<id>/',
        '/api/delete/<id>/',
        '/api/available-times/?date=YYYY-MM-DD',
    ]
    return Response(routes)


@api_view(['GET'])
def get_barbers(request):
    barbers = Barber.objects.all().values()
    return Response(list(barbers))


@api_view(['GET'])
def get_services(request):
    services = Service.objects.all().values()
    return Response(list(services))


@api_view(['GET'])
def get_appointments(request):
    appointments = Appointment.objects.all().values()
    return Response(list(appointments))


@api_view(['GET'])
def get_my_appointments(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required.'}, status=401)
    
    appointments = Appointment.objects.filter(customer=request.user).select_related('service', 'barber').values(
        'id', 'appointment_date', 'appointment_time', 'status', 'notes', 'created_at',
        'service__name', 'service__price', 'barber__name'
    )
    return Response(list(appointments))

@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def book_appointment(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required.'}, status=401)
    
    data = request.data
    try:
        ali = Barber.objects.get(name="Ali")
    except Barber.DoesNotExist:
        return Response({'error': 'Barber not found.'}, status=404)

    # Require customer_phone
    customer_phone = data.get('customer_phone')
    if not customer_phone:
        return Response({'error': 'Phone number is required.'}, status=400)
    
    # Validate required fields
    required_fields = ['appointment_date', 'appointment_time', 'service_id']
    for field in required_fields:
        if not data.get(field):
            return Response({'error': f'{field} is required.'}, status=400)
    
    notes = data.get('notes', '')

    try:
        appointment = Appointment.objects.create(
            customer=request.user,
            barber=ali,
            appointment_date=data['appointment_date'],
            appointment_time=data['appointment_time'],
            service_id=data['service_id'],
            customer_phone=customer_phone,
            notes=notes,
        )
        return Response({
            "message": "Appointment booked successfully!",
            "appointment_id": appointment.id
        })
    except Exception as e:
        return Response({'error': f'Failed to book appointment: {str(e)}'}, status=400)


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def cancel_appointment(request, appointment_id):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required.'}, status=401)
    
    appointment = get_object_or_404(Appointment, id=appointment_id, customer=request.user)

    if appointment.status == 'scheduled':
        appointment.status = 'cancelled'
        appointment.save()
        return Response({"message": "Cancelled successfully."})
    return Response({"error": "Cannot cancel this appointment."}, status=400)


@api_view(['DELETE'])
@authentication_classes([CsrfExemptSessionAuthentication])
def delete_appointment(request, appointment_id):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required.'}, status=401)
    
    appointment = get_object_or_404(Appointment, id=appointment_id, customer=request.user)

    if appointment.status == 'cancelled':
        appointment.delete()
        return Response({"message": "Deleted successfully."})
    return Response({"error": "Only cancelled appointments can be deleted."}, status=400)


@api_view(['GET'])
def get_available_times(request):
    date = request.GET.get('date')
    if not date:
        return Response({'slots': []})

    start_time = datetime.strptime('09:00', '%H:%M').time()
    end_time = datetime.strptime('18:00', '%H:%M').time()
    base_times = []
    current_time = datetime.combine(datetime.today(), start_time)
    end_datetime = datetime.combine(datetime.today(), end_time)

    while current_time < end_datetime:
        base_times.append(current_time.time())
        current_time += timedelta(hours=1)

    ali = Barber.objects.get(name="Ali")
    booked_times = set(Appointment.objects.filter(
        barber=ali,
        appointment_date=date,
        status='scheduled'
    ).values_list('appointment_time', flat=True))

    slots = [
        {
            'time': t.strftime('%I:%M %p').lstrip('0'),
            'raw_time': t.strftime('%H:%M'),
            'available': t not in booked_times
        }
        for t in base_times
    ]

    return Response({'slots': slots})

@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'success': True, 'username': user.username})
    return Response({'success': False, 'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def api_logout(request):
    logout(request)
    return Response({'success': True})

@api_view(['POST'])
def api_signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    return Response({'success': True, 'username': user.username})

@api_view(['GET'])
def api_user(request):
    if request.user.is_authenticated:
        return Response({'isAuthenticated': True, 'username': request.user.username})
    return Response({'isAuthenticated': False})