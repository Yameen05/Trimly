from django.urls import path, include
from . import views

urlpatterns = [
    # Django auth
    path('accounts/', include('django.contrib.auth.urls')),

    # API routes (React will call these)
    path('barbers/', views.get_barbers, name='get_barbers'),
    path('services/', views.get_services, name='get_services'),
    path('appointments/', views.get_appointments, name='get_appointments'),
    path('my-appointments/', views.get_my_appointments, name='get_my_appointments'),
    path('book/', views.book_appointment, name='book_appointment'),
    path('cancel/<int:appointment_id>/', views.cancel_appointment, name='cancel_appointment'),
    path('delete/<int:appointment_id>/', views.delete_appointment, name='delete_appointment'),
    path('available-times/', views.get_available_times, name='get_available_times'),
    path('login/', views.api_login, name='api_login'),
    path('logout/', views.api_logout, name='api_logout'),
    path('signup/', views.api_signup, name='api_signup'),
    path('user/', views.api_user, name='api_user'),
    path('chatbot/', views.chatbot_gpt, name='chatbot_gpt'),
    # Optional: Debug route
    path('routes/', views.get_routes, name='get_routes'),
    
    
]
