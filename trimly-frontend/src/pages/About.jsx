import React from 'react';

const About = () => (
  <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">About Trimly</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-semibold">Trimly</span> – your modern barbershop experience! We believe a great haircut is more than just a service; it’s a moment of confidence, style, and self-care.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Mission</h2>
      <p className="text-gray-600 mb-6">
        To provide top-notch grooming in a friendly, professional environment. Our skilled barbers are passionate about helping you look and feel your best.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Meet the Team</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 mb-2">A</div>
          <span className="font-medium">Ali</span>
          <span className="text-sm text-gray-500">Master Barber</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center text-2xl font-bold text-purple-700 mb-2">Y</div>
          <span className="font-medium">Yameen</span>
          <span className="text-sm text-gray-500">Owner & Stylist</span>
        </div>
      </div>
      <div className="mt-10 text-gray-500 text-sm">
        <p>Located in the heart of the city. Walk-ins welcome!</p>
      </div>
    </div>
  </div>
);

export default About; 