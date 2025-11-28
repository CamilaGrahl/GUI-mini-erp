import { useState, useEffect } from "react";
import { productosAPI } from "../services/productosAPI";
import type { Product } from "../types/types";
import { useNotification } from "./NotificationContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onUpdate?: (p: Product) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onUpdate }: Props) {
    const { showNotification } = useNotification();
    
    const [formData, setFormData] = useState({
        id: -1,
        name: "",
        description: "",
        price: "",
        stock_quantity: 0
    })

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                description: product.description || "",
                price: product.price.toString(),
                stock_quantity: product.stock_quantity
            });
        }
    }, [product]);
    if (!isOpen || !product) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateProductBody = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock_quantity: formData.stock_quantity
        }

        try {
            console.log(`Enviando actualizacion para id: ${formData.id} a la Api, con cuerpo:`, updateProductBody);
            const updatedProduct = await productosAPI.update(formData.id, updateProductBody)
            console.log("Producto actualizado correctamente:", updatedProduct);
            showNotification("Producto actualizado correctamente", "success");

            if (onUpdate) onUpdate(updatedProduct);
            onClose();

        } catch (error) {
            console.error("Error al editar producto:", error);
            showNotification("No se pudo actualizar el producto", "error");
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Nombre</span>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Descripción</span>
                        <textarea
                            rows={3}
                            className="mt-1 w-full border rounded p-2"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Precio</span>
                        <input
                            type="number"
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: ((e.target.value).toString()) })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Cantidad</span>
                        <input
                            type="number"
                            min={0}
                            max={99}
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.stock_quantity}
                            onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                        />
                    </label>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}