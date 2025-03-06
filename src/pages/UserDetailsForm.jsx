import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function UserDetailsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { selectedDate, selectedTime, bookingId } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Combine date and time
      const startTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      startTime.setHours(parseInt(hours), parseInt(minutes), 0);

      console.log('Scheduling meeting with data:', {
        bookingId,
        startTime: startTime.toISOString(),
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        notes: formData.notes
      });

      // Schedule the meeting and send email
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings/schedule`, {
        bookingId,
        startTime: startTime.toISOString(),
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        notes: formData.notes
      });

      console.log('Booking response:', response.data);

      // Navigate to confirmation page with booking details and email info
      navigate('/booking-confirmed', {
        state: {
          booking: response.data,
          attendee: {
            name: formData.name,
            email: formData.email
          },
          emailId: response.data.emailId // Store the email ID for viewing later
        }
      });
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setError(error.response?.data?.message || 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!selectedDate || !selectedTime || !bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-600">Invalid booking details</h2>
          <p className="mt-2 text-gray-600">Please start the booking process again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
            <p className="mt-2 text-gray-600">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              {' '}at {selectedTime}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Scheduling...' : 'Schedule Meeting'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsForm;