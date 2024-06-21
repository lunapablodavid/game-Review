"use client";
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import Category from './Categorias'; 
export const GamesSection = () => {
    const [tag, setTag] = useState('Todos');
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:3001/video_game/';
                if (tag !== 'Todos') {
                    url += `category/${tag}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los juegos');
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
            }
        };
        
        fetchData();
        console.log(tag);
    }, [tag]);

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    return (
        <>
            <Category onTagChange={handleTagChange} selectedTag={tag} />
            <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                Juegos
            </h2>
            <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                {games.map((game) => (
                    <GamesCard
                        key={game.id}
                        title={game.name}
                        description={game.description}
                        imgUrl={game.images}
                    />
                ))}
            </div>
        </>
    );
};

export default GamesSection;