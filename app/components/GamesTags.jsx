import React from 'react';

const GamesTags = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected 
        ? 'text-white bg-purple-500'
        : 'text-[#adb7be] border-slate-600 hover:border-white';
    
    return (
        <button className={`${buttonStyles} rounded-full border-2 px-6 py-3 sm:text-sm cursor-pointer`}
            onClick={() => onClick(name)}>
            {name}
        </button>
    );
}

export default GamesTags;