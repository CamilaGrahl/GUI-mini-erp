import Login from "../components/Login";
import type { LoginResponse } from "../types/types";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    
    const handleLoginSuccess = (data: LoginResponse) => {
        console.log("Usuario logeado: ", data);
        navigate('/dashboard/productos/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}