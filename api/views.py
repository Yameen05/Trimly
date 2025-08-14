from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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

@swagger_auto_schema(
    method='get',
    operation_description="Get all available API routes",
    responses={200: openapi.Response('List of available API endpoints')}
)
@api_view(['GET'])
def get_routes(request):
    """
    Get all available API routes for the Trimly barbershop platform.
    
    Returns a list of all available endpoints with their paths.
    """
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
        '/api/chatbot/',
        '/api/login/',
        '/api/logout/',
        '/api/signup/',
        '/api/user/',
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

@swagger_auto_schema(
    method='post',
    operation_description="Book a new appointment with Ali",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['appointment_date', 'appointment_time', 'service_id', 'customer_phone'],
        properties={
            'appointment_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE, description='Appointment date (YYYY-MM-DD)'),
            'appointment_time': openapi.Schema(type=openapi.TYPE_STRING, description='Appointment time (HH:MM format)'),
            'service_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Service ID'),
            'customer_phone': openapi.Schema(type=openapi.TYPE_STRING, description='Customer phone number'),
            'notes': openapi.Schema(type=openapi.TYPE_STRING, description='Optional appointment notes'),
        },
    ),
    responses={
        200: openapi.Response(
            'Appointment booked successfully',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message'),
                    'appointment_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Created appointment ID'),
                }
            )
        ),
        400: openapi.Response('Bad request - missing required fields'),
        401: openapi.Response('Authentication required')
    }
)
@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def book_appointment(request):
    """
    Book a new appointment with Ali the barber.
    
    Requires user authentication and validates appointment availability.
    Creates a new appointment record with the specified service and time.
    """
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

@swagger_auto_schema(
    method='post',
    operation_description="AI-powered chatbot for customer support",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['message'],
        properties={
            'message': openapi.Schema(type=openapi.TYPE_STRING, description='User message to the chatbot'),
        },
    ),
    responses={
        200: openapi.Response(
            'Chatbot response',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'response': openapi.Schema(type=openapi.TYPE_STRING, description='AI-generated response'),
                    'success': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Request success status'),
                    'powered_by': openapi.Schema(type=openapi.TYPE_STRING, description='AI model used'),
                }
            )
        ),
        400: openapi.Response('Bad request - message is required')
    }
)
@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def chatbot_gpt(request):
    """
    AI-powered chatbot endpoint using OpenAI GPT-4.
    
    Provides intelligent customer support for Ali's barbershop including:
    - Service information and pricing
    - Hours and location details
    - Booking assistance
    - General inquiries
    
    Falls back to predefined responses if AI service is unavailable.
    """
    user_message = request.data.get('message', '')
    if not user_message:
        return Response({'error': 'Message is required'}, status=400)

    try:
        print(f"Received message: {user_message}")
        print(f"API Key exists: {bool(settings.OPENAI_API_KEY)}")
        
        # Initialize OpenAI client
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Create a system prompt with barbershop context
        system_prompt = """You are Trimly's AI assistant - a smart, friendly, and conversational chatbot helping customers with Ali's barbershop in Charlotte, NC. You're knowledgeable, personable, and genuinely helpful.

🏪 ABOUT ALI'S BARBERSHOP:
- Ali is a master barber with years of experience
- Specializes in classic cuts, modern styles, and precision beard work
- Known for attention to detail and customer satisfaction
- Location: 6721 E Independence Blvd, Charlotte, NC 28212
- Phone: (980) 318-4863
- Hours: Monday-Saturday 9:00 AM - 6:00 PM, Closed Sunday

💰 SERVICES & PRICING:
- Classic Haircut: $35 (includes wash, cut, style, and consultation)
- Beard Trim: $15 (precision trimming and shaping)
- Haircut + Beard Combo: $50 (full grooming experience)
- All services include professional consultation

📅 BOOKING & POLICIES:
- Easy online booking through Trimly platform
- Walk-ins welcome but appointments get priority
- Cancellation: 2+ hours notice required, no fees
- Payment: Cash, all cards, Zelle, Apple Pay, Cash App, Venmo
- Professional hygiene and safety standards

PERSONALITY:
- Be conversational and natural, not robotic
- Show genuine interest in helping customers
- Use emojis occasionally to be friendly
- Ask follow-up questions when appropriate
- Be enthusiastic about Ali's skills and services
- Keep responses concise but informative (2-3 sentences max)
- If someone asks about booking, guide them to the booking page or suggest calling

Remember: You're representing a real business, so be professional but personable. Make customers feel welcome and excited about their potential visit!"""

        print("Making OpenAI API call...")
        
        # Make API call to OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.9,
            presence_penalty=0.1,
            frequency_penalty=0.1
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
        
        # Smart fallback responses with personality
        message_lower = user_message.lower()
        
        if any(word in message_lower for word in ['thank', 'thanks', 'appreciate']):
            fallback = "You're so welcome! 😊 Anything else I can help you with about Ali's barbershop?"
        elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
            fallback = "Hey there! 👋 Welcome to Trimly! I'm here to help with Ali's barbershop. What can I help you with today?"
        elif any(word in message_lower for word in ['bye', 'goodbye', 'see you', 'later']):
            fallback = "Take care! 👋 Thanks for chatting with me. Can't wait to see you at Ali's barbershop soon!"
        elif any(word in message_lower for word in ['service', 'haircut', 'beard', 'cut', 'trim']):
            fallback = "Ali's got you covered! ✂️ Classic Haircut ($35), Beard Trim ($15), or the popular combo ($50). All include wash and styling. Ready to book?"
        elif any(word in message_lower for word in ['price', 'cost', 'expensive', 'cheap', 'money']):
            fallback = "Great prices for expert work! 💰 Haircut $35, Beard Trim $15, or both for $50. Quality service that's worth every penny!"
        elif any(word in message_lower for word in ['hour', 'open', 'close', 'time', 'when']):
            fallback = "We're open Monday-Saturday 9:00 AM - 6:00 PM, closed Sunday! 🕘 Call (980) 318-4863 or book online anytime!"
        elif any(word in message_lower for word in ['location', 'address', 'where', 'find']):
            fallback = "Find us at 6721 E Independence Blvd, Charlotte, NC 28212! 📍 Easy parking and Ali's waiting for you. Call (980) 318-4863!"
        elif any(word in message_lower for word in ['book', 'appointment', 'schedule']):
            fallback = "Perfect! 📅 Book online through our site or call Ali at (980) 318-4863. Which service are you thinking about?"
        elif any(word in message_lower for word in ['pay', 'payment', 'cash', 'card']):
            fallback = "Payment's easy! 💳 We take cash, cards, Zelle, Apple Pay, Cash App, and Venmo. No worries there!"
        else:
            fallback = "I'm here to help with Ali's barbershop! ✂️ Ask me about services, pricing, hours, booking, or anything else. What's on your mind?"
            
        return Response({
            'response': fallback,
            'success': True,
            'fallback': True,
            'error': str(e)
        })