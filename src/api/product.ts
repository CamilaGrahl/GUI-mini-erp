import { Product } from '../types';

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