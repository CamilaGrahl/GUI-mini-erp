import { Product, ProductFormInput } from '../types';

const BASE_URL = 'https://minierp.rbnetto.dev/api/inventory/products/';

export function getProducts() {
    return fetch(`${BASE_URL}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("error al obtener productos")
            }
            return res.json();
        })
        .then((data: Product[]) => { return data; })
        .catch(error => {
            console.log("error:" + error.message)
        });

}

export async function createProduct(data: ProductFormInput) {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            const message = (error && (error.message || JSON.stringify(error))) || "error al crear el producto";
            throw new Error(message);
        }

        const newProduct = await res.json() as Product;
        return newProduct;

    } catch (error) {
        console.error("Fallo al crear producto:", (error as Error).message);
    }

}


export async function deleteProduct(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            const message = (error && (error.message || JSON.stringify(error))) || "error al eliminar el producto";
            throw new Error(message);
        }

        const newProduct = await res.json() as Product;
        return newProduct;

    } catch (error) {
        console.error("Fallo al eliminar producto:", (error as Error).message);
    }
}