"use client";
import React, { useState, useEffect } from "react";
import GamesTags from './GamesTags';
import { useUser } from '../context/UserContext';

const Category = ({ onTagChange, selectedTag }) => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = 'http://localhost:3000/category/';
    const { userData } = useUser() || {};

    useEffect(() => {
        const obtenerCategorias = async () => {
            setCargando(true);
            try {
                const headers = {};
                if (userData?.token) {
                    headers['Authorization'] = `Bearer ${userData.token}`;
                }
                const response = await fetch(baseUrl, { headers });
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setCategorias(data);
                setError(null); // Reiniciar el estado de error si la solicitud tiene éxito
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerCategorias();
    }, [baseUrl, userData?.token]);

    const manejarClickTag = (nuevoTag) => {
        onTagChange(nuevoTag);
        console.log(`Tag clicked: ${nuevoTag}`);
    };

    return (
        <>
            {userData.name &&
                <>
                    <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                        Categorías
                    </h2>
                    <div className='text-white justify-center items-center grid md:grid-cols-5 gap-5 md:gap-6 p-4 mb-8'>
                        {cargando &&
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                            </div>}
                        {!cargando && !error && categorias.length === 0 && <div>No hay categorías disponibles</div>}
                        <GamesTags
                            key="todos"
                            onClick={() => manejarClickTag('Todos')}
                            name="Todos"
                            isSelected={selectedTag === 'Todos'}
                        />
                        {categorias.map(categoria => (
                            <GamesTags
                                key={categoria.id}
                                onClick={() => manejarClickTag(categoria.name)}
                                name={categoria.name}
                                isSelected={selectedTag === categoria.name}
                            />
                        ))}
                    </div>
                </>
            }
        </>
    );
};

export default Category;