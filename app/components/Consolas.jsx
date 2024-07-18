"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '../context/UserContext';

export const Consolas = () => {
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
            }
        };

        fetchConsolas();
    }, [userData?.token]);


    const renderTabContent = () => {
        if (consolas.length === 0) {
            return <div>No hay consolas disponibles.</div>; // Mensaje de error si no hay consolas
        }

        return (
            <ul>
                {consolas.map((console) => (
                    <button className='text-[#adb7be] border-slate-600 hover:border-white hover:text-white hover:bg-orange-500 rounded-full border-2 px-6 py-3 sm:text-sm cursor-pointer' key={console.id}>{console.name}</button>
                ))}
            </ul>
        );
    };

    return (
        <section className='text-white'>
            {userData.name &&
                <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
                    <Image src='/images/consolas.jpg' alt='imagen consolas' width={500} height={500} />
                    <div>
                        <h2 className='text-4xl text-white font-bold mb-4'>Consolas:</h2>
                        <p className='text-base lg:text-lg'>
                            ¡Bienvenidos a nuestra plataforma, el destino definitivo para los amantes de los videojuegos!
                            En nuestro sitio, hemos reunido una impresionante colección de consolas de videojuegos para satisfacer a todos los jugadores,
                            desde los aficionados hasta los más dedicados. Aquí te presentamos un recorrido por todas las consolas de videojuegos que puedes encontrar en nuestro sitio.
                        </p>
                        <div className='mt-8'>{renderTabContent()}</div>
                    </div>
                </div>
            }
        </section>
    );
};

export default Consolas;