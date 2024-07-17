"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { useUser } from '../context/UserContext'; // Ajusta la ruta según tu estructura de archivos

export const Consolas = () => {
    const [tab, setTab] = useState("portatiles");
    const [consolas, setConsolas] = useState([]);
    const { userData } = useUser(); // Cambiado de SessionContext a UserContext

    useEffect(() => {
        const fetchConsolas = async () => {
            try {
                const response = await fetch('http://localhost:3000/console');
                if (!response.ok) {
                    throw new Error('Error al obtener las consolas');
                }
                const data = await response.json();
                setConsolas(data);
            } catch (error) {
                console.error('Error al obtener las consolas:', error);
            }
        };

        fetchConsolas();
    }, []);

    const handleTabChange = (id) => {
        setTab(id);
    };

    const renderTabContent = () => {
        const selectedTab = consolas.find((c) => c.id === tab);
        if (!selectedTab) {
            return null; // Puedes manejar aquí cómo mostrar si no hay datos para la pestaña seleccionada
        }

        return (
            <ul>
                {selectedTab.consoles.map((console) => (
                    <li key={console.id}>{console.name}</li>
                ))}
            </ul>
        );
    };

    return (
        <section className='text-white'>
            {userData.name && (
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
            )}
        </section>
    );
};

export default Consolas;