"use client"
import React, { useState, useEffect } from "react";

const GamesSection = ({ selectedTag }) => {
    const [juegos, setJuegos] = useState([]);
    const [error, setError] = useState(null);
    const baseUrl = 'http://localhost:3001/videogames';

    useEffect(() => {
        const obtenerJuegos = async () => {
            try {
                let url = baseUrl;
                if (selectedTag !== 'Todos') {
                    url = `http://localhost:3001/category/name/${selectedTag}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los juegos');
                }
                const data = await response.json();
                if (selectedTag === 'Todos') {
                    setJuegos(data);
                } else {
                    setJuegos(data.videoGame || []);
                }
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
                setError(error.message);
            }
        };

        obtenerJuegos();
    }, [selectedTag]);

    return (
        <div className='juegos-container'>
            {error && <div className='text-center text-red-500'>Error: {error}</div>}
            {juegos.length === 0 && !error && <div className='text-center text-red-500'>No hay juegos disponibles</div>}
            {juegos.length > 0 && juegos.map(juego => (
                <div key={juego.id} className='juego-item'>
                    <h3>{juego.name}</h3>
                    <p>{juego.description}</p>
                    <p>Calificación: {juego.qualification}</p>
                </div>
            ))}
        </div>
    );
};

export default GamesSection;