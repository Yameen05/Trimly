import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:8000/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedBarber && showBooking) {
      fetchAvailableTimes();
    } else {
      setAvailableTimes([]);
      setSelectedTime('');
    }
    // eslint-disable-next-line
  }, [selectedDate, selectedBarber]);

  const fetchData = async () => {
    try {
      const [servicesRes, barbersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/services/`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/barbers/`, { withCredentials: true }),
      ]);
      setServices(servicesRes.data);
      setBarbers(barbersRes.data.filter(b => b.is_available));
    } catch {
      setMessage('Error loading services. Please refresh the page.');
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/available-times/?date=${selectedDate}&barber_id=${selectedBarber.id}`,
        { withCredentials: true }
      );
      setAvailableTimes(response.data.slots);
    } catch {
      setAvailableTimes([]);
    }
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setSelectedBarber(null);
    setSelectedDate('');
    setSelectedTime('');
    setCustomerPhone('');
    setNotes('');
    setMessage('');
    setAvailableTimes([]);
    setShowBooking(true);
  };

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber);
    setSelectedTime('');
    setAvailableTimes([]);
  };

  const handleBooking = async () => {
    if (!user) {
      setMessage('You must be logged in to book an appointment.');
      return;
    }
    if (!selectedBarber) {
      setMessage('Please select a barber.');
      return;
    }
    if (!selectedService || !selectedDate || !selectedTime || !customerPhone) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setBookingLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/book/`,
        {
          barber_id: selectedBarber.id,
          service_id: selectedService.id,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          customer_phone: customerPhone,
          notes,
        },
        { withCredentials: true }
      );
      console.log('Booking response:', response.data);
      setMessage('Appointment booked successfully!');
      setShowBooking(false);
      setSelectedService(null);
      setSelectedBarber(null);
      setSelectedDate('');
      setSelectedTime('');
      setCustomerPhone('');
      setNotes('');
      setAvailableTimes([]);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error booking appointment. Please try again.');
    }
    setBookingLoading(false);
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-6 border border-blue-400 border-opacity-30">
            <span className="text-blue-300 text-sm font-semibold">✂ PREMIUM SERVICES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Book Your <span className="text-blue-400">Appointment</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose a service, pick your barber, and select a time that works for you.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {message && (
            <div className={`mb-8 p-4 rounded-xl shadow-lg max-w-2xl mx-auto ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{message}</span>
              </div>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">✂</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h2>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">${service.price}</span>
                    <span className="text-gray-500 ml-2">• {service.duration_minutes} min</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description || 'Professional service with expert attention to detail and styling.'}
                  </p>
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={() => handleBookNow(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowBooking(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">✂</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Book {selectedService.name}</h2>
              <p className="text-gray-500 text-sm">${selectedService.price} · {selectedService.duration_minutes} min</p>
            </div>

            <div className="space-y-6">
              {/* Barber Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Barber <span className="text-red-500">*</span>
                </label>
                {barbers.length === 0 ? (
                  <p className="text-sm text-gray-500">No barbers available at this time.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {barbers.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => handleBarberSelect(barber)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selectedBarber?.id === barber.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2">
                          <span className="text-white font-bold text-sm">{barber.name.charAt(0)}</span>
                        </div>
                        <div className="font-bold text-gray-900 text-sm">{barber.name}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{barber.specialties}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                  disabled={!selectedBarber}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {!selectedBarber && (
                  <p className="text-xs text-gray-500 mt-1">Select a barber first</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={!selectedDate || !selectedBarber}
                >
                  <option value="">Choose a time</option>
                  {availableTimes.map((slot, i) => (
                    <option key={i} value={slot.raw_time} disabled={!slot.available}>
                      {slot.time} {!slot.available ? '(Booked)' : ''}
                    </option>
                  ))}
                </select>
                {(!selectedDate || !selectedBarber) && (
                  <p className="text-xs text-gray-500 mt-1">Select a barber and date first</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Any special requests or preferences?"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading || !selectedBarber || !selectedTime || !customerPhone}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {bookingLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Confirm Appointment'
              )}
            </button>

            {/* Summary */}
            {selectedBarber && selectedDate && selectedTime && (
              <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Service', selectedService.name],
                    ['Barber', selectedBarber.name],
                    ['Date', new Date(selectedDate + 'T00:00:00').toLocaleDateString()],
                    ['Time', availableTimes.find(s => s.raw_time === selectedTime)?.time],
                    ['Duration', `${selectedService.duration_minutes} min`],
                    ['Price', `$${selectedService.price}`],
                  ].map(([label, value]) => value && (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-blue-200 last:border-0">
                      <span className="text-gray-600 font-medium">{label}:</span>
                      <span className="font-bold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
            <p className="text-xl text-gray-600">Located in the heart of Charlotte, NC</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">✂</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Trimly Barbershop</h3>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start text-gray-700">
                  <svg className="w-6 h-6 mr-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p>6721 E Independence Blvd, Charlotte, NC 28212</p>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg className="w-6 h-6 mr-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p>(980) 318-4863</p>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg className="w-6 h-6 mr-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                    <p className="text-sm text-gray-500">Closed Sunday</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=6721+E+Independence+Blvd,+Charlotte,+NC+28212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+19803184863"
                  className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Call Now
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=6721+E+Independence+Blvd,+Charlotte,+NC+28212&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trimly Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
