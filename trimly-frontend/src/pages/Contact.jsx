import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send form to backend or email service
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 mb-8 text-center">Have a question or want to book by phone? Reach out below!</p>
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <p className="mb-2"><span className="font-semibold">Phone:</span> (980) 318-4863</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> yameenrizeq@gmail.com</p>
          <p><span className="font-semibold">Address:</span> 6721 E Independence Blvd, Charlotte, NC 28212</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">Send Message</button>
        </form>
        {submitted && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact; 