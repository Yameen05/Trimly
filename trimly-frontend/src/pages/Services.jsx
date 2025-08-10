import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:8000/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [aliId, setAliId] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
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
    if (selectedDate && showBooking) {
      fetchAvailableTimes();
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const servicesResponse = await axios.get(`${API_BASE_URL}/services/`, { withCredentials: true });
      setServices(servicesResponse.data);
      const barbersResponse = await axios.get(`${API_BASE_URL}/barbers/`, { withCredentials: true });
      const ali = barbersResponse.data.find(b => b.name.toLowerCase() === 'ali');
      setAliId(ali ? ali.id : null);
    } catch (error) {
      setMessage('Error loading services.');
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/available-times/?date=${selectedDate}`, { withCredentials: true });
      setAvailableTimes(response.data.slots);
    } catch (error) {
      setAvailableTimes([]);
    }
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBooking(true);
    setSelectedDate('');
    setSelectedTime('');
    setCustomerPhone('');
    setNotes('');
    setMessage('');
    setAvailableTimes([]);
  };

  const handleBooking = async () => {
    console.log('handleBooking called');
    if (!user) {
      setMessage('You must be logged in to book an appointment.');
      return;
    }
    if (!selectedService || !selectedDate || !selectedTime || !customerPhone) {
      setMessage('Please fill in all required fields');
      return;
    }
    if (!aliId) {
      setMessage('Barber Ali not found.');
      return;
    }
    setBookingLoading(true);
    try {
      console.log('Making POST request to:', `${API_BASE_URL}/book/`);
      console.log('Request data:', {
        service_id: selectedService.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        customer_phone: customerPhone,
        notes: notes
      });
      
      const response = await axios.post(`${API_BASE_URL}/book/`, {
        service_id: selectedService.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        customer_phone: customerPhone,
        notes: notes
      }, { withCredentials: true });
      
      console.log('Booking response:', response.data);
      setMessage('Appointment booked successfully!');
      setShowBooking(false);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime('');
      setCustomerPhone('');
      setNotes('');
      setAvailableTimes([]);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage(error.response?.data?.error || 'Error booking appointment. Please try again.');
    }
    setBookingLoading(false);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-6 border border-blue-400 border-opacity-30">
            <span className="text-blue-300 text-sm font-semibold">✂ PREMIUM SERVICES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Services with <span className="text-blue-400">Ali</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose from our premium barbershop services. Each service includes consultation, expert styling, and attention to detail.
          </p>
        </div>
      </div>

      {/* Services Section */}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Book {selectedService.name}</h2>
                <p className="text-gray-600">with Ali at his Charlotte location</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    disabled={!selectedDate}
                  >
                    <option value="">Choose a time</option>
                    {availableTimes.map((slot, index) => (
                      <option
                        key={index}
                        value={slot.raw_time}
                        disabled={!slot.available}
                      >
                        {slot.time} {!slot.available && '(Booked)'}
                      </option>
                    ))}
                  </select>
                  {!selectedDate && (
                    <p className="text-sm text-gray-500 mt-2">Please select a date first</p>
                  )}
                </div>
                
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
                    required
                  />
                </div>
                
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
                disabled={bookingLoading || !selectedTime || !customerPhone}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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
              {selectedDate && selectedTime && (
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-center">Appointment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-gray-600 font-medium">Service:</span>
                      <span className="font-bold text-gray-900">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-gray-600 font-medium">Date:</span>
                      <span className="font-bold text-gray-900">{selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString() : ''}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-gray-600 font-medium">Time:</span>
                      <span className="font-bold text-gray-900">{availableTimes.find(slot => slot.raw_time === selectedTime)?.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-gray-600 font-medium">Duration:</span>
                      <span className="font-bold text-gray-900">{selectedService.duration_minutes} minutes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-gray-600 font-medium">Price:</span>
                      <span className="font-bold text-blue-600 text-lg">${selectedService.price}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Phone:</span>
                      <span className="font-bold text-gray-900">{customerPhone}</span>
                    </div>
                    {notes && (
                      <div className="pt-2 border-t border-blue-200">
                        <span className="text-gray-600 font-medium">Notes:</span>
                        <p className="font-medium text-gray-900 mt-1">{notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Location Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Ali's Location</h2>
            <p className="text-xl text-gray-600">Located in the heart of Charlotte, NC</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">✂</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ali's Location</h3>
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
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm text-gray-500">Closed Sunday</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=6721+E+Independence+Blvd,+Charlotte,+NC+28212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                title="Ali's Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 