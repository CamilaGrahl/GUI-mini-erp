import { Product } from '../types/types';
import TableRow from './TableRow';

interface ProductsTableProps {
    productos: Product[];
}

const ProductsTable = ({ productos }: ProductsTableProps) => (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                (productos) ?
                    productos.map((p) => (
                        <TableRow key={p.id} data={p} />
                    ))
                    : <td>No products yet</td>
            }
        </tbody>
    </table>
)

export default ProductsTable;