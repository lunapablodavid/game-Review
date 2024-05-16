"use client"

import { useState } from 'react';

const LoginForm = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("http://localhost:3000/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) return alert('Usuario y/o contraseña incorrecto.')

    const data = await res.json()

  //Guardamos el token para su posterior uso en otras request!
    const userData = {
      username,
      isLogged:true,
      token: data.access_token
    }
    const objJson= JSON.stringify(userData)
    localStorage.setItem('data', objJson)

    window.location.href = '/';
  }

  return (
    <div className="mt-20 w-1/3 p-4 bg-black bg-opacity-30 rounded-lg shadow-md">
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-500 font-semibold mb-2">Usuario</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} id="username" name="username" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-500 font-semibold mb-2">Contraseña</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-blue-600">Iniciar sesión</button>
          <button type="button" className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Salir</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
