import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Appointment booked:', formData);
    alert('Appointment booked successfully!');
    navigate('/'); // Redirect to home page after booking
  };

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="haircut">Haircut</option>
            <option value="coloring">Hair Coloring</option>
            <option value="styling">Hair Styling</option>
            <option value="treatment">Hair Treatment</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Additional Information</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookAppointment;
