"use client";
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import { GamesTags } from './GamesTags';
import GamesInfo from './GamesInfo';
import { useUser } from '../context/UserContext';
import Category from './Category';


export const GamesSection = () => {
    const [tag, setTag] = useState('Todos');
    const [expanded, setExpanded] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const {userData} = useUser() || {};
    const [games, setGames] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:3000/video_games/';
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


    const handdleTagChange = (newTag) => {
        setTag(newTag);
    };

      const handleTagChange = (newTag) => {
        setTag(newTag);
    };
      const handleCloseModal = () => {
        setSelectedGame(null);
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
                        gameUrl={game.company?.siteUrl}
                        onEyeClick={() => setSelectedGame(game)}
                    />
                ))}
            </div>

            {selectedGame && (
                <GamesInfo
                    id={selectedGame.id}
                    title={selectedGame.name}
                    description={selectedGame.description}
                    imgUrl={selectedGame.images}
                    onClose={() => setSelectedGame(null)}
                />
            )}
            {userData.name && !expanded && (
                <div className='flex justify-center mt-10'>
                    <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white'
                        onClick={() => setExpanded(true)}>
                        Ver más
                    </button>

                </div>
            )}
            {userData.name && expanded && (
                <div className='flex justify-center mt-10'>
                    <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white'
                        onClick={() => setExpanded(false)}>
                        Ver menos
                    </button>
                </div>
            )}
        </>
    )
}

