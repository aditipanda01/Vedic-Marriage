import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { tokenStorage } from '@/lib/token';
// Create axios instance with base URL
const api = axios.create({
  baseURL: ""
});

// Configure retry logic
axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount: number) => {
    return retryCount * 1000;
  }
});

// Error handling function
const getErrorToast = (error: any) => {
  const summary = { title: 'Unknown Error', message: '' };
  let detailMsg = '';
  
  if (error.response && error.response.data) {
    if (error.response.data.error) {
      summary.title = error.response.data.error;
      delete error.response.data.error;
    }
    if (error.response.data.message) {
      summary.message = error.response.data.message;
      delete error.response.data.message;
    }
    if (error.response.data.details) {
      detailMsg = error.response.data.details;
    } else if (error.response.data.length > 0) {
      detailMsg = error.response.data;
    }
  }

  // Generate hash to identify message
  const hashStr = detailMsg + summary;
  let hash = 0;
  let chr;
  for (let i = 0; i < hashStr.length; i++) {
    chr = hashStr.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  // Error status
  const status = error.response ? error.response.status : 'unknown';

  // Error details
  const detail = {
    msg: detailMsg,
    status,
    id: hash,
    timestamp: new Date()
  };

  console.log('Error Summary:', summary);
  console.log('Error Detail:', detail);
  console.log('Error Status:', status);

  return { summary, detail, status };
};

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    
    // Add authentication token to requests
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add any request logic here (loading states, headers, etc.)
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.config.url);
    return response;
  },
  (error) => {
    const { summary, detail } = getErrorToast(error);
    console.error('Response error:', error);
    
    // Handle Token expired message
    if (error.response?.data?.message === 'Token expired') {
      console.log('Token expired, logging out and clearing localStorage');
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Handle 401 Unauthorized errors by clearing auth data
    if (error.response?.status === 401) {
      console.log('Unauthorized access, clearing auth data');
      tokenStorage.removeToken();
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    
    // You can add toast notification here if you have a toast system
    // For now, we'll just log the error
    console.error('Error Summary:', summary);
    console.error('Error Detail:', detail);
    
    return Promise.reject(error);
  }
);

export default api; 