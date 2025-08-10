import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-6 border border-blue-400 border-opacity-30">
                <span className="text-blue-300 text-sm font-semibold">✂ PREMIUM BARBERSHOP EXPERIENCE</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {user ? (
                <>Welcome back, <span className="text-blue-400">{user.username}</span></>
              ) : (
                <>Welcome to <span className="text-blue-400">Trimly</span></>
              )}
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {user
                ? 'Ready for your next fresh cut with Ali? Book an appointment or view your bookings below.'
                : 'Book appointments with skilled barbers like Ali. Modern booking platform, traditional craftsmanship, exceptional results.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/services"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/25"
              >
                Book Appointment
              </Link>
              {user ? (
                <Link
                  to="/appointments"
                  className="bg-transparent text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300"
                >
                  View Appointments
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-transparent text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Trimly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The modern way to book appointments with skilled barbers like Ali
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book your appointment in seconds with our streamlined online booking system. No waiting, no hassle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Barbers</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with skilled barbers like Ali who bring years of experience and passion for the craft.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                From consultation to final styling, enjoy a premium barbershop experience with attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Visit Our Shop
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Charlotte, NC
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">✂</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Ali's Location</h3>
                </div>
                
                <div className="space-y-4">
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
                
                <div className="mt-8 flex space-x-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=6721+E+Independence+Blvd,+Charlotte,+NC+28212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Directions
                  </a>
                  <Link
                    to="/contact"
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=6721+E+Independence+Blvd,+Charlotte,+NC+28212&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ali's Barbershop Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Ready for a Fresh Look?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience the art of traditional barbering. Book your appointment with Ali today through Trimly's seamless platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/25"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent text-white px-12 py-4 rounded-xl font-bold text-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300"
            >
              Call Us
            </Link>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Home;