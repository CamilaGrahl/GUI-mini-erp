import api from "./api";
import { API_CONFIG } from "../config/api";
import type { ClientListResponse, Client } from "../types/types";

export const clientesAPI = {
    getAll: async (): Promise<ClientListResponse> => {
        const response = await api.get(API_CONFIG.ENDPOINTS.CLIENTS);
        return response.data;
    },

    create: async (clientData: Partial<Client>): Promise<Client> => {
        const response = await api.post(API_CONFIG.ENDPOINTS.CLIENTS, clientData);
        return response.data;
    },

    update: async (clientId: number, clientData: Partial<Client>): Promise<Client> => {
        const response = await api.put(`${API_CONFIG.ENDPOINTS.CLIENTS}${clientId}/`, clientData);
        return response.data;
    },

    delete: async (clientId: number): Promise<Client> => {
        const response = await api.delete(`${API_CONFIG.ENDPOINTS.CLIENTS}${clientId}/`);
        return response.data;
    }
}