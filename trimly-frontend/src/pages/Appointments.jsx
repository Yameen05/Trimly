import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Appointments = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState('');

  // API base URL - adjust this to match your Django server
  const API_BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      fetchAppointments();
    }
    // eslint-disable-next-line
  }, [user, loading]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-appointments/`, { withCredentials: true });
      setAppointments(response.data);
      setLoadingData(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('Error loading appointments. Please try again.');
      setLoadingData(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.post(`${API_BASE_URL}/cancel/${appointmentId}/`, {}, { withCredentials: true });
      setMessage('Appointment cancelled successfully!');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setMessage('Error cancelling appointment. Please try again.');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${appointmentId}/`, { withCredentials: true });
      setMessage('Appointment deleted successfully!');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setMessage('Error deleting appointment. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    // Add T00:00:00 to prevent timezone issues with date-only strings
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-lg text-gray-600">Manage your barbershop appointments</p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments</h3>
            <p className="text-gray-600 mb-6">You don't have any appointments yet.</p>
            <Link
              to="/services"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg shadow-lg p-6 appointment-card"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {appointment.service__name || 'Haircut Service'}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Barber:</span>
                            <p className="font-medium">{appointment.barber__name || 'Ali'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <p className="font-medium">{formatDate(appointment.appointment_date)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Time:</span>
                            <p className="font-medium">{formatTime(appointment.appointment_time)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        <p className="text-lg font-semibold text-blue-600">
                          ${appointment.service__price || '25'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4 lg:mt-0">
                    {appointment.status === 'scheduled' && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                    {appointment.status === 'cancelled' && (
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                    <Link
                      to="/services"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                    >
                      Rebook
                    </Link>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Appointment ID: #{appointment.id}</span>
                    <span>Booked on: {formatDate(appointment.created_at || new Date())}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {appointments.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book New Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;