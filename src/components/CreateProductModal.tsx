import { useState } from "react";
import { productosAPI } from "../services/productosAPI";
import type { Product } from "../types/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: (p: Product) => void;
}

export default function CreateProductModal({ isOpen, onClose, onCreated }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: 0
    })

    if (!isOpen) return null; //Si no está abierto el modal, no renderizamos

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nuevo Producto: ", formData);
        try {
            console.log("Enviando producto a la API...", formData);
            const nuevoProducto = await productosAPI.create(formData);
            console.log("Producto creado correctamente:", nuevoProducto);

            if (onCreated) onCreated(nuevoProducto);
            onClose();

            setFormData({
                name: "",
                description: "",
                price: "",
                stock_quantity: 0
            });

        } catch (error) {
            console.error("Error al crear producto:", error);
            alert("No se pudo crear el producto");
        }
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Añadir Producto</h2>
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
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}