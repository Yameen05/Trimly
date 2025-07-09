import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, check for admin/barber role and fetch all appointments
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/appointments/`, { withCredentials: true });
      setAppointments(res.data);
    } catch (err) {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Barber Admin Dashboard</h1>
        <p className="text-gray-700 mb-8 text-center">View all upcoming appointments for all barbers.</p>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-500">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Customer</th>
                  <th className="px-4 py-2 border-b">Barber</th>
                  <th className="px-4 py-2 border-b">Service</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Time</th>
                  <th className="px-4 py-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="text-center">
                    <td className="px-4 py-2 border-b">{appt.id}</td>
                    <td className="px-4 py-2 border-b">{appt.customer}</td>
                    <td className="px-4 py-2 border-b">{appt.barber}</td>
                    <td className="px-4 py-2 border-b">{appt.service}</td>
                    <td className="px-4 py-2 border-b">{appt.appointment_date}</td>
                    <td className="px-4 py-2 border-b">{appt.appointment_time}</td>
                    <td className="px-4 py-2 border-b">{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 