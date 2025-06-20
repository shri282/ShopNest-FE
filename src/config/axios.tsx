import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const apiPublic = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPrivateMultiPart = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

apiPrivate.interceptors.request.use((config) => {
    const loggedInUserStr = sessionStorage.getItem('loggedInUser');

    if(!loggedInUserStr) {
        return config;
    }

    const { token } = JSON.parse(loggedInUserStr);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiPrivateMultiPart.interceptors.request.use((config) => {
    const loggedInUserStr = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserStr) {
        return config;
    }

    const { token } = JSON.parse(loggedInUserStr);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

apiPrivate.interceptors.response.use((resp) => resp, (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

apiPrivateMultiPart.interceptors.response.use((resp) => resp, (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);
  
