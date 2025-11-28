import { useEffect, useState, useRef } from 'react';
import type { Client } from '../types/types';
import { clientesAPI } from '../services/clientesAPI';
import Navbar from './Navbar';
import ClientsTable from './ClientsTable';
import CreateClientModal from './CreateClientModal';
import EditClientModal from './EditClientModal';

export default function ClientBoard() {
    const [clientes, setClientes] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    useEffect(() => {
        const getClients = async () => {
            try {
                const data = await clientesAPI.getAll();
                if (isMounted.current) {
                    setClientes(data.results);
                }
            } catch (error) {
                console.log("Error al obtener clientes de la API", error);
            } finally {
                setLoading(false);
            }
        }

        getClients();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="mt-8 max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-full font-bold bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <span>Cargando clientes...</span>
                    </div>
                </div>
            </div>
        );
    }

    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleClientCreated = (cliente: Client) => {
        setClientes((prev) => [cliente, ...prev]);
    };

    const openEditModal = (id: number) => {
        const client = clientes.find(c => c.id === id);
        if (client) {
            setClientToEdit(client);
            setEditModalOpen(true);
        }
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setClientToEdit(null);
    };

    const handleClientEdited = (updatedClient: Client) => {
        setClientes(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
        setEditModalOpen(false);
        setClientToEdit(null);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(`¿Desea eliminar el cliente con ID: ${id}?`);
        if (!confirmed) return;

        try {
            await clientesAPI.delete(id);
            console.log("Cliente eliminado: ", clientes.find(c => c.id === id));
            setClientes(prev => prev.filter(c => c.id !== id));

        } catch (error) {
            console.error("Error eliminando cliente:", error);
            alert("Error eliminando el cliente");
        }
    }

    return (
        <div>
            <Navbar />
            <ClientsTable
                clientes={clientes}
                onAddClient={openCreateModal}
                onDelete={handleDelete}
                onEditClient={openEditModal}
            />
            <CreateClientModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onCreated={handleClientCreated}
            />
            <EditClientModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                client={clientToEdit}
                onUpdate={handleClientEdited}
            />
        </div>
    );
}