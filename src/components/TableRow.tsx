import { Product } from '../types/types';

interface TableRowProps {
    data: Product;
}

const TableRow = ({ data }: TableRowProps) => (
    <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.price}</td>
        <td>{data.stock_quantity}</td>
        <td><button>edit</button> <button>delete</button></td>
    </tr>
);
export default TableRow;