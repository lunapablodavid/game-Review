"use client";
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import { GamesTags } from './GamesTags';
import GamesInfo from './GamesInfo';
import { useUser } from '../context/UserContext';
import Category from './Category';

//     {
//         id: 1,
//         title: 'BioShock 1',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/bioshock1.png',
//         tag: ['Todos', 'FPS'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 2,
//         title: 'League of legends',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/lol.png',
//         tag: ['Todos', 'MMO', 'Online'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 3,
//         title: 'GTA V',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/gtav.png',
//         tag: ['Todos', 'Autos', 'Accion'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 4,
//         title: 'FallOut 76',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/fallout76.png',
//         tag: ['Todos', 'RPG', 'Online'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 5,
//         title: 'Doom: Eternal',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/doom_eternal.png',
//         tag: ['Todos', 'FPS'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 6,
//         title: 'Dead Cells',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/dead_cells.png',
//         tag: ['Todos', 'Plataforma', 'Aventura'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 7,
//         title: 'The last of us 2',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/tlou2.png',
//         tag: ['Todos', 'Accion'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 8,
//         title: 'Call of Duty: Modern Warfare 3 Remake',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/cod3rm.png',
//         tag: ['Todos', 'FPS', 'Online'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 9,
//         title: 'Dead Island 2',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/di2.png',
//         tag: ['Todos', 'FPS', 'Survival'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     ,
//     {
//         id: 10,
//         title: 'GTA V',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/gtav.png',
//         tag: ['Todos', 'Autos', 'Accion'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 11,
//         title: 'FallOut 76',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/fallout76.png',
//         tag: ['Todos', 'RPG', 'Online'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 12,
//         title: 'Doom: Eternal',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/doom_eternal.png',
//         tag: ['Todos', 'FPS'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 13,
//         title: 'Dead Cells',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/dead_cells.png',
//         tag: ['Todos', 'Plataforma', 'Aventura'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 14,
//         title: 'The last of us 2',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/tlou2.png',
//         tag: ['Todos', 'Accion'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 15,
//         title: 'Call of Duty: Modern Warfare 3 Remake',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/cod3rm.png',
//         tag: ['Todos', 'FPS', 'Online'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },
//     {
//         id: 16,
//         title: 'Dead Island 2',
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
//         image: '/images/juegos/di2.png',
//         tag: ['Todos', 'FPS', 'Survival'],
//         gameUrl: '/',
//         previewUrl: '/',
//     },

// ];

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

