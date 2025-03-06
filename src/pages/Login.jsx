// import React, { useEffect, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { googleAuth } from '../api';
// import { isAuthenticated } from '../utils/auth';

// function Login() {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     // Add your email/password login logic here
//   };

//   const handleGoogleLogin = async (response) => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const userData = await googleAuth(response.access_token);
      
//       if (userData && userData.token) {
//         localStorage.setItem('userToken', userData.token);
//         localStorage.setItem('userData', JSON.stringify({
//           id: userData._id,
//           name: userData.name,
//           email: userData.email
//         }));
        
//         navigate('/');
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: handleGoogleLogin,
//     onError: (error) => {
//       console.error('Google Login Failed:', error);
//       setError('Google login failed. Please try again.');
//     }
//   });

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg">
//         <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        
//         {error && (
//           <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-sm text-red-700" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
        
//         <form onSubmit={handleEmailLogin} className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               placeholder="m@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <a 
//                 href="/forgot-password"
//                 className="text-sm text-blue-500 hover:text-blue-600"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               id="password"
//               type="password"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-md bg-black py-2 px-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
//           >
//             Login
//           </button>
//         </form>

//         <div className="relative my-4">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-200" />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="bg-white px-2 text-gray-500">or</span>
//           </div>
//         </div>

//         <button
//           onClick={() => login()}
//           disabled={isLoading}
//           className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <span>Loading...</span>
//           ) : (
//             <>
//               <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
//               Login with Google
//             </>
//           )}
//         </button>

//         <div className="mt-6 text-center text-sm">
//           <span className="text-gray-600">Don't have an account? </span>
//           <a href="/signup" className="text-blue-500 hover:text-blue-600">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

"use client"

import { useEffect, useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { googleAuth } from "../api"
import { isAuthenticated } from "../utils/auth"

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/")
    }
  }, [navigate])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    // Add your email/password login logic here
  }

  const handleGoogleLogin = async (response) => {
    setIsLoading(true)
    setError("")
    try {
      const userData = await googleAuth(response.access_token)

      if (userData && userData.token) {
        localStorage.setItem("userToken", userData.token)
        localStorage.setItem(
          "userData",
          JSON.stringify({
            id: userData._id,
            name: userData.name,
            email: userData.email,
          }),
        )

        navigate("/")
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => {
      console.error("Google Login Failed:", error)
      setError("Google login failed. Please try again.")
    },
  })

  const showEmailLoginForm = () => {
    setShowEmailForm(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700">
      <div className="w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg">
        {error && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-sm text-red-700" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
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
          </div>
          <h1 className="text-2xl font-bold text-blue-500">Schedura</h1>
          <p className="text-gray-600 text-sm">Simplify Your Schedule</p>
        </div>

        <h2 className="text-xl font-bold text-center mb-6">Welcome Back</h2>

        {!showEmailForm ? (
          <>
            <button
              onClick={() => login()}
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={showEmailLoginForm}
              className="w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Continue with Email
            </button>
          </>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                  Forgot your password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="w-full text-sm text-blue-500 hover:text-blue-600"
            >
              Back to login options
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login

