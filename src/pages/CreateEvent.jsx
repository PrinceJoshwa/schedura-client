// // import React, { useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";
// // import { getToken } from "../utils/auth";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // function CreateEvent() {
// //   const { eventType } = useParams();
// //   const navigate = useNavigate();
// //   const [title, setTitle] = useState("");
// //   const [duration, setDuration] = useState(30);
// //   const [location, setLocation] = useState("Google Meet");
// //   const [availability, setAvailability] = useState("Weekdays, 9 am - 5 pm");
// //   const [startDate, setStartDate] = useState(new Date());
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = getToken();
// //       const userData = JSON.parse(localStorage.getItem('userData'));
  
// //       // Calculate end date based on duration
// //       const endDate = new Date(startDate.getTime() + duration * 60000);
  
// //       const bookingData = {
// //         title,
// //         duration: parseInt(duration),
// //         type: eventType,
// //         location,
// //         availability,
// //         start: startDate.toISOString(),
// //         end: endDate.toISOString(),
// //         host: userData.id,
// //       };
  
// //       console.log('Sending booking data:', bookingData);
  
// //       const response = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/bookings`,
// //         bookingData,
// //         {
// //            `Bearer ${token}` },
// //         }
// //       );
  
// //       if (response.data) {
// //         console.log('Booking created successfully:', response.data);
// //         navigate('/dashboard');
// //       }
// //     } catch (error) {
// //       console.error('Error creating event:', error);
// //       setError(error.response?.data?.message || 'Failed to create event. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gray-100">
// //       <div className="w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg">
// //         <h1 className="mb-6 text-center text-2xl font-bold">Create {eventType} Event</h1>
        
// //         {error && (
// //           <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-3 text-sm text-red-700" role="alert">
// //             <span className="block sm:inline">{error}</span>
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700">Title</label>
// //             <input
// //               type="text"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
// //             <input
// //               type="number"
// //               value={duration}
// //               onChange={(e) => setDuration(e.target.value)}
// //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700">Location</label>
// //             <input
// //               type="text"
// //               value={location}
// //               onChange={(e) => setLocation(e.target.value)}
// //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700">Date and Time</label>
// //             <DatePicker
// //               selected={startDate}
// //               onChange={(date) => setStartDate(date)}
// //               showTimeSelect
// //               timeFormat="HH:mm"
// //               timeIntervals={15}
// //               dateFormat="MMMM d, yyyy h:mm aa"
// //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //             />
// //           </div>
// //           <div className="flex gap-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate('/dashboard')}
// //               className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //             >
// //               Create Event
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CreateEvent;

// "use client"

// import { useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"
// import { getToken } from "../utils/auth"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"

// function CreateEvent() {
//   const { eventType } = useParams()
//   const navigate = useNavigate()
//   const [title, setTitle] = useState("")
//   const [duration, setDuration] = useState(30)
//   const [location, setLocation] = useState("Google Meet")
//   const [availability, setAvailability] = useState("Weekdays, 9 am - 5 pm")
//   const [startDate, setStartDate] = useState(new Date())
//   const [error, setError] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     try {
//       const token = getToken()
//       const userData = JSON.parse(localStorage.getItem("userData"))

//       // Calculate end date based on duration
//       const endDate = new Date(startDate.getTime() + duration * 60000)

//       const bookingData = {
//         title,
//         duration: Number.parseInt(duration),
//         type: eventType,
//         location,
//         availability,
//         start: startDate.toISOString(),
//         end: endDate.toISOString(),
//         host: userData.id,
//       }

//       console.log("Sending booking data:", bookingData)

//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData, {
//         headers: { 'Authorization': `Bearer ${token}` },
//       })

//       if (response.data) {
//         console.log("Booking created successfully:", response.data)
//         navigate("/dashboard")
//       }
//     } catch (error) {
//       console.error("Error creating event:", error)
//       setError(error.response?.data?.message || "Failed to create event. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const eventTypeLabels = {
//     "one-on-one": "One-on-one",
//     group: "Group",
//     "round-robin": "Round Robin",
//   }

//   const eventTypeDescriptions = {
//     "one-on-one": "One host with one invitee",
//     group: "One host with multiple invitees",
//     "round-robin": "Multiple hosts with one invitee",
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-card overflow-hidden">
//           <div className="border-b border-gray-200 bg-white p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
//                 <div className="mt-1 flex items-center">
//                   <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
//                     {eventTypeLabels[eventType] || eventType}
//                   </span>
//                   <span className="ml-2 text-sm text-gray-500">{eventTypeDescriptions[eventType] || ""}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             {error && (
//               <div
//                 className="mb-6 rounded-lg border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700"
//                 role="alert"
//               >
//                 <div className="flex">
//                   <svg className="mr-3 h-5 w-5 text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                   Event Title
//                 </label>
//                 <input
//                   id="title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 px-4 py-2.5 border"
//                   placeholder="e.g. Coffee Chat, Interview, Team Meeting"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
//                   Duration (minutes)
//                 </label>
//                 <select
//                   id="duration"
//                   value={duration}
//                   onChange={(e) => setDuration(e.target.value)}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 px-4 py-2.5 border"
//                   required
//                 >
//                   <option value="15">15 minutes</option>
//                   <option value="30">30 minutes</option>
//                   <option value="45">45 minutes</option>
//                   <option value="60">60 minutes</option>
//                   <option value="90">90 minutes</option>
//                   <option value="120">2 hours</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//                   Location
//                 </label>
//                 <input
//                   id="location"
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 px-4 py-2.5 border"
//                   placeholder="e.g. Google Meet, Zoom, Office"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="date" className="block text-sm font-medium text-gray-700">
//                   Date and Time
//                 </label>
//                 <div className="mt-1">
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     showTimeSelect
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 px-4 py-2.5 border"
//                     wrapperClassName="w-full"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
//                   Availability
//                 </label>
//                 <input
//                   id="availability"
//                   type="text"
//                   value={availability}
//                   onChange={(e) => setAvailability(e.target.value)}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900 px-4 py-2.5 border"
//                   placeholder="e.g. Weekdays, 9 am - 5 pm"
//                 />
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/dashboard")}
//                   className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Creating...
//                     </div>
//                   ) : (
//                     "Create Event"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateEvent

"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { getToken } from "../utils/auth"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function CreateEvent() {
  const { eventType } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState(30)
  const [location, setLocation] = useState("Google Meet")
  const [availability, setAvailability] = useState("Weekdays, 9 am - 5 pm")
  const [startDate, setStartDate] = useState(new Date())
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const token = getToken()
      const userData = JSON.parse(localStorage.getItem("userData"))

      // Calculate end date based on duration
      const endDate = new Date(startDate.getTime() + duration * 60000)

      const bookingData = {
        title,
        duration: Number.parseInt(duration),
        type: eventType,
        location,
        availability,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        host: userData.id,
      }

      console.log("Sending booking data:", bookingData)

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data) {
        console.log("Booking created successfully:", response.data)
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error creating event:", error)
      setError(error.response?.data?.message || "Failed to create event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const eventTypeLabels = {
    "one-on-one": "One-on-one",
    group: "Group",
    "round-robin": "Round Robin",
  }

  const eventTypeDescriptions = {
    "one-on-one": "One host with one invitee",
    group: "One host with multiple invitees",
    "round-robin": "Multiple hosts with one invitee",
  }

  const eventTypeColors = {
    "one-on-one": "badge-primary",
    group: "badge-secondary",
    "round-robin": "badge-accent",
  }

  const eventTypeIcons = {
    "one-on-one": (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    group: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    "round-robin": (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="w-full max-w-lg mx-auto">
        <div className="card animate-scale-up">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-1">
            <div className="bg-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg text-primary-700">
                    {eventTypeIcons[eventType] || (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
                    <div className="mt-1 flex items-center">
                      <span className={`badge ${eventTypeColors[eventType] || "badge-primary"}`}>
                        {eventTypeLabels[eventType] || eventType}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">{eventTypeDescriptions[eventType] || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div
                className="mb-6 rounded-xl border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700 animate-slide-up"
                role="alert"
              >
                <div className="flex">
                  <svg
                    className="mr-3 h-5 w-5 text-danger-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input pl-10"
                    placeholder="e.g. Coffee Chat, Interview, Team Meeting"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="form-select pl-10"
                    required
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input pl-10"
                    placeholder="e.g. Google Meet, Zoom, Office"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date and Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-input pl-10"
                    wrapperClassName="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <input
                    id="availability"
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="form-input pl-10"
                    placeholder="e.g. Weekdays, 9 am - 5 pm"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-outline flex-1"
                  disabled={isSubmitting}
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
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
                      Creating...
                    </div>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent


