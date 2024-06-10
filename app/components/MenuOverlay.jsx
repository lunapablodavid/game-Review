import React from 'react';
import Navlink from './Navlink';

export const MenuOverlay = ({ links, onClickLink }) => {
    return (
        <ul className='flex flex-col py-4 items-center justify-center'>
            {links.map((link, index) => (
                <li key={index} onClick={() => onClickLink(link.path)}>
                    <Navlink href={link.path} title={link.title} />
                </li>
            ))}
        </ul>
    )
}