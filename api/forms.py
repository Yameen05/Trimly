from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Appointment, Barber, Service
from datetime import datetime, timedelta

class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['service', 'appointment_date', 'appointment_time', 'customer_phone', 'notes']
        widgets = {
            'appointment_date': forms.DateInput(attrs={'type': 'date', 'min': datetime.now().date()}),
            'appointment_time': forms.HiddenInput(),  # We'll use custom slot selection
            'notes': forms.Textarea(attrs={'rows': 3}),
        }

    def clean(self):
        cleaned_data = super().clean()
        date = cleaned_data.get('appointment_date')
        time = cleaned_data.get('appointment_time')
        # No barber field here!
        if date and time:
            # Check if appointment slot is already taken for Ali
            from .models import Barber, Appointment
            try:
                ali = Barber.objects.get(name="Ali")
            except Barber.DoesNotExist:
                raise forms.ValidationError("Barber Ali does not exist.")
            if Appointment.objects.filter(
                barber=ali,
                appointment_date=date,
                appointment_time=time,
                status='scheduled'
            ).exists():
                raise forms.ValidationError("This time slot is already booked.")
            # Check if appointment is in the past
            from datetime import datetime
            appointment_datetime = datetime.combine(date, time)
            if appointment_datetime <= datetime.now():
                raise forms.ValidationError("Cannot book appointments in the past.")
        return cleaned_data