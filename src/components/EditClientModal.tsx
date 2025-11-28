import { useState, useEffect } from "react";
import { clientesAPI } from "../services/clientesAPI"; 
import type { Client } from "../types/types";
import { useNotification } from "./NotificationContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    client: Client | null;
    onUpdate?: (c: Client) => void;
}

export default function EditClientModal({ isOpen, onClose, client, onUpdate }: Props) {
    const { showNotification } = useNotification();
    
    const [formData, setFormData] = useState({
        id: -1,
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        if (client) {
            setFormData({
                id: client.id,
                name: client.name,
                email: client.email || "",
                phone: client.phone,
                address: client.address
            });
        }
    }, [client]);
    if (!isOpen || !client) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateClientBody = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
        }

        try {
            console.log(`Enviando actualizacion para id: ${formData.id} a la Api, con cuerpo:`, updateClientBody);
            const updatedClient = await clientesAPI.update(formData.id, updateClientBody)
            console.log("Cliente actualizado correctamente:", updatedClient);
            showNotification("Cliente actualizado correctamente", "success");

            if (onUpdate) onUpdate(updatedClient);
            onClose();

        } catch (error) {
            console.error("Error al editar cliente:", error);
            showNotification("No se pudo actualizar el cliente", "error");
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
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
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Teléfono</span>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Dirección</span>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full border rounded p-2"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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