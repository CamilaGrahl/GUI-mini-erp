import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosError} from 'axios';
import { API_CONFIG } from '../config/api';

//Para crear la instancia de Axios
const api: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

//Interceptor para agregar TOKEN
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('TOKEN');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        Promise.reject(error);
    }
);

//Interceptor para Errores 401 (Autenticación)
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('USER');
            window.location.href = "/GUI-mini-erp/";
        }
        return Promise.reject(error);
    }
);

export default api;