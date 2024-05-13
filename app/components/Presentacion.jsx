"use client";
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const Presentacion = () => {
    return (
        <section >
            <div className='grid grid-cols-1 sm:grid-cols-12'>
                <div className='col-span-7 place-self-center text-center sm:text-left'>
                    <span>
                        <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300'>
                                Player Review
                            </span>
                        </h1>
                    </span>
                    <span className='text-white mb-4 text-2xl sm:text-5xl lg:text-6xl font-extrabold'>
                        <TypeAnimation
                            sequence={[
                                'Juegos',
                                1000,
                                'Reseñas',
                                1000,
                                'Trucos',
                                1000,
                                'La mejor comunidad gamer!!',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                    <p className='text-[#adb7be] text-base sm:text-lg mb-6 lg:text-xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint, neque, nam ipsum
                        itaque ea ducimus corrupti debitis illum quasi quo, repellat rerum cumque deserunt
                        facere beatae accusantium aliquid eos?
                    </p>
                    <div>
                        
                        <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white'>
                        <Link href={'/login'}> Iniciar sesión</Link>
                        </button>
                        
                        <button className='px-6 py-3 w-full sm:w-fit bg-trasnparent rounded-full hover:bg-slate-800 text-white border border-white mt-3'>
                            Registrate
                        </button>
                    </div>
                </div>
                <div className='col-span-5 place-self-center mt-4 lg:mt-0'>
                    <div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'>
                        <Image
                            src='/images/games-logo.png'
                            alt='logo'
                            className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                            width={290}
                            height={290}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Presentacion