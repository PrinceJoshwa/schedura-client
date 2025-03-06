import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, startOfMonth, getDay, isSameDay } from 'date-fns';
import axios from 'axios';

function BookingPage() {
  const { username, eventTitle } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/public/${username}/${eventTitle}`);
        setBooking(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load booking details');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [username, eventTitle]);

  const generateTimeSlots = (date) => {
    if (!booking) return [];

    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const duration = booking.duration || 30; // Duration in minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        slots.push(
          format(new Date(date).setHours(hour, minute), 'HH:mm')
        );
      }
    }

    return slots;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setAvailableTimeSlots(generateTimeSlots(date));
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime && booking) {
      navigate('/user-details', {
        state: {
          selectedDate,
          selectedTime,
          bookingId: booking._id
        }
      });
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const start = startOfMonth(currentMonth);
    const firstDayOfMonth = getDay(start);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= 31; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      
      if (date.getMonth() !== currentMonth.getMonth()) break;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          className={`h-10 w-10 rounded-full flex items-center justify-center
            ${isSameDay(date, selectedDate) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
            ${date < new Date() ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={date < new Date()}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg text-red-600">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{booking?.title || 'Schedule Meeting'}</h1>
          <p className="mt-2 text-gray-600">{booking?.duration} minutes</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays()}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a Date'}
            </h2>
            
            {selectedDate && (
              <div className="grid grid-cols-2 gap-2">
                {availableTimeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 text-sm border rounded-lg transition-colors
                      ${time === selectedTime 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {!selectedDate && (
              <p className="text-gray-500 text-center py-8">
                Please select a date to view available time slots
              </p>
            )}

            {selectedDate && selectedTime && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;