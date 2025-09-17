// services/authService.js
const getBaseURL = () => {
  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  
  if (nodeEnv === 'development') {
    return import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';
  } else {
    return import.meta.env.VITE_PRODUCTION_URL || 'https://jkworks-architecture-website.onrender.com';
  }
};

const API_BASE_URL = getBaseURL();

export const loginAdmin = async (credentials) => {
  try {
    const loginUrl = `${API_BASE_URL}/auth/login`;
    console.log('🌐 Making API request to:', loginUrl);
    console.log('🔧 Environment:', import.meta.env.VITE_NODE_ENV);
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('📡 API Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 API Response data keys:', Object.keys(data));
    
    // Return the token - adjust field name based on your backend response
    return data.token || data.accessToken;
    
  } catch (error) {
    console.error('💥 authService error:', error);
    throw error;
  }
};
