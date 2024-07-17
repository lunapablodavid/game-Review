"use client"
import React, { useState, useEffect } from "react";
import GamesTags from './GamesTags';

const Category = ({ onTagChange, selectedTag }) => {
    const [categorias, setCategorias] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = 'http://localhost:3000/category/'; 

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await fetch(baseUrl);
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setCategorias(data);
               
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerCategorias();
    }, []);

    const manejarClickTag = (nuevoTag) => {
        onTagChange(nuevoTag);
        console.log(`Tag clicked: ${nuevoTag}`);
    };
 
    return (
        <>
            <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                Categorías
            </h2>
            <div className='text-white justify-center items-center grid md:grid-cols-5 gap-5 md:gap-6 p-4 mb-8'>
                {cargando && <div>Cargando categorías...</div>}
                {error && <div>Error al obtener las categorías: {error}</div>}
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
                        onClick={() => manejarClickTag(categoria.name)}//categoria?.videoGame(la asociacion como esta en nest)
                        name={categoria.name}
                        isSelected={selectedTag === categoria.name}
                    />
                ))}
            </div>
        </>
    );
};

export default Category;