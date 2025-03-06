//client/src/utils/auth.js

// Utility function to check if user is logged in
export const isAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    return !!token;
  };
  
  // Get user data from localStorage
  export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };
  
  // Get auth token
  export const getToken = () => {
    return localStorage.getItem('userToken');
  };
  
  // Logout user
  export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };