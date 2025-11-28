import { useEffect, useState, useRef } from 'react';
import type { Product } from '../types/types';
import { productosAPI } from '../services/productosAPI';
import Navbar from './Navbar';
import ProductsTable from './ProductsTable';
import CreateProductModal from './CreateProductModal';
import EditProductModal from './EditProductModal';

export default function Dashboard() {
    const [productos, setProductos] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await productosAPI.getAll();
                if (isMounted.current) {
                    setProductos(data.results);
                }
            } catch (error) {
                console.log("Error al obtener productos de la API", error);
            } finally {
                setLoading(false);
            }
        }

        getProducts();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="mt-8 max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-full font-bold bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <span>Cargando productos...</span>
                    </div>
                </div>
            </div>
        );
    }
    
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleProductCreated = (producto: Product) => {
        setProductos((prev) => [producto, ...prev]);
    };

    const openEditModal = (id: number) => {
        const product = productos.find(p => p.id === id);
        if (product) {
            setProductToEdit(product);
            setEditModalOpen(true);
        }
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setProductToEdit(null);
    };

    const handleProductEdited = (updatedProduct: Product) => {
        setProductos(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setEditModalOpen(false);
        setProductToEdit(null);
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
                onEditProduct={openEditModal}
            />
            <CreateProductModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onCreated={handleProductCreated}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                product={productToEdit}
                onUpdate={handleProductEdited}
            />
        </div>
    );
};
