import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../../store/store";
import { logout, refreshToken } from "../../store/slices/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define custom error response type
interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

// Extend InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Transform response data
const transformResponse = (response: AxiosResponse) => {
    if (response.data && typeof response.data === "object") {
        return response.data;
    }
    return response;
};

// Handle API errors
const handleError = (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
        return "Network error. Please check your connection.";
    }

    const { status, data } = error.response;

    switch (status) {
        case 400:
            return data.message || "Bad request";   
        case 401:
            return "Unauthorized. Please log in again.";
        case 403:
            return "Access forbidden";
        case 404:
            return "Resource not found";
        case 422:
            return data.errors ? Object.values(data.errors).flat().join(", ") : "Validation error";
        case 429:
            return "Too many requests. Please try again later.";
        case 500:
            return "Server error. Please try again later.";
        default:
            return "An unexpected error occurred";
    }
};

// Handle token refresh
const handleTokenRefresh = async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            await store.dispatch(refreshToken()).unwrap();
            const state = store.getState();
            const token = state.auth.accessToken;

            if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            }
        } catch (refreshError) {
            store.dispatch(logout());
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const state = store.getState();
        const token = state.auth.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError<ErrorResponse>) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return transformResponse(response);
    },
    (error: AxiosError<ErrorResponse>) => {
        const errorMessage = handleError(error);
        return handleTokenRefresh(error).catch((refreshError) => {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject(new Error(errorMessage));
        });
    }
);

export default axiosInstance; 