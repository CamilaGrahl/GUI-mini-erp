export const API_CONFIG = {
    BASE_URL: "https://minierp.rbnetto.dev",
    ENDPOINTS: {
        LOGIN: "/api/users/users/login/",
        PRODUCTS: "/api/inventory/products/"
    }
} as const;

export const CREDENTIALS = {
    admin: {
        email: "admin@minierp.com",
        password: "test123456"
    }
} as const;