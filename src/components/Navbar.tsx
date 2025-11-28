import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER');
        navigate('/login/');
    }

    const goToProducts = () => {
        navigate('/dashboard/productos');
    }

    const goToReports = () => {
        navigate('/dashboard/reports')
    }

    return (
        <div>
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Mini ERP</h1>
                        <nav className="md:flex items-center space-x-6">
                            <p onClick={goToProducts} className="text-gray-600 hover:text-blue-600 transition duration-200 cursor-pointer">Productos</p>
                            <p className="text-gray-600 hover:text-blue-600 transition duration-200">Clientes</p>
                            <p onClick={goToReports} className="text-gray-600 hover:text-blue-600 transition duration-200">Reportes</p>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">Logout</button>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};
