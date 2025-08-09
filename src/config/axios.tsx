import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL as string;

export const apiPublic = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const apiPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const apiPrivateMultiPart = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
});


const attachAuthToken = (config: InternalAxiosRequestConfig) => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (!storedUser) return config;

    const { token } = JSON.parse(storedUser);
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
};

const handleUnauthorizedError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '/login';
    }
    return Promise.reject(error);
};


[apiPrivate, apiPrivateMultiPart].forEach((instance) => {
    instance.interceptors.request.use(attachAuthToken, Promise.reject);
    instance.interceptors.response.use((resp) => resp, handleUnauthorizedError);
});