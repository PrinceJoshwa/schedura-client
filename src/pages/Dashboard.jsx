
"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import axios from "axios"
import { isAuthenticated, getUserData, logout, getToken } from "../utils/auth"
import { Link } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const userData = getUserData()
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(null)
  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState("")
  const createMenuRef = useRef(null)
  const dropdownRefs = useRef({})

  // const API_URL = import.meta.env.VITE_API_URL || 'https://schedura-server-page.vercel.app/api';
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login")
    } else {
      fetchBookings()
    }
  }, [navigate])

  useEffect(() => {
    function handleClickOutside(event) {
      // Handle create menu clicks outside
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setShowCreateMenu(false)
      }

      // Handle dropdown menu clicks outside
      if (
        showDropdown &&
        dropdownRefs.current[showDropdown] &&
        !dropdownRefs.current[showDropdown].contains(event.target)
      ) {
        setShowDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showDropdown])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const token = getToken()
      if (!token) {
        throw new Error("No token found")
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      console.log("Fetched bookings:", res.data)
      setBookings(res.data)
      setError(null)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      if (error.response?.status === 401) {
        logout()
        navigate("/login")
      } else {
        setError(error.message || "An error occurred while fetching bookings")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bookingId, e) => {
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return
    }

    try {
      const token = getToken()
      await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      await fetchBookings()
      setShowDropdown(null)
    } catch (error) {
      console.error("Error deleting booking:", error)
      alert("Failed to delete the event. Please try again.")
    }
  }

  const handleEdit = (bookingId, e) => {
    e.stopPropagation()
    navigate(`/edit-booking/${bookingId}`)
    setShowDropdown(null)
  }

  const handleViewDetails = (bookingId) => {
    navigate(`/booking-details/${bookingId}`)
  }

  const handleEventTypeSelection = (eventType) => {
    navigate(`/create-event/${eventType}`)
    setShowCreateMenu(false)
  }

  const toggleDropdown = (id, e) => {
    e.stopPropagation()
    setShowDropdown(showDropdown === id ? null : id)
  }

  const formatEventDate = (dateString) => {
    if (!dateString) return "No date"
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }
      return format(date, "MMMM d, yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const formatEventTime = (dateString) => {
    if (!dateString) return "No time"
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }
      return format(date, "h:mm a")
    } catch (error) {
      console.error("Error formatting time:", error)
      return "Invalid time"
    }
  }

  const handleCopyLink = async (booking, e) => {
    e.stopPropagation()
    try {
      const userEmail = userData.email
      const username = userEmail.split("@")[0]
      const titleSlug = booking.title.toLowerCase().replace(/\s+/g, "-")

      // Determine the base URL based on the environment
      const baseUrl = window.location.origin

      const bookingLink = `${baseUrl}/${username}/${titleSlug}`

      await navigator.clipboard.writeText(bookingLink)
      setCopySuccess("Link copied!")

      // Reset the success message after 2 seconds
      setTimeout(() => {
        setCopySuccess("")
      }, 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      setCopySuccess("Failed to copy")
    }
  }

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
            className="flex items-center space-x-3 rounded-lg bg-primary-50 px-4 py-2.5 text-primary-700 font-medium transition-colors"
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
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
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
                logout()
                navigate("/login")
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
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-xl font-semibold text-gray-800">Event Types</h2>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
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
                <span className="text-lg font-medium text-gray-700">Loading events...</span>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-danger-50 border border-danger-200 p-4 text-danger-700">
              <div className="flex">
                <svg className="h-5 w-5 text-danger-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error: {error}</span>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
              <p className="text-gray-500 mb-4">Create your first event to get started</p>
              <button
                onClick={() => setShowCreateMenu(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Event
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
                  onClick={() => handleViewDetails(booking._id)}
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-primary-600"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{booking.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{formatEventDate(booking.start)}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <svg
                            className="mr-1.5 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {formatEventTime(booking.start)} - {formatEventTime(booking.end)}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <svg
                            className="mr-1.5 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
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
                          {booking.location || "Not specified"}
                        </div>
                        <div className="mt-3">
                          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                            {booking.type || "Standard"}
                          </span>
                          <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            {booking.duration} min
                          </span>
                        </div>
                      </div>
                      <div className="relative ml-4">
                        <button
                          onClick={(e) => toggleDropdown(booking._id, e)}
                          className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                          ref={(el) => (dropdownRefs.current[booking._id] = el)}
                        >
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                        {showDropdown === booking._id && (
                          <div
                            className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={(e) => handleEdit(booking._id, e)}
                              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <svg
                                className="mr-3 h-4 w-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={(e) => handleDelete(booking._id, e)}
                              className="flex w-full items-center px-4 py-2 text-left text-sm text-danger-600 hover:bg-gray-50"
                            >
                              <svg
                                className="mr-3 h-4 w-4 text-danger-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                      <button
                        className="flex items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors relative"
                        onClick={(e) => handleCopyLink(booking, e)}
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        {copySuccess === "Link copied!" ? "Copied!" : "Copy Link"}
                      </button>
                      <button
                        className="flex items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

