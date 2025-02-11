import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Handle token refresh or logout here
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { token } = response.data;
          await AsyncStorage.setItem('auth_token', token);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and reject
          await AsyncStorage.multiRemove(['auth_token', 'refresh_token']);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// API request helpers
export const apiClient = {
  get: <T>(url: string, config = {}) => 
    api.get<T>(url, config),

  post: <T>(url: string, data = {}, config = {}) => 
    api.post<T>(url, data, config),

  put: <T>(url: string, data = {}, config = {}) => 
    api.put<T>(url, data, config),

  patch: <T>(url: string, data = {}, config = {}) => 
    api.patch<T>(url, data, config),

  delete: <T>(url: string, config = {}) => 
    api.delete<T>(url, config),
};

export default api;
