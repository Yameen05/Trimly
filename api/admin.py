from django.contrib import admin
from .models import Barber, Service, Appointment

@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'is_available']
    list_filter = ['is_available']
    search_fields = ['name']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'duration_minutes', 'price']
    list_filter = ['duration_minutes']

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['customer', 'barber', 'service', 'appointment_date', 'appointment_time', 'status']
    list_filter = ['status', 'appointment_date', 'barber']
    search_fields = ['customer__username', 'customer__first_name', 'customer__last_name']
    date_hierarchy = 'appointment_date'