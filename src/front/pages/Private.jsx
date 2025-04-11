import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchPrivateData = async (token) => {
        try {
            const response = await fetch("https://humble-umbrella-wg5xp549g9jhvv6x-3001.app.github.dev/api/private", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError( "Ocurrió un error.");
            }

            const data = await response.json();
            setUserData(data.user);
            
        } catch (error) {
            setError("Ocurrió un error inesperado.");
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

        fetchPrivateData(token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="d-flex justify-content-center vh-100">
            <div className="text-center mt-5">
                <h2 className="mb-4">Bienvenido a tu página privada</h2>
                {error && (
                    <div className="bg-danger text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {userData ? (
                    <div className="mb-4">
                        <p><strong>Correo Electrónico:</strong> {userData.email}</p>
                    </div>
                ) : (
                    <div>Cargando...</div>
                )}
                <button onClick={handleLogout} className="btn btn-danger mt-3 w-100">
                    Cerrar sesión
                </button>

            </div>
        </div>


    );
};

export default Private;
