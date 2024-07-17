"use client"
import Link from 'next/link';
import { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgError, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (password !== confirmPassword) {
        return setError('Las contraseñas no coinciden.');
      }

      const res = await fetch("http://localhost:3000/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!res.ok) {
        const err = await res.json()
       return setError(err.message);
      }


      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <div className="mt-20 w-1/3 p-4 bg-black bg-opacity-30 rounded-lg shadow-md h-1/2">
      <h2 className="text-2xl text-gray-500 font-semibold mb-1">Registro</h2>
      {msgError && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-red-600 font-semibold">{msgError}</p>
            <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between" style={{height: '48vh'}}>
        <div className="mb-1">
          <label htmlFor="username" className="block text-gray-500 font-semibold mb-1">Usuario</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} id="username" name="username" className="border text-black border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="block text-gray-500 font-semibold mb-1">Correo electrónico</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="border text-black border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="block text-gray-500 font-semibold mb-1">Contraseña</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="border text-black border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block text-gray-500 font-semibold mb-1">Confirmar contraseña</label>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" name="confirmPassword" className="border text-black border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex md:flex-row flex-col justify-between">
          <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-blue-600">Registrarse</button>
          <button type="button" className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"><Link href={'/'}>Salir</Link></button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
