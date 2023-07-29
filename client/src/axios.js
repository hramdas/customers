import axios from 'axios';
export const AXIOS_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL
});