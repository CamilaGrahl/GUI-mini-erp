import { useEffect, useState, useRef } from 'react';
<<<<<<< HEAD
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
=======
import { Product } from '../types/types';
import { productosAPI } from '../services/productosAPI';
import ProductsTable from './ProductsTable';

const Dashboard = () => {
    const [productos, setProductos] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        productosAPI.getAll()
            .then((res: any) => {
                if (!isMounted.current) return;
                const list: Product[] = Array.isArray(res)
                    ? res
                    : (res && (res.products ?? res.data ?? []));
                setProductos(list);
            })
            .catch((err: any) => { console.error(err); if (isMounted.current) setProductos([]); })
            .finally(() => { if (isMounted.current) setLoading(false); });

        return () => { isMounted.current = false; };
    }, []);

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <ProductsTable productos={productos || []} />
>>>>>>> a57f6872f16839d0acbf47bf10a78d18b272e458
        </div>
    );
};

<<<<<<< HEAD
//{"name": "Product Test", "description": "Ver documentación", "category": "null", "price": "199.99", "stock_quantity": "10", "is_active": "true"}
=======
export default Dashboard;
>>>>>>> a57f6872f16839d0acbf47bf10a78d18b272e458
