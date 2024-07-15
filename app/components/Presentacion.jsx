"use client";

import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';

const Presentacion = () => {
    const { userData } = useUser() || {};
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData !== undefined) {
            setIsLoading(false);
        }
    }, [userData]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Image
                    src='/images/logo-nav.png'
                    alt='logo'
                    width={300}
                    height={160}
                    className= 'mb-20 p-4 rounded-full bg-blue-500 animate-spin-slow'
                />
                <span>
                    <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
                        <span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-black-500 to-orange-300'>
                            Espere, por favor...
                        </span>
                    </h1>
                </span>
            </div>
        );
    }

    return (
        <section>
            <div className='grid grid-cols-1 sm:grid-cols-12'>
                {userData?.name ? (
                    <div className='col-span-7 place-self-center text-center sm:text-left'>
                        <span>
                            <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
                                <span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300'>
                                    Player Review
                                </span>
                            </h1>
                        </span>
                        <span className='text-white mb-8 text-4xl sm:text-3xl lg:text-5xl font-extrabold'>
                            <TypeAnimation
                                sequence={[
                                    'Juegos',
                                    1000,
                                    'Reseñas',
                                    1000,
                                    'Trucos',
                                    1000,
                                    'La mejor comunidad!!',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                        <p className='text-[#adb7be] text-base sm:text-lg mb-6 mt-4 lg:text-xl'>
                            ¡Hola {userData.name}! 🌟

                            ¡Bienvenido de nuevo a PlayerReview! 🎮✨ Nos alegra muchísimo verte por aquí. Tu pasión por los videojuegos nos inspira y estamos emocionados de que sigas formando parte de nuestra comunidad.

                            Prepárate para sumergirte en las mejores reseñas, descubrir trucos increíbles y explorar nuevos títulos. Aquí, tu voz cuenta y tus opiniones hacen la diferencia. No olvides compartir tus experiencias y conectar con otros gamers como tú.

                            ¡Que comience la aventura! 🚀

                            ¡Happy gaming! 🎉
                        </p>
                    </div>
                ) : (
                    <div className='col-span-7 place-self-center text-center sm:text-left'>
                        <span>
                            <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
                                <span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300'>
                                    Player Review
                                </span>
                            </h1>
                        </span>
                        <span className='text-white mb-8 text-4xl sm:text-3xl lg:text-5xl font-extrabold'>
                            <TypeAnimation
                                sequence={[
                                    'Juegos',
                                    1000,
                                    'Reseñas',
                                    1000,
                                    'Trucos',
                                    1000,
                                    'La mejor comunidad!!',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                        <p className='text-[#adb7be] text-base sm:text-lg mb-6 mt-4 lg:text-xl'>
                            ¡Bienvenido a PlayerReview! Aquí encontrarás las mejores reseñas de videojuegos,
                            hechas por y para gamers. Explora análisis detallados, descubre nuevos títulos y
                            comparte tus opiniones. ¡Únete a nuestra comunidad y lleva tu experiencia de juego
                            al siguiente nivel!
                        </p>
                        <div>
                            <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-300 border hover:border-pink-700 text-white'>
                                <Link href={'/login'}> Iniciar sesión</Link>
                            </button>
                            <button className='px-6 py-3 w-full sm:w-fit bg-trasnparent rounded-full hover:bg-slate-800 text-white border border-white mt-3'>
                                <Link href={'/register'}> Registrate</Link>
                            </button>
                        </div>
                    </div>
                )}
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
    );
};

export default Presentacion;