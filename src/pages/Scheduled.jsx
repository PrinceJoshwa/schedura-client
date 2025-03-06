// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import axios from "axios";
// import { isAuthenticated, getToken } from "../utils/auth";

// function Scheduled() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hosts, setHosts] = useState({});
//   const [attendees, setAttendees] = useState({});

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate("/login");
//     } else {
//       fetchBookings();
//     }
//   }, [navigate]);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const token = getToken();
//       if (!token) {
//         throw new Error("No token found");
//       }

//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log('Fetched bookings:', res.data);
//       setBookings(res.data);
      
//       // Extract host information directly from the populated bookings
//       const hostData = {};
//       res.data.forEach(booking => {
//         if (booking.host && typeof booking.host === 'object') {
//           hostData[booking.host._id] = booking.host;
//         }
//       });
      
//       setHosts(hostData);
      
//       // Fetch attendee details for each booking
//       await fetchAttendeeDetails(res.data);
      
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError(error.message || "An error occurred while fetching bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAttendeeDetails = async (bookings) => {
//     try {
//       const token = getToken();
//       const attendeeData = {};
      
//       // Extract attendee information directly from bookings
//       bookings.forEach(booking => {
//         if (booking.attendeeName || booking.attendeeEmail) {
//           attendeeData[booking._id] = {
//             name: booking.attendeeName,
//             email: booking.attendeeEmail
//           };
//         }
//       });
      
//       setAttendees(attendeeData);
//     } catch (error) {
//       console.error("Error processing attendee details:", error);
//     }
//   };

//   const handleViewDetails = (bookingId) => {
//     navigate(`/booking-details/${bookingId}`);
//   };

//   const formatEventDate = (dateString) => {
//     if (!dateString) return 'No date';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         throw new Error('Invalid date');
//       }
//       return format(date, 'MMMM d, yyyy');
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid date';
//     }
//   };
  
//   const formatEventTime = (dateString) => {
//     if (!dateString) return 'No time';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         throw new Error('Invalid date');
//       }
//       return format(date, 'h:mm a');
//     } catch (error) {
//       console.error('Error formatting time:', error);
//       return 'Invalid time';
//     }
//   };

//   const getHostName = (hostId, booking) => {
//     // First check if booking has attendee data
//     if (booking && booking.attendeeName) {
//       return booking.attendeeName;
//     }
    
//     // Check if we have attendee data with a name
//     if (booking && booking._id && attendees[booking._id] && attendees[booking._id].name) {
//       return attendees[booking._id].name;
//     }
    
//     // Check if host is a populated object
//     if (booking && booking.host && typeof booking.host === 'object' && booking.host.name) {
//       return booking.host.name;
//     }
    
//     // Check if we have host data from our hosts state
//     if (hostId && hosts[hostId]) {
//       return hosts[hostId].name || hosts[hostId].email || 'Unknown host';
//     }
    
//     // If host is a string (just the ID), try to get the name from the hosts object
//     if (typeof hostId === 'string' && hosts[hostId]) {
//       return hosts[hostId].name || hosts[hostId].email || 'Unknown host';
//     }
    
//     // Default fallback
//     return 'Host';
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 border-r bg-white">
//         <div className="h-16 flex items-center justify-center border-b px-4">
//           <h1 className="text-xl font-semibold relative top-1">Schedura</h1>
//         </div>
//         <nav className="space-y-1 p-4">
//           <a
//             href="/dashboard"
//             className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
//           >
//             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <span>Event Types</span>
//           </a>
//           <a
//             href="/scheduled"
//             className="flex items-center space-x-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-600"
//           >
//             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//             <span>Scheduled Events</span>
//           </a>
//           <a
//             href="/settings"
//             className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
//           >
//             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//               />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>Settings</span>
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="border-b bg-white">
//           <div className="flex h-16 items-center justify-between px-8">
//             <h2 className="text-xl font-semibold">Scheduled Events</h2>
//           </div>
//         </div>

//         <div className="p-8">
//           {loading ? (
//             <div className="flex justify-center items-center h-32">
//               <div className="text-lg">Loading...</div>
//             </div>
//           ) : error ? (
//             <div className="text-red-500 p-4 bg-red-50 rounded-md">Error: {error}</div>
//           ) : bookings.length === 0 ? (
//             <div className="text-center py-12">
//               <h3 className="text-lg font-medium text-gray-900">No scheduled events found</h3>
//               <p className="mt-2 text-sm text-gray-500">Create an event to get started.</p>
//               <div className="mt-6">
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   Go to Dashboard
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {bookings.map((booking) => {
//                 const hostName = getHostName(booking.host, booking);
//                 const hostInitial = hostName ? hostName.charAt(0).toUpperCase() : 'H';
                
//                 return (
//                   <div 
//                     key={booking._id} 
//                     className="relative overflow-hidden rounded-lg border bg-white shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
//                     onClick={() => handleViewDetails(booking._id)}
//                   >
//                     <div className="p-6">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-grow">
//                           <h3 className="text-lg font-semibold">{booking.title}</h3>
//                           <p className="mt-1 text-sm text-gray-600">
//                             {formatEventDate(booking.start)}
//                           </p>
//                           <p className="mt-2 text-sm text-gray-600">
//                             Time: {formatEventTime(booking.start)} - {formatEventTime(booking.end)}
//                           </p>
//                           <p className="mt-2 text-sm text-gray-600">
//                             Location: {booking.location || 'Not specified'}
//                           </p>
//                           <p className="mt-2 text-sm text-gray-600">
//                             Type: {booking.type || 'Standard'}
//                           </p>
//                           <div className="mt-3 flex items-center">
//                             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                               {hostInitial}
//                             </div>
//                             <span className="ml-2 text-sm font-medium">
//                               Host: {hostName}
//                             </span>
//                           </div>
//                           {booking.attendeeName && (
//                             <div className="mt-3 flex items-center">
//                               <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
//                                 {booking.attendeeName.charAt(0).toUpperCase()}
//                               </div>
//                               <span className="ml-2 text-sm font-medium">
//                                 Attendee: {booking.attendeeName || booking.attendeeEmail || 'Unknown'}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="ml-4 flex-shrink-0">
//                           <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
//                             {booking.duration} min
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Scheduled;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { format } from "date-fns";
// import axios from "axios";
// import { isAuthenticated, getToken } from "../utils/auth";

// function Scheduled() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hosts, setHosts] = useState({});
//   const [attendees, setAttendees] = useState({});
//   const [showCreateMenu, setShowCreateMenu] = useState(false);
//   const createMenuRef = useRef(null);

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate("/login");
//     } else {
//       fetchBookings();
//     }
//   }, [navigate]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
//         setShowCreateMenu(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const token = getToken();
//       if (!token) {
//         throw new Error("No token found");
//       }

//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Fetched bookings:", res.data);
//       setBookings(res.data);

//       // Extract host information directly from the populated bookings
//       const hostData = {};
//       res.data.forEach((booking) => {
//         if (booking.host && typeof booking.host === "object") {
//           hostData[booking.host._id] = booking.host;
//         }
//       });

//       setHosts(hostData);

//       // Fetch attendee details for each booking
//       await fetchAttendeeDetails(res.data);

//       setError(null);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError(error.message || "An error occurred while fetching bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAttendeeDetails = async (bookings) => {
//     try {
//       const token = getToken();
//       const attendeeData = {};

//       // Extract attendee information directly from bookings
//       bookings.forEach((booking) => {
//         if (booking.attendeeName || booking.attendeeEmail) {
//           attendeeData[booking._id] = {
//             name: booking.attendeeName,
//             email: booking.attendeeEmail,
//           };
//         }
//       });

//       setAttendees(attendeeData);
//     } catch (error) {
//       console.error("Error processing attendee details:", error);
//     }
//   };

//   const handleViewDetails = (bookingId) => {
//     navigate(`/booking-details/${bookingId}`);
//   };

//   const handleEventTypeSelection = (eventType) => {
//     navigate(`/create-event/${eventType}`);
//     setShowCreateMenu(false);
//   };

//   const formatEventDate = (dateString) => {
//     if (!dateString) return "No date";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         throw new Error("Invalid date");
//       }
//       return format(date, "MMMM d, yyyy");
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Invalid date";
//     }
//   };

//   const formatEventTime = (dateString) => {
//     if (!dateString) return "No time";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         throw new Error("Invalid date");
//       }
//       return format(date, "h:mm a");
//     } catch (error) {
//       console.error("Error formatting time:", error);
//       return "Invalid time";
//     }
//   };

//   const getHostName = (hostId, booking) => {
//     // First check if booking has attendee data
//     if (booking && booking.attendeeName) {
//       return booking.attendeeName;
//     }

//     // Check if we have attendee data with a name
//     if (booking && booking._id && attendees[booking._id] && attendees[booking._id].name) {
//       return attendees[booking._id].name;
//     }

//     // Check if host is a populated object
//     if (booking && booking.host && typeof booking.host === "object" && booking.host.name) {
//       return booking.host.name;
//     }

//     // Check if we have host data from our hosts state
//     if (hostId && hosts[hostId]) {
//       return hosts[hostId].name || hosts[hostId].email || "Unknown host";
//     }

//     // If host is a string (just the ID), try to get the name from the hosts object
//     if (typeof hostId === "string" && hosts[hostId]) {
//       return hosts[hostId].name || hosts[hostId].email || "Unknown host";
//     }

//     // Default fallback
//     return "Host";
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
//         <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
//           <h1 className="text-xl font-bold text-primary-600">Schedura</h1>
//         </div>
//         <div className="p-4">
//           <div className="relative" ref={createMenuRef}>
//             <button
//               onClick={() => setShowCreateMenu(!showCreateMenu)}
//               className="flex w-full items-center justify-center rounded-lg border border-primary-600 bg-white px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
//             >
//               <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Create Event
//             </button>

//             {showCreateMenu && (
//               <div className="absolute left-0 right-0 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                 <div className="py-1">
//                   <div className="px-4 py-2 text-xs font-semibold text-gray-500">EVENT TYPES</div>
//                   <button
//                     onClick={() => handleEventTypeSelection("one-on-one")}
//                     className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center text-sm font-medium text-gray-900">
//                       <span>One-on-one</span>
//                       <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-800">1:1</span>
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">Good for coffee chats, 1:1 interviews, etc.</p>
//                   </button>
//                   <button
//                     onClick={() => handleEventTypeSelection("group")}
//                     className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center text-sm font-medium text-gray-900">
//                       <span>Group</span>
//                       <span className="ml-2 rounded-full bg-secondary-100 px-2 py-0.5 text-xs text-secondary-800">
//                         1:Many
//                       </span>
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">Webinars, online classes, etc.</p>
//                   </button>
//                   <button
//                     onClick={() => handleEventTypeSelection("round-robin")}
//                     className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center text-sm font-medium text-gray-900">
//                       <span>Round robin</span>
//                       <span className="ml-2 rounded-full bg-success-100 px-2 py-0.5 text-xs text-success-800">
//                         Team
//                       </span>
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">Distribute meetings between team members</p>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <nav className="space-y-1 p-4">
//           <Link
//             to="/dashboard"
//             className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <span>Event Types</span>
//           </Link>
//           <Link
//             to="/scheduled"
//             className="flex items-center space-x-3 rounded-lg bg-primary-50 px-4 py-2.5 text-primary-700 font-medium transition-colors"
//           >
//             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//             <span>Scheduled Events</span>
//           </Link>
//           <Link
//             to="/settings"
//             className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//               />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>Settings</span>
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
//         {/* <header className="mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">Scheduled Events</h2>
//         </header> */}
//                 <div className="border-b border-gray-200 bg-white shadow-sm">
//           <div className="flex h-16 items-center justify-between px-8">
//             <h2 className="text-xl font-semibold text-gray-800">Scheduled Events</h2>
//           </div>
//         </div>
//       <div className=" p-4">
//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="text-lg">Loading...</div>
//           </div>
//         ) : error ? (
//           <div className="text-red-500 p-4 bg-red-50 rounded-md">Error: {error}</div>
//         ) : bookings.length === 0 ? (
//           <div className="text-center py-12">
//             <h3 className="text-lg font-medium text-gray-900">No scheduled events found</h3>
//             <p className="mt-2 text-sm text-gray-500">Create an event to get started.</p>
//             <div className="mt-6">
//               <button
//                 onClick={() => setShowCreateMenu(true)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 Create Event
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Event
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Attendee
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Time
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <tr key={booking._id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{booking.title}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{getHostName(booking.host, booking)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{formatEventDate(booking.start)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{formatEventTime(booking.start)} - {formatEventTime(booking.end)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right">
//                       <button
//                         onClick={() => handleViewDetails(booking._id)}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//         )}
//       </div>
//       </main>
//     </div>
//   );
// }

// export default Scheduled;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { isAuthenticated, getToken, logout, getUserData } from "../utils/auth";

function Scheduled() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hosts, setHosts] = useState({});
  const [attendees, setAttendees] = useState({});
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const createMenuRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setShowCreateMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched bookings:", res.data);
      setBookings(res.data);

      // Extract host information directly from the populated bookings
      const hostData = {};
      res.data.forEach((booking) => {
        if (booking.host && typeof booking.host === "object") {
          hostData[booking.host._id] = booking.host;
        }
      });

      setHosts(hostData);

      // Fetch attendee details for each booking
      await fetchAttendeeDetails(res.data);

      setError(null);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message || "An error occurred while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendeeDetails = async (bookings) => {
    try {
      const token = getToken();
      const attendeeData = {};

      // Extract attendee information directly from bookings
      bookings.forEach((booking) => {
        if (booking.attendeeName || booking.attendeeEmail) {
          attendeeData[booking._id] = {
            name: booking.attendeeName,
            email: booking.attendeeEmail,
          };
        }
      });

      setAttendees(attendeeData);
    } catch (error) {
      console.error("Error processing attendee details:", error);
    }
  };

  const handleViewDetails = (bookingId) => {
    navigate(`/booking-details/${bookingId}`);
  };

  const handleEventTypeSelection = (eventType) => {
    navigate(`/create-event/${eventType}`);
    setShowCreateMenu(false);
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatEventTime = (dateString) => {
    if (!dateString) return "No time";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  const getHostName = (hostId, booking) => {
    // First check if booking has attendee data
    if (booking && booking.attendeeName) {
      return booking.attendeeName;
    }

    // Check if we have attendee data with a name
    if (booking && booking._id && attendees[booking._id] && attendees[booking._id].name) {
      return attendees[booking._id].name;
    }

    // Check if host is a populated object
    if (booking && booking.host && typeof booking.host === "object" && booking.host.name) {
      return booking.host.name;
    }

    // Check if we have host data from our hosts state
    if (hostId && hosts[hostId]) {
      return hosts[hostId].name || hosts[hostId].email || "Unknown host";
    }

    // If host is a string (just the ID), try to get the name from the hosts object
    if (typeof hostId === "string" && hosts[hostId]) {
      return hosts[hostId].name || hosts[hostId].email || "Unknown host";
    }

    // Default fallback
    return "Host";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold text-primary-600">Schedura</h1>
        </div>
        <div className="p-4">
          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex w-full items-center justify-center rounded-lg border border-primary-600 bg-white px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </button>

            {showCreateMenu && (
              <div className="absolute left-0 right-0 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500">EVENT TYPES</div>
                  <button
                    onClick={() => handleEventTypeSelection("one-on-one")}
                    className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <span>One-on-one</span>
                      <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-800">1:1</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Good for coffee chats, 1:1 interviews, etc.</p>
                  </button>
                  <button
                    onClick={() => handleEventTypeSelection("group")}
                    className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <span>Group</span>
                      <span className="ml-2 rounded-full bg-secondary-100 px-2 py-0.5 text-xs text-secondary-800">
                        1:Many
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Webinars, online classes, etc.</p>
                  </button>
                  <button
                    onClick={() => handleEventTypeSelection("round-robin")}
                    className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <span>Round robin</span>
                      <span className="ml-2 rounded-full bg-success-100 px-2 py-0.5 text-xs text-success-800">
                        Team
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Distribute meetings between team members</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            // className="flex items-center space-x-3 rounded-lg bg-primary-50 px-4 py-2.5 text-primary-700 font-medium transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Event Types</span>
          </Link>
          <Link
            to="/scheduled"
            className="flex items-center space-x-3 rounded-lg bg-primary-50 px-4 py-2.5 text-primary-700 font-medium transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span>Scheduled Events</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 w-64 border-t border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {userData?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{userData?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{userData?.email || "user@example.com"}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="ml-auto text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      
      <main className="flex-1 overflow-y-auto">
        <div className="border-b bg-white">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-xl font-semibold">Scheduled Events</h2>
          </div>
        </div>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-md">Error: {error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No scheduled events found</h3>
            <p className="mt-2 text-sm text-gray-500">Create an event to get started.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateMenu(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getHostName(booking.host, booking)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatEventDate(booking.start)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatEventTime(booking.start)} - {formatEventTime(booking.end)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewDetails(booking._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>  
      </main>
    </div>
  );
}

export default Scheduled;