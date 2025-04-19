// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { format, addDays, startOfMonth, getDay, isSameDay } from 'date-fns';
// import axios from 'axios';

// function BookingPage() {
//   const { username, eventTitle } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/public/${username}/${eventTitle}`);
//         setBooking(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load booking details');
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [username, eventTitle]);

//   const generateTimeSlots = (date) => {
//     if (!booking) return [];

//     const slots = [];
//     const startHour = 9; // 9 AM
//     const endHour = 17; // 5 PM
//     const duration = booking.duration || 30; // Duration in minutes

//     for (let hour = startHour; hour < endHour; hour++) {
//       for (let minute = 0; minute < 60; minute += duration) {
//         slots.push(
//           format(new Date(date).setHours(hour, minute), 'HH:mm')
//         );
//       }
//     }

//     return slots;
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     setSelectedTime(null);
//     setAvailableTimeSlots(generateTimeSlots(date));
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//   };

//   const handleNext = () => {
//     if (selectedDate && selectedTime && booking) {
//       navigate('/user-details', {
//         state: {
//           selectedDate,
//           selectedTime,
//           bookingId: booking._id
//         }
//       });
//     }
//   };

//   const generateCalendarDays = () => {
//     const days = [];
//     const start = startOfMonth(currentMonth);
//     const firstDayOfMonth = getDay(start);

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="h-10" />);
//     }

//     // Add cells for each day of the month
//     for (let day = 1; day <= 31; day++) {
//       const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      
//       if (date.getMonth() !== currentMonth.getMonth()) break;

//       days.push(
//         <button
//           key={day}
//           onClick={() => handleDateSelect(date)}
//           className={`h-10 w-10 rounded-full flex items-center justify-center
//             ${isSameDay(date, selectedDate) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
//             ${date < new Date() ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
//           `}
//           disabled={date < new Date()}
//         >
//           {day}
//         </button>
//       );
//     }

//     return days;
//   };

//   if (loading) return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="text-lg">Loading...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="text-lg text-red-600">{error}</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="mx-auto max-w-3xl px-4">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">{booking?.title || 'Schedule Meeting'}</h1>
//           <p className="mt-2 text-gray-600">{booking?.duration} minutes</p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-2">
//           {/* Calendar */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">
//                 {format(currentMonth, 'MMMM yyyy')}
//               </h2>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
//                   className="p-2 hover:bg-gray-100 rounded-full"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
//                   className="p-2 hover:bg-gray-100 rounded-full"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-7 gap-1 mb-2">
//               {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
//                 <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1">
//               {generateCalendarDays()}
//             </div>
//           </div>

//           {/* Time Slots */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">
//               {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a Date'}
//             </h2>
            
//             {selectedDate && (
//               <div className="grid grid-cols-2 gap-2">
//                 {availableTimeSlots.map((time, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleTimeSelect(time)}
//                     className={`p-3 text-sm border rounded-lg transition-colors
//                       ${time === selectedTime 
//                         ? 'border-blue-500 bg-blue-50 text-blue-700' 
//                         : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
//                       }`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {!selectedDate && (
//               <p className="text-gray-500 text-center py-8">
//                 Please select a date to view available time slots
//               </p>
//             )}

//             {selectedDate && selectedTime && (
//               <button
//                 onClick={handleNext}
//                 className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingPage;

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { format, startOfMonth, getDay, isSameDay } from "date-fns"
import axios from "axios"

function BookingPage() {
  const { username, eventTitle } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/public/${username}/${eventTitle}`)
        setBooking(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load booking details")
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [username, eventTitle])

  const generateTimeSlots = (date) => {
    if (!booking) return []

    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    const duration = booking.duration || 30 // Duration in minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        slots.push(format(new Date(date).setHours(hour, minute), "HH:mm"))
      }
    }

    return slots
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setAvailableTimeSlots(generateTimeSlots(date))
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleNext = () => {
    if (selectedDate && selectedTime && booking) {
      navigate("/user-details", {
        state: {
          selectedDate,
          selectedTime,
          bookingId: booking._id,
        },
      })
    }
  }

  const generateCalendarDays = () => {
    const days = []
    const start = startOfMonth(currentMonth)
    const firstDayOfMonth = getDay(start)

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= 31; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

      if (date.getMonth() !== currentMonth.getMonth()) break

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors
            ${isSameDay(date, selectedDate) ? "bg-primary-600 text-white" : "hover:bg-gray-100"}
            ${date < new Date() ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"}
          `}
          disabled={date < new Date()}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg
            className="h-6 w-6 animate-spin text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-danger-50 border border-danger-200 p-6 text-center animate-fade-in">
          <svg className="mx-auto h-12 w-12 text-danger-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-danger-800 mb-2">Error</h3>
          <p className="text-danger-700 mb-4">{error}</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{booking?.title || "Schedule Meeting"}</h1>
          <p className="mt-2 text-gray-600">{booking?.duration} minutes</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
          </div>

          {/* Time Slots */}
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a Date"}
            </h2>

            {selectedDate && (
              <div className="grid grid-cols-2 gap-2 animate-fade-in">
                {availableTimeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 text-sm border rounded-lg transition-colors
                      ${
                        time === selectedTime
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-300 hover:border-primary-500 hover:bg-primary-50"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {!selectedDate && (
              <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Please select a date to view available time slots</p>
              </div>
            )}

            {selectedDate && selectedTime && (
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage

