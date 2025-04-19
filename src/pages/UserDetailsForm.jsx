// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function UserDetailsForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     notes: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { selectedDate, selectedTime, bookingId } = location.state || {};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Combine date and time
//       const startTime = new Date(selectedDate);
//       const [hours, minutes] = selectedTime.split(':');
//       startTime.setHours(parseInt(hours), parseInt(minutes), 0);

//       console.log('Scheduling meeting with data:', {
//         bookingId,
//         startTime: startTime.toISOString(),
//         attendeeName: formData.name,
//         attendeeEmail: formData.email,
//         notes: formData.notes
//       });

//       // Schedule the meeting and send email
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings/schedule`, {
//         bookingId,
//         startTime: startTime.toISOString(),
//         attendeeName: formData.name,
//         attendeeEmail: formData.email,
//         notes: formData.notes
//       });

//       console.log('Booking response:', response.data);

//       // Navigate to confirmation page with booking details and email info
//       navigate('/booking-confirmed', {
//         state: {
//           booking: response.data,
//           attendee: {
//             name: formData.name,
//             email: formData.email
//           },
//           emailId: response.data.emailId // Store the email ID for viewing later
//         }
//       });
//     } catch (error) {
//       console.error('Error scheduling meeting:', error);
//       setError(error.response?.data?.message || 'Failed to schedule meeting');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   if (!selectedDate || !selectedTime || !bookingId) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl text-red-600">Invalid booking details</h2>
//           <p className="mt-2 text-gray-600">Please start the booking process again</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
//             <p className="mt-2 text-gray-600">
//               {new Date(selectedDate).toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//               {' '}at {selectedTime}
//             </p>
//           </div>

//           {error && (
//             <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
//                 Additional Notes
//               </label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 rows="3"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Scheduling...' : 'Schedule Meeting'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDetailsForm;

"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

function UserDetailsForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { selectedDate, selectedTime, bookingId } = location.state || {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Combine date and time
      const startTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(":")
      startTime.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0)

      console.log("Scheduling meeting with data:", {
        bookingId,
        startTime: startTime.toISOString(),
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        notes: formData.notes,
      })

      // Schedule the meeting and send email
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings/schedule`, {
        bookingId,
        startTime: startTime.toISOString(),
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        notes: formData.notes,
      })

      console.log("Booking response:", response.data)

      // Navigate to confirmation page with booking details and email info
      navigate("/booking-confirmed", {
        state: {
          booking: response.data,
          attendee: {
            name: formData.name,
            email: formData.email,
          },
          emailId: response.data.emailId, // Store the email ID for viewing later
        },
      })
    } catch (error) {
      console.error("Error scheduling meeting:", error)
      setError(error.response?.data?.message || "Failed to schedule meeting")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!selectedDate || !selectedTime || !bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md rounded-lg bg-danger-50 border border-danger-200 p-6 text-center animate-fade-in">
          <svg className="mx-auto h-12 w-12 text-danger-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-danger-800 mb-2">Invalid booking details</h2>
          <p className="mt-2 text-gray-600 mb-4">Please start the booking process again</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
            <p className="mt-2 text-gray-600">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime}
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700 animate-slide-up">
              <div className="flex">
                <svg className="mr-3 h-5 w-5 text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
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
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
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
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Scheduling...
                </div>
              ) : (
                "Schedule Meeting"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsForm

