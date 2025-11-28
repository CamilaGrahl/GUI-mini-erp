import { Client } from '../types/types';
import ClientTableRow from './ClientTableRow';

interface ClientsTableProps {
    clientes: Client[];
    onAddClient: () => void;
    onEditClient: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function ClientsTable({ clientes, onAddClient, onDelete, onEditClient }: ClientsTableProps) {

    return (
        <div className="mt-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Lista de Clientes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {clientes.length > 0 ? (
                                clientes.map((c) => (
                                    <ClientTableRow
                                        key={c.id}
                                        data={c}
                                        onDelete={onDelete}
                                        onEdit={onEditClient}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">--- No hay clientes aún ---</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end px-6 py-4 bg-gray-50 border-b">
                    <button onClick={onAddClient} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">Añadir Cliente</button>
                </div>
            </div>
        </div>
    );
}
