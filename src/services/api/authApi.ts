import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
    login: async (credentials: { identifier: string; password: string }) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    },

    register: async (userData: {
        firstName: string;
        lastName: string;
        gender: string;
        age: number;
        email: string;
        mobile: string;
        password: string;
        latitude: number;
        longitude: number;
    }) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    },

    requestOtp: async (data: { email?: string; mobile?: string; deviceType: 'mobile' | 'web' }) => {
        const response = await axios.post(`${API_BASE_URL}/auth/request-otp`, data);
        return response.data;
    },

    verifyOtp: async (data: { email?: string; mobile?: string; otp: string; deviceType: 'mobile' | 'web' }) => {
        const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, data);
        return response.data;
    },

    refreshToken: async (refreshToken: string) => {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
        });
        return response.data;
    },
}; 