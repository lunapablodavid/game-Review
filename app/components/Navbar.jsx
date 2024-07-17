"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navlink from './Navlink';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MenuOverlay } from './MenuOverlay';
import Image from 'next/image';
import { useUser } from '../context/UserContext';

const navlinks = [
    {
        title: 'Inicio',
        path: '#Presentacion'
    },
    {
        title: 'Consolas',
        path: '#consolas'
    },
    {
        title: 'Categorias y Juegos',
        path: '#games-section'
    },
    {
        title: 'Mi Cuenta',
        path: '/login'
    }
];

export const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { userData } = useUser() || {};

    const scrollToSection = (id) => {
        if (id[0] === '#') {
            const element = document.querySelector(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setNavbarOpen(false);
            }
        }
    };

    return (
        <nav className='fixed top-0 right-0 left-0 z-10 bg-[#121212] bg-opacity-95'>
            <div className='flex flex-wrap items-center justify-between mx-auto px-8'>
                <Link href={'/'} className='text-1lg md:text-lg text-white font-semibold mt-3 mb-3'>
                    <Image
                        src='/images/logo-nav.png'
                        alt='logo'
                        width={75}
                        height={40}
                    />
                </Link>
                <div className='mobile-menu block md:hidden'>
                    {!navbarOpen ? (
                        <button onClick={() => setNavbarOpen(true)} className='flex item-center px-3 py-2 border rounded border-slate-200 hover:text-white hover:border-white text-slate-200 '>
                            <Bars3Icon className='h-5 w-5' />
                        </button>
                    ) : (
                        <button onClick={() => setNavbarOpen(false)} className='flex item-center px-3 py-2 border rounded border-slate-200 hover:text-white hover:border-white text-slate-200 '>
                            <XMarkIcon className='h-5 w-5' />
                        </button>
                    )}
                </div>
                <div className='menu hidden md:block md:w-auto' id='navbar'>
                    <ul className='flex p-2 mb-5 md:p-0 md:flex-row md:space-x-8 mt-5'>
                        {userData.name &&
                            navlinks.map((link, index) => (
                                <li key={index} onClick={() => scrollToSection(link.path)}>
                                    <Navlink href={link.path} title={link.title} />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={navlinks} onClickLink={scrollToSection} /> : null}
        </nav>
    );
};

export default Navbar;
