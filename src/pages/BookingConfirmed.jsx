// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { format } from 'date-fns';
// import axios from 'axios';

// function BookingConfirmed() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [emailContent, setEmailContent] = useState('');
//   const [showEmailPreview, setShowEmailPreview] = useState(false);

//   const { booking, attendee, emailId } = location.state || {};

//   useEffect(() => {
//     // Redirect if no booking data is available
//     if (!booking) {
//       navigate('/dashboard');
//     }
//   }, [booking, navigate]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     try {
//       return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid date';
//     }
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'No time';
//     try {
//       return format(new Date(dateString), 'h:mm a');
//     } catch (error) {
//       console.error('Error formatting time:', error);
//       return 'Invalid time';
//     }
//   };

//   const handleViewInvitation = async () => {
//     if (!emailId) {
//       alert('Email ID not available');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/email/${emailId}`);
//       setEmailContent(response.data.emailContent);
//       setShowEmailPreview(true);
//     } catch (error) {
//       console.error('Error fetching email content:', error);
//       alert('Failed to load invitation. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!booking) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl text-red-600">Booking information not available</h2>
//           <p className="mt-2 text-gray-600">Please return to the dashboard</p>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {showEmailPreview ? (
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="p-6 border-b">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-gray-900">Email Preview</h2>
//                 <button
//                   onClick={() => setShowEmailPreview(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="p-6 max-h-[70vh] overflow-y-auto">
//               <div dangerouslySetInnerHTML={{ __html: emailContent }} />
//             </div>
//             <div className="p-6 bg-gray-50 border-t">
//               <button
//                 onClick={() => setShowEmailPreview(false)}
//                 className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Close Preview
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="p-6 bg-green-50 border-b border-green-100">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
//                   <p className="text-sm text-green-700">Your meeting has been scheduled successfully.</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">{booking.title}</h2>
              
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Date</p>
//                     <p className="mt-1 text-gray-900">{formatDate(booking.start)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Time</p>
//                     <p className="mt-1 text-gray-900">{formatTime(booking.start)} - {formatTime(booking.end)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Duration</p>
//                     <p className="mt-1 text-gray-900">{booking.duration} minutes</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Location</p>
//                     <p className="mt-1 text-gray-900">{booking.location}</p>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4">
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Attendee</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">Name</p>
//                       <p className="mt-1 text-gray-900">{attendee?.name || booking.attendeeName || 'Not specified'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">Email</p>
//                       <p className="mt-1 text-gray-900">{attendee?.email || booking.attendeeEmail || 'Not specified'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {booking.notes && (
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
//                     <p className="text-gray-700">{booking.notes}</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="p-6 bg-gray-50 border-t">
//               <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
//                 <button
//                   onClick={handleViewInvitation}
//                   disabled={loading}
//                   className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                   {loading ? 'Loading...' : 'View Invitation'}
//                 </button>
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Return to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BookingConfirmed;


"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { format } from "date-fns"
import axios from "axios"

function BookingConfirmed() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [emailContent, setEmailContent] = useState("")
  const [showEmailPreview, setShowEmailPreview] = useState(false)

  const { booking, attendee, emailId } = location.state || {}

  useEffect(() => {
    // Redirect if no booking data is available
    if (!booking) {
      navigate("/dashboard")
    }
  }, [booking, navigate])

  const formatDate = (dateString) => {
    if (!dateString) return "No date"
    try {
      return format(new Date(dateString), "EEEE, MMMM d, yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return "No time"
    try {
      return format(new Date(dateString), "h:mm a")
    } catch (error) {
      console.error("Error formatting time:", error)
      return "Invalid time"
    }
  }

  const handleViewInvitation = async () => {
    if (!emailId) {
      alert("Email ID not available")
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/email/${emailId}`)
      setEmailContent(response.data.emailContent)
      setShowEmailPreview(true)
    } catch (error) {
      console.error("Error fetching email content:", error)
      alert("Failed to load invitation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-card text-center">
          <svg className="mx-auto h-12 w-12 text-danger-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Booking information not available</h2>
          <p className="mt-2 text-gray-600 mb-6">Please return to the dashboard</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {showEmailPreview ? (
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Email Preview</h2>
                <button
                  onClick={() => setShowEmailPreview(false)}
                  className="text-gray-500 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: emailContent }} />
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setShowEmailPreview(false)}
                className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-6 bg-success-50 border-b border-success-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-success-800">Booking Confirmed!</h3>
                  <p className="text-sm text-success-700">Your meeting has been scheduled successfully.</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{booking.title}</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="mt-1 text-gray-900 font-medium">{formatDate(booking.start)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="mt-1 text-gray-900 font-medium">
                      {formatTime(booking.start)} - {formatTime(booking.end)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="mt-1 text-gray-900 font-medium">{booking.duration} minutes</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1 text-gray-900 font-medium">{booking.location}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Attendee</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="mt-1 text-gray-900 font-medium">
                          {attendee?.name || booking.attendeeName || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1 text-gray-900 font-medium">
                          {attendee?.email || booking.attendeeEmail || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700">{booking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <button
                  onClick={handleViewInvitation}
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
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
                      Loading...
                    </div>
                  ) : (
                    "View Invitation"
                  )}
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingConfirmed

