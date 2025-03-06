
// import React, { useEffect, useState } from "react";

// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getToken } from "../utils/auth";
// import { format } from "date-fns";

// function BookingDetails() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const token = getToken();
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Booking details fetched:", response.data);
//         setBooking(response.data);
//         setError("");
//       } catch (error) {
//         console.error("Error fetching booking details:", error);
//         setError(
//           error.response?.data?.message || "Failed to fetch booking details"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId) {
//       fetchBookingDetails();
//     }
//   }, [bookingId]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "No date";
//     try {
//       return format(new Date(dateString), "MMMM d, yyyy");
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Invalid date";
//     }
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return "No time";
//     try {
//       return format(new Date(dateString), "h:mm a");
//     } catch (error) {
//       console.error("Error formatting time:", error);
//       return "Invalid time";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-lg text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">{booking?.title}</h1>
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div className="rounded-lg bg-gray-50 p-6">
//             <h2 className="mb-4 text-lg font-semibold text-gray-900">
//               Booking Details
//             </h2>
//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Date</p>
//                 <p className="text-gray-900">{formatDate(booking?.start)}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Time</p>
//                 <p className="text-gray-900">
//                   {formatTime(booking?.start)} - {formatTime(booking?.end)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Duration</p>
//                 <p className="text-gray-900">{booking?.duration} minutes</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Location</p>
//                 <p className="text-gray-900">{booking?.location}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Type</p>
//                 <p className="text-gray-900">{booking?.type}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Availability</p>
//                 <p className="text-gray-900">{booking?.availability}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               onClick={() => navigate(`/edit-booking/${bookingId}`)}
//               className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//             >
//               Edit Booking
//             </button>
//             <button
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to delete this booking?")) {
//                   // Add delete functionality
//                   const token = getToken();
//                   axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                   })
//                   .then(() => {
//                     navigate('/dashboard');
//                   })
//                   .catch((error) => {
//                     console.error("Error deleting booking:", error);
//                     alert("Failed to delete the booking. Please try again.");
//                   });
//                 }
//               }}
//               className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
//             >
//               Delete Booking
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { getToken } from "../utils/auth"
import { format } from "date-fns"

function BookingDetails() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = getToken()
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log("Booking details fetched:", response.data)
        setBooking(response.data)
        setError("")
      } catch (error) {
        console.error("Error fetching booking details:", error)
        setError(error.response?.data?.message || "Failed to fetch booking details")
      } finally {
        setLoading(false)
      }
    }

    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId])

  const formatDate = (dateString) => {
    if (!dateString) return "No date"
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
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

  if (loading) {
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
          <span className="text-lg font-medium text-gray-700">Loading details...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-danger-50 border border-danger-200 p-6 text-center">
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
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="border-b border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{booking?.title}</h1>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Booking Details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="mt-1 text-gray-900 font-medium">{formatDate(booking?.start)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p className="mt-1 text-gray-900 font-medium">
                    {formatTime(booking?.start)} - {formatTime(booking?.end)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="mt-1 text-gray-900 font-medium">{booking?.duration} minutes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="mt-1 text-gray-900 font-medium">{booking?.location || "Not specified"}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="mt-1 text-gray-900 font-medium">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                      {booking?.type || "Standard"}
                    </span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Availability</p>
                  <p className="mt-1 text-gray-900 font-medium">{booking?.availability || "Not specified"}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate(`/edit-booking/${bookingId}`)}
                className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary-700 border border-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Booking
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this booking?")) {
                    // Add delete functionality
                    const token = getToken()
                    axios
                      .delete(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then(() => {
                        navigate("/dashboard")
                      })
                      .catch((error) => {
                        console.error("Error deleting booking:", error)
                        alert("Failed to delete the booking. Please try again.")
                      })
                  }
                }}
                className="inline-flex items-center rounded-lg bg-danger-600 px-4 py-2 text-sm font-medium text-white hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails

