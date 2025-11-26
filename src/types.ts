export interface Product {
    id: number;
    name: string;
    price: number;
    stock_quantity: number;
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