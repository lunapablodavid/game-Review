"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { useUser } from '../context/UserContext';

export const Consolas = () => {
    const [tab, setTab] = useState("portatiles");
    const [consolas, setConsolas] = useState([]);
    const [error, setError] = useState(null); // Estado para el error
    const { userData } = useUser(); 

    useEffect(() => {
        const fetchConsolas = async () => {
            try {
                const headers = {};
                if (userData?.token) {
                    headers['Authorization'] = `Bearer ${userData.token}`;
                }
                const response = await fetch('http://localhost:3000/console', { headers });
                if (!response.ok) {
                    throw new Error('Error al obtener las consolas');
                }
                const data = await response.json();
                setConsolas(data); // Actualizar el estado con los datos obtenidos
            } catch (error) {
                console.error('Error al obtener las consolas:', error);
                setError(error.message); // Guardar el mensaje de error
            }
        };

        fetchConsolas();
    }, [userData?.token]);

    const handleTabChange = (id) => {
        setTab(id);
    };

    const renderTabContent = () => {
        if (consolas.length === 0) {
            return <div>No hay consolas disponibles.</div>; // Mensaje de error si no hay consolas
        }

        return (
            <ul>
                {consolas.map((console) => (
                    <li key={console.id}>{console.name}</li>
                ))}
            </ul>
        );
    };

    return (
        <section className='text-white'>
            {userData.name ? (
                <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
                    <Image src='/images/consolas.jpg' alt='imagen consolas' width={500} height={500} />
                    <div>
                        <h2 className='text-4xl text-white font-bold mb-4'>Consolas:</h2>
                        <p className='text-base lg:text-lg'>
                            ¡Bienvenidos a nuestra plataforma, el destino definitivo para los amantes de los videojuegos!
                            En nuestro sitio, hemos reunido una impresionante colección de consolas de videojuegos para satisfacer a todos los jugadores,
                            desde los aficionados hasta los más dedicados. Aquí te presentamos un recorrido por todas las consolas de videojuegos que puedes encontrar en nuestro sitio.
                        </p>
                        <div className='flex flex-row mt-8'>
                            <TabButton selectTab={() => handleTabChange("portatiles")} active={tab === "portatiles"}>
                                Portátiles
                            </TabButton>
                            <TabButton selectTab={() => handleTabChange("Sobremesa")} active={tab === "Sobremesa"}>
                                Sobremesa
                            </TabButton>
                            <TabButton selectTab={() => handleTabChange("PC")} active={tab === "PC"}>
                                PC
                            </TabButton>
                        </div>
                        <div className='mt-8'>{renderTabContent()}</div>
                    </div>
                </div>
            ) : (
                <div>Por favor, inicia sesión para ver las consolas.</div>
            )}
            {error && <div className='text-red-500 mt-4'>{error}</div>} {/* Mostrar el error si existe */}
        </section>
    );
};

export default Consolas;