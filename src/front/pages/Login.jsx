import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://humble-umbrella-wg5xp549g9jhvv6x-3001.app.github.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login exitoso");
                // Guarda el token en sessionStorage
                sessionStorage.setItem("token", data.token);
                navigate("/private");  // Redirige a la ruta privada
            } else {
                setError("Ocurrió un error al iniciar sesion. Intentalo de nuevo.");
            }
        } catch (error) {
            setError("Ocurrió un error inesperado. Intenta de nuevo.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start vh-100 pt-5 bg-light">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="bg-white p-4 rounded">
                    <h2 className="text-center mb-4">Iniciar sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar sesión
                        </button>
                        <div className="text-center mt-3">
                            <span>¿No tienes cuenta? </span>
                            <Link to="/">Regístrate</Link>
                        </div>
                    </form>

                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Login;
