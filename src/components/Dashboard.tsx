import { useEffect, useState, useRef } from 'react';
import type { Product } from '../types/types';
import { productosAPI } from '../services/productosAPI';
import Navbar from './Navbar';
import ProductsTable from './ProductsTable';
import CreateProductModal from './CreateProductModal';

export default function Dashboard() {
    const [productos, setProductos] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await productosAPI.getAll();
                if (isMounted.current) {
                    setProductos(data.results);
                }
            } catch(error) {
                console.log("Error al obtener productos de la API", error);
            } finally {
                setLoading(false);
            }
        }

        getProducts();
    }, []);

    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleProductCreated = (producto: Product) => {
        setProductos((prev) => [producto, ...prev]);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(`¿Desea eliminar el producto con ID: ${id}?`);
        if (!confirmed) return;

        try {
            await productosAPI.delete(id);
            console.log("Producto eliminado: ", productos.find(p => p.id === id));
            setProductos(prev => prev.filter(p => p.id !== id));
            
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("Error eliminando el producto");
        }
    }

    return (
        <div>
            <Navbar />
            <ProductsTable
                productos={productos}
                onAddProduct={openCreateModal}
                onDelete={handleDelete}
            />
            <CreateProductModal 
                isOpen={isCreateModalOpen} 
                onClose={closeCreateModal}
                onCreated={handleProductCreated}
            />
        </div>
    );
};
