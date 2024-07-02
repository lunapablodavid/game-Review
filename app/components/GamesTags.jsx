"use client";
import React from 'react';

const GamesTags = ({ name, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(name);
    };

    return (
        <button className={`rounded-full border-2 px-6 py-3 sm:text-sm cursor-pointer ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black'}`}
        onClick={handleClick}
        >
            {name}
        </button>
    );
};

export default GamesTags;