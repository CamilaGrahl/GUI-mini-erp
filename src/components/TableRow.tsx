import { Product } from '../types/types';

interface TableRowProps {
    data: Product;
<<<<<<< HEAD
    onDelete: (id: number) => void;
}

export default function TableRow({ data, onDelete }: TableRowProps) {

    return(
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.stock_quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                <button onClick={() => onDelete(data.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
        </tr>
    );
}
=======
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
>>>>>>> a57f6872f16839d0acbf47bf10a78d18b272e458
