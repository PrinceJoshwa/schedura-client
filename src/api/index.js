const API_URL = import.meta.env.VITE_API_URL || 'https://schedura-server-page.vercel.app/api';


export const googleAuth = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Google authentication failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};