import api from "./api";
import { API_CONFIG } from "../config/api";
import type { LoginRequest, LoginResponse } from "../types/types";

export const authAPI = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const payload: LoginRequest = { email, password }
        const response = await api.post<LoginResponse>(API_CONFIG.ENDPOINTS.LOGIN, payload);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER");
    }
}