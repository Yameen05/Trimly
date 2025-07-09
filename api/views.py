from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Appointment, Barber, Service
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django!"})


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
@login_required
def get_my_appointments(request):
    appointments = Appointment.objects.filter(customer=request.user).values()
    return Response(list(appointments))


@api_view(['POST'])
@login_required
def book_appointment(request):
    data = request.data
    ali = Barber.objects.get(name="Ali")

    appointment = Appointment.objects.create(
        customer=request.user,
        barber=ali,
        appointment_date=data['appointment_date'],
        appointment_time=data['appointment_time'],
        service_id=data['service_id'],
    )
    return Response({"message": "Appointment booked successfully!"})


@api_view(['POST'])
@login_required
def cancel_appointment(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id, customer=request.user)

    if appointment.status == 'scheduled':
        appointment.status = 'cancelled'
        appointment.save()
        return Response({"message": "Cancelled successfully."})
    return Response({"error": "Cannot cancel this appointment."}, status=400)


@api_view(['DELETE'])
@login_required
def delete_appointment(request, appointment_id):
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

@csrf_exempt
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