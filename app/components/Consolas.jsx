"use client";
import React, { useContext, useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { useUser } from '../context/UserContext';

const tab_data = [{
    title: 'Portatiles',
    id: 'portatiles',
    content: (
        <ul>
            <li>GameBoy Advance</li>
            <li>PSP</li>
            <li>PS-VITA</li>
            <li>Nintendo Switch</li>
        </ul>
    )
},
{
    title: 'Sobremesa',
    id: 'Sobremesa',
    content: (
        <ul>
            <li>PS 3</li>
            <li>PS 4</li>
            <li>PS 5</li>
            <li>Xbox 360</li>
            <li>Xbox One</li>
            <li>Xbox Series s/x</li>
        </ul>)
},
{
    title: 'PC',
    id: 'PC',
    content: (
        <ul>
            <li>Procesadores</li>
            <li>Placas de video</li>
        </ul>)
}
];

export const Consolas = () => {
    const [tab, setTab] = useState("portatiles");
    const [isPending, startTransition] = useTransition();
    const { userData } = useUser() || {};


    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        })
    }

    return (
        <section className='text-white'>
            {userData.name &&

                <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
                    <Image src='/images/consolas.jpg' alt='imagen cosolas' width={500} height={500} />
                    <div>
                        <h2 className='text-4xl text-white font-bold mb-4'>Consolas:</h2>
                        <p className='text-base lg:text-lg'>¡Bienvenidos a nuestra plataforma, el destino definitivo para los amantes de los videojuegos!
                             En nuestro sitio, hemos reunido una impresionante colección de consolas de videojuegos para satisfacer a todos los jugadores,
                              desde los aficionados hasta los más dedicados. Aquí te presentamos un recorrido por todas las consolas de videojuegos que puedes
                               encontrar en nuestro sitio.</p>
                        <div className='flex flex-row mt-8'>
                            <TabButton
                                selectTab={() => handleTabChange("portatiles")}
                                active={tab === "portatiles"}>
                                {""}
                                portatiles{""}
                            </TabButton>
                            <TabButton
                                selectTab={() => handleTabChange("Sobremesa")}
                                active={tab === "Sobremesa"}>
                                {""}
                                Sobremesa{""}
                            </TabButton>
                            <TabButton
                                selectTab={() => handleTabChange("PC")}
                                active={tab === "PC"}>
                                {""}
                                PC{""}
                            </TabButton>
                        </div>
                        <div className='mt-8'> {tab_data.find((t) => t.id === tab).content}</div>
                    </div>
                </div>
            }
        </section>
    )
}
