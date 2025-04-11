import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://humble-umbrella-wg5xp549g9jhvv6x-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Usuario registrado con éxito. Redirigiendo al inicio de sesión.");
                navigate("/login"); // Redirige al inicio de sesión
            } else {
                setError("Ocurrió un error. Intentalo de nuevo.");
            }

        } catch (error) {
            setError("Ocurrió un error inesperado. Intentalo de nuevo.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start vh-100 pt-5 bg-light">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="bg-white p-4 rounded">
                    <h2 className="text-center mb-4">Regístrate</h2>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Registrarse
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        <span>¿No tienes cuenta? </span>
                        <Link to="/login" className="text-decoration-none">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Signup