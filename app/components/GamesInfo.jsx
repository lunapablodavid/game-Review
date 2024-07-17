"use client";
import React from 'react';
import Comments from './Comments';
import { XMarkIcon, XmarkIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';

const GamesInfo = ({ id, title, description, imgUrl, onClose }) => {
  return (
    <div className="fixed top-12 left-0 w-full h-full rounded-xl flex flex-row justify-center items-center bg-black bg-opacity-75">
      <div className="bg-black rounded-lg p-6 max-w-3xl w-full h-3/4 overflow-auto relative">
        <div className="flex justify-between items-center mb-4 mt-6">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          <button onClick={onClose}><XMarkIcon className='h-7 w-7' /></button>
        </div>
        <div className='flex flex-col items-center mt-6 mb-6'><Image src={imgUrl} alt={title} className=" flex items-center rounded-t-xl h-52 md:h-72 mb-4" width={800} height={400} />
        <p className='mt-6 mb-6'>{description}</p></div>
        <Comments gameId={id}/>
      </div>
    </div>
  );
};

export default GamesInfo;