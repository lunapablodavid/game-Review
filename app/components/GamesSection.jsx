"use client";
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import GamesInfo from './GamesInfo';
import { useUser } from '../context/UserContext';
import Category from './Category';

export const GamesSection = () => {
    const [tag, setTag] = useState('Todos');
    const [expanded, setExpanded] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const { userData } = useUser() || {};
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedGames, setDisplayedGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:3000/video_games/';
                if (tag !== 'Todos') {
                    url += `category/${tag}`;
                }
                const headers = {};
                if (userData?.token) {
                    headers['Authorization'] = `Bearer ${userData.token}`;
                }
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error('Error al obtener los juegos');
                }
                const data = await response.json();
                setGames(data);
                setDisplayedGames(expanded ? data : data.slice(0, 6));
            } catch (error) {
                console.error('Error al obtener los juegos:', error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tag, expanded, userData?.token]);

    const handleTagChange = (newTag) => {
        setTag(newTag);
        setSelectedGame(null);
    };

    const handleCloseModal = () => {
        setSelectedGame(null);
    };

    const handleToggleExpand = () => {
        setExpanded((prevExpanded) => !prevExpanded);
        setDisplayedGames((prevGames) => (!expanded ? prevGames.slice(0, 6) : games));
    };

    return (
        <>
            {userData.name && (
                <>
                    <Category onTagChange={handleTagChange} selectedTag={tag} />
                    <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                        Juegos
                    </h2>

                    {loading ? (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                        </div>
                    ) : games.length === 0 ? (
                        <div className='text-center text-white'>No hay juegos disponibles en esta categoría.</div>
                    ) : (
                        <>
                            <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                                {displayedGames.map((game) => (
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
                        </>
                    )}

                    {selectedGame && (
                        <GamesInfo
                            id={selectedGame.id}
                            title={selectedGame.name}
                            description={selectedGame.description}
                            imgUrl={selectedGame.images}
                            onClose={handleCloseModal}
                        />
                    )}

                    {userData?.name && games.length > 6 && !loading && (
                        <div className='flex justify-center mt-10'>
                            <button
                                className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white'
                                onClick={handleToggleExpand}
                            >
                                {expanded ? 'Ver menos' : 'Ver más'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default GamesSection;
