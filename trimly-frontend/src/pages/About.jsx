import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-6 border border-blue-400 border-opacity-30">
          <span className="text-blue-300 text-sm font-semibold">✂ ABOUT TRIMLY</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Connecting You with <span className="text-blue-400">Expert Barbers</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Trimly is the modern platform that makes booking premium barbershop appointments effortless. 
          We connect customers with skilled barbers like Ali, bringing traditional craftsmanship into the digital age.
        </p>
      </div>
    </div>

    {/* How It Works Section */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How Trimly Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting your perfect haircut is just three simple steps away
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">1</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Browse & Choose</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore our services and choose the perfect cut or styling option that matches your vision.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">2</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Instantly</h3>
            <p className="text-gray-600 leading-relaxed">
              Select your preferred date and time, add your details, and confirm your appointment in seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">3</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Styled</h3>
            <p className="text-gray-600 leading-relaxed">
              Arrive at your appointment and enjoy a premium barbershop experience with expert craftsmanship.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Meet Ali Section */}
    <div className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="text-blue-600 text-sm font-semibold">FEATURED BARBER</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Ali</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Ali is a master barber with over 8 years of experience in the craft. Specializing in classic cuts, 
              modern styles, and precision beard work, Ali brings passion and expertise to every appointment.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">8+ Years of Experience</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">Specializes in Classic & Modern Cuts</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">Expert in Beard Styling & Grooming</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">Located in Charlotte, NC</span>
              </div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Book with Ali
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl font-bold">A</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Ali</h3>
                <p className="text-blue-100 mb-4">Master Barber</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-xl">500+</div>
                    <div className="text-blue-200">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">8+</div>
                    <div className="text-blue-200">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">4.9</div>
                    <div className="text-blue-200">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Why Choose Trimly Section */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Trimly?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing the barbershop experience with modern technology and traditional craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Benefit 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Booking</h3>
            <p className="text-gray-600 text-sm">Book appointments anytime, anywhere with our online platform</p>
          </div>

          {/* Benefit 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Barbers</h3>
            <p className="text-gray-600 text-sm">All barbers are experienced professionals with proven track records</p>
          </div>

          {/* Benefit 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Management</h3>
            <p className="text-gray-600 text-sm">View, reschedule, or cancel appointments with just a few clicks</p>
          </div>

          {/* Benefit 4 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Confirmation</h3>
            <p className="text-gray-600 text-sm">Get immediate booking confirmation and appointment reminders</p>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
            <div className="text-gray-300">Appointments Booked</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">4.9</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-300">Online Booking</div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Experience Trimly?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join hundreds of satisfied customers who trust Trimly for their grooming needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            Book Your Appointment
          </Link>
          <Link
            to="/contact"
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default About;