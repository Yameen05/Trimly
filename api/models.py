from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class Barber(models.Model):
    name = models.CharField(max_length=100)
    specialties = models.TextField(help_text="e.g., Haircuts, Beard Trims, Styling")
    phone = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.name} - ${self.price}"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    barber = models.ForeignKey(Barber, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    
   
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    
    customer_phone = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['barber', 'appointment_date', 'appointment_time']
        ordering = ['appointment_date', 'appointment_time']
    
    def __str__(self):
        return f"{self.customer.get_full_name()} - {self.appointment_date} {self.appointment_time}"