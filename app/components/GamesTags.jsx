"use client";
import React from 'react';

const GamesTags = ({ name, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(name);
    };

    return (
        <button
            className={`py-2 px-4 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-400'} text-white`}
            onClick={handleClick}

        >
            {name}
        </button>
    );
};

export default GamesTags 