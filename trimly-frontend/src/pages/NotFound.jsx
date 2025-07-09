import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-2xl text-gray-700 mb-6">Oops! Page not found.</p>
    <Link to="/" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
      Go Home
    </Link>
  </div>
);

export default NotFound; 