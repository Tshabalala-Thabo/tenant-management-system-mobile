import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://localhost:8001/api',
});

// Add an interceptor to attach the token to each request
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
