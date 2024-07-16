"use client"
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import { useUser } from '../context/UserContext';
import Category from './Category';
import GamesInfo from './GamesInfo';
export const GamesSection = () => {
  const [tag, setTag] = useState('Todos');
  const [expanded, setExpanded] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const { userData } = useUser() || {};
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3000/video_game';
        if (tag !== 'Todos') {
          url += `/category/${tag}`;
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
  }, [tag]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const displayedGames = expanded ? games : games.slice(0, 6); // Mostrar solo los primeros 6 juegos cuando no está expandido

  return (
    <>
      <Category onTagChange={handleTagChange} selectedTag={tag} />
      <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
        Juegos
      </h2>
      <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
        {displayedGames.map((game) => (
          <GamesCard
            key={game.id}
            title={game.name}
            description={game.description}
            imgUrl={game.images}
            gameUrl={game.company?.siteUrl}
            previewUrl={game.previewUrl}
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
  );
};

export default GamesSection;