"use client";
import React, { useState } from 'react';
import GamesCard from './GamesCard';
import { GamesTags } from './GamesTags';

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
        tag: ['Todos', 'FPS' ],
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
    
];

export const GamesSection = () => {
    const [tag, setTag] = useState('Todos');

    const handdleTagChange = (newTag) => {
        setTag(newTag);
    };

    const fiteredGames = gamesData.filter((game)=>
        game.tag.includes(tag)
    );

    return (
        <>
            <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>
                Juegos
            </h2>
            <div className='text-white justify-center items-center grid md:grid-cols-5 gap-5 md:gap-6 p-4 mb-8'>
                <GamesTags
                    onClick={handdleTagChange}
                    name='Todos'
                    isSelected={tag === 'Todos'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='Accion'
                    isSelected={tag === 'Accion'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='Autos'
                    isSelected={tag === 'Autos'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='Aventura'
                    isSelected={tag === 'Aventura'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='FPS'
                    isSelected={tag === 'FPS'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='MMO'
                    isSelected={tag === 'MMO'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='Online'
                    isSelected={tag === 'Online'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='Survival'
                    isSelected={tag === 'Survival'}
                />
                <GamesTags
                    onClick={handdleTagChange}
                    name='RPG'
                    isSelected={tag === 'RPG'}
                />

                
            </div>
            <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                {fiteredGames.map((game) => (
                    <GamesCard
                        key={game.id}
                        title={game.title}
                        description={game.description}
                        imgUrl={game.image}
                        gameUrl={game.gameUrl}
                        previewUrl={game.previewUrl}
                    />
                ))}
            </div>
        </>
    )
}

export default GamesSection;
