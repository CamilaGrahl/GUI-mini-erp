import { Client } from '../types/types';

interface ClientTableRowProps {
    data: Client;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function ClientTableRow({ data, onEdit, onDelete }: ClientTableRowProps) {

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.address}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => onEdit(data.id)} className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                <button onClick={() => onDelete(data.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
        </tr>
    );
}
