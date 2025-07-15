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
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl">Trimly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`}>Home</Link>
            <Link to="/services" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/services') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`}>Book Appointment</Link>
            <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`}>About</Link>
            <Link to="/contact" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`}>Contact</Link>
            <Link to="/appointments" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/appointments') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`}>My Appointments</Link>
            {!user ? (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Login / Sign Up</Link>
            ) : (
              <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Sign Out</button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 rounded-b-lg">
              <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/services" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/services') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`} onClick={() => setIsMenuOpen(false)}>Book Appointment</Link>
              <Link to="/about" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/about') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`} onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/contact') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/appointments" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/appointments') ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'}`} onClick={() => setIsMenuOpen(false)}>My Appointments</Link>
              {!user ? (
                <Link to="/login" className="block bg-white text-blue-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
              ) : (
                <>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="block bg-white text-blue-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    Sign Out
                  </button>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleMyAccount(); }}
                    className="block bg-white text-blue-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    My Account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;