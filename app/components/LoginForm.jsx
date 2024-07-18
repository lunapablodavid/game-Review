"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '../context/UserContext';
import UserPanel from './UserPanel';


const LoginForm = () => {
  const { userData, setUserData } = useUser({});
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.json();
        setIsLoading(false);
        return setError(err.message);
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      setUserData(data);
      window.location.href='/'
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
        <Image
          src='/images/logo-nav.png'
          alt='logo'
          width={160}
          height={160}
          className='w-40 h-40 mb-20 p-4 rounded-full bg-blue-500 animate-spin-slow'
          priority
        />
        <span>
          <h1 className='text-white mb-4 text-2xl sm:text-4xl lg:text-6xl font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-black-500 to-orange-300'>
              Iniciando Sesión...
            </span>
          </h1>
        </span>
      </div>
    );
  }

  if (!Object.keys(userData).length==0) {
    return <UserPanel />;
  }

  return (
    <div className="mx-4 sm:mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 bg-black bg-opacity-30 rounded-lg shadow-md">
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">Iniciar sesión</h2>
      {msgError && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-red-600 font-semibold">{msgError}</p>
            <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-500 font-semibold mb-2">Usuario</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} id="username" name="username" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-500 font-semibold mb-2">Contraseña</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <button type="submit" className="mb-2 sm:mb-0 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-blue-600 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Iniciar sesión</button>
          <button type="button" className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <Link href='/'>Salir</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;