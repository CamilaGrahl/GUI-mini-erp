export interface Product {
    id: number;
    name: string;
    description: string | null;
    sku: string | null;
    category: string | null;
    price: string;
    cost_price: string | null;
    stock_quantity: number;
    min_stock_level: number;
    max_stock_level: number;
    is_active: boolean;
    stock_status: string;  
    created_by_name: string;
    created_at: string;
    updated_at: string; 
}

export interface ProductListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    address: string;
    role: Role;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface ProductFormInput {
    name: string;
    price: number;
    stock_quantity: number;
}


export interface LoginFormInput {
    email: string;
    password: string;
}

export interface SessionStatus {
    isLoggedIn: boolean;
    user: {
        email: string;
        password: string;
    } | null;
    token: string | null;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    is_active: boolean;
    orders_count: string;
    created_at: string;
    updated_at: string;
}

export interface ClientListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Client[];
}