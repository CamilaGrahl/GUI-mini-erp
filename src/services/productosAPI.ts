import api from "./api";
import { API_CONFIG } from "../config/api";
import type { ProductListResponse, Product } from "../types/types";

export const productosAPI = {
    getAll: async (): Promise<ProductListResponse> => {
        const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS);
        return response.data;
    },

    getOne: async (productId: number): Promise<Product> => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}/`);
        return response.data;
    },

    create: async (productData: Partial<Product>): Promise<Product> => {
        const response = await api.post(API_CONFIG.ENDPOINTS.PRODUCTS, productData);
        return response.data;
    },

    update: async (productId: number, productData: Partial<Product>): Promise<Product> => {
        const response = await api.put(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}/`, productData);
        return response.data;
    },

    delete: async (productId: number): Promise<Product> => {
        const response = await api.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}/`);
        return response.data;
    }
}