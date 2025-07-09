import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome {user ? <span className="text-blue-600">{user.username}</span> : 'to Trimly'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {user
                ? 'Ready for your next fresh cut? Book an appointment or view your bookings below.'
                : 'Book your perfect haircut with our skilled barbers. Quick, easy, and professional service at your fingertips.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/barbers"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Appointment
              </Link>
              {user ? (
                <Link
                  to="/appointments"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  View Appointments
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Trimly?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the best barbershop booking service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Booking</h3>
              <p className="text-gray-600">
                Book your appointment in seconds with our streamlined booking process.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Barbers</h3>
              <p className="text-gray-600">
                Professional and experienced barbers who deliver quality cuts every time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
              <p className="text-gray-600">
                Get instant confirmation and reminders for your appointments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for a Fresh Look?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your appointment today and experience the difference.
          </p>
          <Link
            to="/barbers"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;