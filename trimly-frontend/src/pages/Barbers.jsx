import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/barbers/`, { withCredentials: true })
      .then((res) => setBarbers(res.data))
      .catch(() => setError('Failed to load barbers. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-6 border border-blue-400 border-opacity-30">
            <span className="text-blue-300 text-sm font-semibold">✂ OUR TEAM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Meet Our <span className="text-blue-400">Barbers</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Skilled professionals dedicated to giving you the perfect cut every time.
          </p>
        </div>
      </div>

      {/* Barbers Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-600 font-medium">{error}</div>
          )}

          {!loading && !error && barbers.length === 0 && (
            <div className="text-center py-12 text-gray-500">No barbers found.</div>
          )}

          {!loading && !error && barbers.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {barbers.map((barber) => (
                <div
                  key={barber.id}
                  className="group bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Avatar */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-10 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-5xl">
                        {barber.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-gray-900">{barber.name}</h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          barber.is_available
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {barber.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mb-4">Master Barber</p>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {barber.specialties.split(',').map((s, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100 font-medium"
                          >
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {barber.phone && (
                      <div className="flex items-center text-gray-600 text-sm mb-6">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {barber.phone}
                      </div>
                    )}

                    <Link
                      to="/services"
                      className={`block w-full text-center py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                        barber.is_available
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={(e) => !barber.is_available && e.preventDefault()}
                    >
                      {barber.is_available ? `Book with ${barber.name}` : 'Currently Unavailable'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-gray-300 mb-8">
            Choose your barber and pick a time that works for you.
          </p>
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Barbers;
