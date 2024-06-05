"use client";
import React, { useState, useEffect } from 'react';
import GamesCard from './GamesCard';
import { GamesTags } from './GamesTags';
import GamesInfo from './GamesInfo';
import { useUser } from '../context/userContext';

const gamesData = [
    {
        id: 1,
        title: 'BioShock 1',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/bioshock1.png',
        tag: ['Todos', 'FPS'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 2,
        title: 'League of legends',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/lol.png',
        tag: ['Todos', 'MMO', 'Online'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 3,
        title: 'GTA V',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/gtav.png',
        tag: ['Todos', 'Autos', 'Accion'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 4,
        title: 'FallOut 76',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/fallout76.png',
        tag: ['Todos', 'RPG', 'Online'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 5,
        title: 'Doom: Eternal',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/doom_eternal.png',
        tag: ['Todos', 'FPS'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 6,
        title: 'Dead Cells',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/dead_cells.png',
        tag: ['Todos', 'Plataforma', 'Aventura'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 7,
        title: 'The last of us 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/tlou2.png',
        tag: ['Todos', 'Accion'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 8,
        title: 'Call of Duty: Modern Warfare 3 Remake',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/cod3rm.png',
        tag: ['Todos', 'FPS', 'Online'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 9,
        title: 'Dead Island 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/di2.png',
        tag: ['Todos', 'FPS', 'Survival'],
        gameUrl: '/',
        previewUrl: '/',
    },
    ,
    {
        id: 10,
        title: 'GTA V',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/gtav.png',
        tag: ['Todos', 'Autos', 'Accion'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 11,
        title: 'FallOut 76',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/fallout76.png',
        tag: ['Todos', 'RPG', 'Online'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 12,
        title: 'Doom: Eternal',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/doom_eternal.png',
        tag: ['Todos', 'FPS'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 13,
        title: 'Dead Cells',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/dead_cells.png',
        tag: ['Todos', 'Plataforma', 'Aventura'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 14,
        title: 'The last of us 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/tlou2.png',
        tag: ['Todos', 'Accion'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 15,
        title: 'Call of Duty: Modern Warfare 3 Remake',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/cod3rm.png',
        tag: ['Todos', 'FPS', 'Online'],
        gameUrl: '/',
        previewUrl: '/',
    },
    {
        id: 16,
        title: 'Dead Island 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore totam perferendis nemo at? Quae, ullam! Asperiores ut amet ducimus obcaecati mollitia, et nobis, consequatur aut autem facere numquam sit cupiditate!',
        image: '/images/juegos/di2.png',
        tag: ['Todos', 'FPS', 'Survival'],
        gameUrl: '/',
        previewUrl: '/',
    },

];

export const GamesSection = () => {
    const [tag, setTag] = useState('Todos');
    const [expanded, setExpanded] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const {userData} = useUser();

    const handdleTagChange = (newTag) => {
        setTag(newTag);
    };

    const handleGameCardClick = (game) => {
        setSelectedGame(game);
      };
    
      const handleCloseModal = () => {
        setSelectedGame(null);
      };

    const filteredGames = gamesData.filter((game) =>
        game.tag.includes(tag)
    );
    const displayedGames = expanded ? filteredGames : filteredGames.slice(0, 9);

    return (
        <>
            {userData.name &&
                <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                    Juegos
                </h2>}
            <div className='text-white justify-center items-center grid md:grid-cols-5 gap-3 md:gap-4 p-4 mb-8'>
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Todos'
                        isSelected={tag === 'Todos'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Accion'
                        isSelected={tag === 'Accion'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Autos'
                        isSelected={tag === 'Autos'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Aventura'
                        isSelected={tag === 'Aventura'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='FPS'
                        isSelected={tag === 'FPS'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='MMO'
                        isSelected={tag === 'MMO'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Online'
                        isSelected={tag === 'Online'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='Survival'
                        isSelected={tag === 'Survival'}
                    />}
                {userData.name &&
                    <GamesTags
                        onClick={handdleTagChange}
                        name='RPG'
                        isSelected={tag === 'RPG'}
                    />}


            </div>
            {userData.name &&
                <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                    {displayedGames.map((game) => (
                        <GamesCard
                            onEyeClick={() => handleGameCardClick(game)}
                            key={game.id}
                            title={game.title}
                            description={game.description}
                            imgUrl={game.image}
                            gameUrl={game.gameUrl}
                            previewUrl={game.previewUrl}
                            />
                    ))}
                </div>}
                
                {userData.name && selectedGame && (
        <div>
        <GamesInfo
          id={selectedGame.id}
          title={selectedGame.title}
          description={selectedGame.description}
          imgUrl={selectedGame.image}
          onClose={handleCloseModal}
        />
        </div>
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

export default GamesSection;
