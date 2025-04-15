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

// "use client"

// import { useEffect, useState } from "react"
// import { useGoogleLogin } from "@react-oauth/google"
// import { useNavigate } from "react-router-dom"
// import { googleAuth } from "../api"
// import { isAuthenticated } from "../utils/auth"

// function Login() {
//   const navigate = useNavigate()
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showEmailForm, setShowEmailForm] = useState(false)

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate("/")
//     }
//   }, [navigate])

//   const handleEmailLogin = async (e) => {
//     e.preventDefault()
//     // Add your email/password login logic here
//   }

//   const handleGoogleLogin = async (response) => {
//     setIsLoading(true)
//     setError("")
//     try {
//       const userData = await googleAuth(response.access_token)

//       if (userData && userData.token) {
//         localStorage.setItem("userToken", userData.token)
//         localStorage.setItem(
//           "userData",
//           JSON.stringify({
//             id: userData._id,
//             name: userData.name,
//             email: userData.email,
//           }),
//         )

//         navigate("/")
//       } else {
//         throw new Error("Invalid response from server")
//       }
//     } catch (error) {
//       console.error("Login failed:", error)
//       setError("Login failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const login = useGoogleLogin({
//     onSuccess: handleGoogleLogin,
//     onError: (error) => {
//       console.error("Google Login Failed:", error)
//       setError("Google login failed. Please try again.")
//     },
//   })

//   const showEmailLoginForm = () => {
//     setShowEmailForm(true)
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700">
//       <div className="w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg">
//         {error && (
//           <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-sm text-red-700" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         <div className="flex flex-col items-center mb-6">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-blue-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-blue-500">Schedura</h1>
//           <p className="text-gray-600 text-sm">Simplify Your Schedule</p>
//         </div>

//         <h2 className="text-xl font-bold text-center mb-6">Welcome Back</h2>

//         {!showEmailForm ? (
//           <>
//             <button
//               onClick={() => login()}
//               disabled={isLoading}
//               className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//             >
//               {isLoading ? (
//                 <span>Loading...</span>
//               ) : (
//                 <>
//                   <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
//                     <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
//                       <path
//                         fill="#4285F4"
//                         d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
//                       />
//                       <path
//                         fill="#34A853"
//                         d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
//                       />
//                       <path
//                         fill="#FBBC05"
//                         d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
//                       />
//                       <path
//                         fill="#EA4335"
//                         d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
//                       />
//                     </g>
//                   </svg>
//                   Continue with Google
//                 </>
//               )}
//             </button>

//             <div className="relative my-4">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">or</span>
//               </div>
//             </div>

//             <button
//               onClick={showEmailLoginForm}
//               className="w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//               Continue with Email
//             </button>
//           </>
//         ) : (
//           <form onSubmit={handleEmailLogin} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 placeholder="m@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
//                   Forgot your password?
//                 </a>
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//             >
//               Login
//             </button>

//             <button
//               type="button"
//               onClick={() => setShowEmailForm(false)}
//               className="w-full text-sm text-blue-500 hover:text-blue-600"
//             >
//               Back to login options
//             </button>
//           </form>
//         )}

//         <div className="mt-6 text-center text-sm">
//           <span className="text-gray-600">Don't have an account? </span>
//           <a href="/signup" className="text-blue-500 hover:text-blue-600">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-accent-600 to-secondary-600 p-4 animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>

      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-80 transform -rotate-3"></div>
        <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-80 transform rotate-3"></div>

        <div className="card relative bg-white/90 backdrop-blur-sm p-8 shadow-xl border-0 animate-scale-up">
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

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Schedura
            </h1>
            <p className="text-gray-600 text-sm mt-1">Simplify Your Schedule</p>
          </div>

          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

          {!showEmailForm ? (
            <div className="space-y-4 animate-slide-up">
              <button
                onClick={() => login()}
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
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
                  <>
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={showEmailLoginForm}
                className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 py-3 px-4 text-white hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-5 animate-slide-up">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="form-input pl-10"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-input pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 py-3 px-4 text-white hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="w-full text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                Back to login options
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

