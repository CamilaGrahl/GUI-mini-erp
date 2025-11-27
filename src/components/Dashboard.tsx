import { useEffect, useState, useRef } from 'react';
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
        </div>
    );
};

export default Dashboard;