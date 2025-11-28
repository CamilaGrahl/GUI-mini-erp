import { useEffect, useState } from "react";
import { clientesAPI } from "../services/clientesAPI";
import type { Client } from "../types/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: (p: Client) => void;
}

export default function CreateClientModal({ isOpen, onClose, onCreated }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })

    if (!isOpen) return null; //Si no está abierto el modal, no renderizamos

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nuevo Cliente: ", formData);
        try {
            console.log("Enviando cliente a la API...", formData);
            const nuevoCliente = await clientesAPI.create(formData);
            console.log("Cliente creado correctamente:", nuevoCliente);

            if (onCreated) onCreated(nuevoCliente);
            onClose();

            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
            });

        } catch (error) {
            console.error("Error al crear cliente:", error);
            alert("No se pudo crear el cliente");
        }
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Añadir Cliente</h2>
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
                        <button type="button" onClick={() => {setFormData({name:"",email:"",phone:"",address:""});onClose();}} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}