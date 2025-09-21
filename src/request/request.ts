import axios, { AxiosResponse } from "axios";
import { readSession } from "../utils/WebStorage";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL as string;

function includeToken() {
    axios.defaults.baseURL = API_BASE_URL;

    axios.defaults.withCredentials = true;
    
    const auth = readSession('loggedInUser');

    if (auth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    }
}

export const request = {
    get: async <T>(
        url: string,
        params?: Record<string, any>,
        config = {}
    ): Promise<T> => {
        includeToken();
        const response: AxiosResponse<T> = await axios.get(url, {
            ...config,
            params,
        });
        
        return response.data;
    },
};