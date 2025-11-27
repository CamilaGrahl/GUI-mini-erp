import { useState } from "react";
import { authAPI } from "../services/authAPI";
import type { LoginResponse } from "../types/types";

interface LoginProps {
    onLoginSuccess?: (data: LoginResponse) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const response = await authAPI.login(usuario, password);
            localStorage.setItem('TOKEN', response.access_token);
            localStorage.setItem('USER', JSON.stringify(response.user));

            if (onLoginSuccess) {
                onLoginSuccess(response);
            }
        } catch(error: any) {
            setErrorMsg("Usuario/Contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Inicio de Sesión</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Usuario */}
                <div className="relative">
                    <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Usuario"
                        className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                            focus:border-purple-500 focus:outline-none transition-colors
                            placeholder-transparent"
                    />
                    <label
                        htmlFor="usuario"
                        className="absolute left-4 -top-2.5 bg-gradient-to-br from-purple-50 to-blue-50 
                            px-2 text-sm text-gray-600 transition-all
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm 
                            peer-focus:text-purple-600"
                    >Usuario
                    </label>
                </div>
                {/* Password */}
                <div className="relative">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                            focus:border-purple-500 focus:outline-none transition-colors 
                            placeholder-transparent"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-4 -top-2.5 bg-gradient-to-br from-purple-50 to-blue-50 
                            px-2 text-sm text-gray-600 transition-all
                             peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm 
                            peer-focus:text-purple-600"
                    >Contraseña
                    </label>
                </div>
                {/* Error */}
                {errorMsg && (
                    <p className="text-red-500 text-sm">{errorMsg}</p>
                )}
                {/* Botón */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 
                        rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 
                        transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}    
                </button>
            </form>
        </div>
    );
}