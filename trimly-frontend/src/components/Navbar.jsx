import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMyAccount = () => {
    navigate('/my-account');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-xl">✂</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-2xl tracking-tight">Trimly</span>
                <span className="text-gray-600 text-sm font-medium -mt-1">BARBERSHOP BOOKING</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>Home</Link>
            <Link to="/services" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/services') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>Book Appointment</Link>
            <Link to="/about" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/about') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>About</Link>
            <Link to="/contact" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/contact') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>Contact</Link>
            <Link to="/appointments" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/appointments') ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>My Appointments</Link>
            <div className="ml-4 pl-4 border-l border-gray-200">
              {!user ? (
                <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Login / Sign Up</Link>
              ) : (
                <button onClick={handleLogout} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all duration-200">Sign Out</button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-100 shadow-lg">
              <Link to="/" className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive('/') ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/services" className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive('/services') ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>Book Appointment</Link>
              <Link to="/about" className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive('/about') ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive('/contact') ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/appointments" className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive('/appointments') ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>My Appointments</Link>
              <div className="pt-4 border-t border-gray-200">
                {!user ? (
                  <Link to="/login" className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                      className="block bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-base font-semibold hover:bg-gray-200 transition-all duration-200 w-full text-left"
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={() => { setIsMenuOpen(false); handleMyAccount(); }}
                      className="block bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-base font-semibold hover:bg-gray-200 transition-all duration-200 w-full text-left mt-2"
                    >
                      My Account
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;