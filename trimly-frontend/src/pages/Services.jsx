import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [aliId, setAliId] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    setMessage('');
    setAvailableTimes([]);
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setMessage('Please fill in all fields');
      return;
    }
    if (!aliId) {
      setMessage('Barber Ali not found.');
      return;
    }
    setBookingLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/book/`, {
        barber_id: aliId,
        service_id: selectedService.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime
      }, { withCredentials: true });
      setMessage('Appointment booked successfully!');
      setShowBooking(false);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime('');
      setAvailableTimes([]);
    } catch (error) {
      setMessage('Error booking appointment. Please try again.');
    }
    setBookingLoading(false);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Our Services</h1>
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="bg-blue-50 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h2>
              <p className="text-blue-600 text-xl font-bold mb-2">${service.price}</p>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => handleBookNow(service)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        {/* Booking Modal/Inline Form */}
        {showBooking && selectedService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowBooking(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book {selectedService.name} with Ali</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              </div>
              <button
                onClick={handleBooking}
                disabled={bookingLoading || !selectedTime}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Booking...' : 'Book Appointment'}
              </button>
              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Appointment Summary</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <p className="font-medium">{selectedService.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">{new Date(selectedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <p className="font-medium">{availableTimes.find(slot => slot.raw_time === selectedTime)?.time}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services; 