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
from django.conf import settings
import openai

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

@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def chatbot_gpt(request):
    user_message = request.data.get('message', '')
    if not user_message:
        return Response({'error': 'Message is required'}, status=400)

    try:
        print(f"Received message: {user_message}")
        print(f"API Key exists: {bool(settings.OPENAI_API_KEY)}")
        
        # Initialize OpenAI client
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Create a system prompt with barbershop context
        system_prompt = """You are Trimly's AI assistant helping customers book appointments with Ali, a skilled barber in Charlotte, NC. You're friendly, conversational, and knowledgeable about the booking platform and Ali's services.

ABOUT TRIMLY:
- Trimly is a modern barbershop booking platform
- Connects customers with skilled barbers like Ali
- Easy online booking and appointment management

ALI'S INFORMATION:
- Barber: Ali (experienced, specializes in classic cuts and beard styling)
- Location: 6721 E Independence Blvd, Charlotte, NC 28212
- Phone: (980) 318-4863
- Hours: Monday-Saturday 9:00 AM - 6:00 PM, Closed Sunday

SERVICES & PRICING:
- Classic Haircut: $35 (45 minutes)
- Beard Trim: $15 (15 minutes) 
- Haircut + Beard: $50 (60 minutes)

BOOKING & POLICIES:
- Online booking available through Trimly platform
- Walk-ins welcome but appointments get priority
- Call (980) 318-4863 to book directly with Ali
- Cancellations: 2+ hours notice, no fees
- Payment: Cash, cards, mobile payments
- Professional hygiene standards

Respond naturally like ChatGPT would, but emphasize that Trimly is the booking platform connecting customers with Ali. Be conversational, helpful, and encourage bookings when appropriate."""

        print("Making OpenAI API call...")
        
        # Make API call to OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=200,
            temperature=0.8
        )
        
        bot_response = response.choices[0].message.content
        print(f"GPT Response: {bot_response}")
        
        return Response({
            'response': bot_response,
            'success': True,
            'powered_by': 'gpt-4o-mini'
        })
        
    except Exception as e:
        print(f"OpenAI API Error: {str(e)}")
        print(f"Error type: {type(e)}")
        
        # Better fallback responses that handle common interactions properly
        message_lower = user_message.lower()
        
        if any(word in message_lower for word in ['thank', 'thanks', 'appreciate']):
            fallback = "You're very welcome! Is there anything else I can help you with about booking with Ali?"
        elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
            fallback = "Hello! Welcome to Trimly! How can I help you today? I can tell you about Ali's services, hours, or help you book an appointment."
        elif any(word in message_lower for word in ['bye', 'goodbye', 'see you', 'later']):
            fallback = "Goodbye! Thanks for using Trimly. We look forward to helping you book with Ali soon!"
        elif any(word in message_lower for word in ['service', 'haircut', 'beard', 'price', 'cost', 'menu']):
            fallback = "We offer Classic Haircut ($35), Beard Trim ($15), and Haircut + Beard ($50). All services include consultation and styling. Would you like to book an appointment?"
        elif any(word in message_lower for word in ['hour', 'open', 'close', 'time', 'when']):
            fallback = "We're open Monday-Saturday 9:00 AM - 6:00 PM, closed Sunday. You can call us at (980) 318-4863 or book online!"
        elif any(word in message_lower for word in ['location', 'address', 'where', 'find']):
            fallback = "We're located at 6721 E Independence Blvd, Charlotte, NC 28212. You can call us at (980) 318-4863 for directions!"
        elif any(word in message_lower for word in ['book', 'appointment', 'schedule']):
            fallback = "Great! You can book online through our website or call us at (980) 318-4863. What service are you interested in?"
        else:
            fallback = "I'm here to help with questions about booking with Ali! I can tell you about his services, hours, location, or help you book an appointment. What would you like to know?"
            
        return Response({
            'response': fallback,
            'success': True,
            'fallback': True,
            'error': str(e)
        })