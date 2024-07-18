import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Image from 'next/image';
import Link from 'next/link';

const UserPanel = () => {
  const { userData } = useUser();
  const [comments, setComments] = useState([]);
  const [changePass, setChangePass] = useState(false);
  const [oldPassword, setOldPass] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comments/users/${userData.id}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${userData.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
        setComments([]);
      }
    };

    fetchComments();
  }, [userData.token]);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const eliminarCuenta = async () => {
    const password = prompt('Introduce la contraseña');
    try {
      const res = await fetch('http://localhost:3000/auth', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
        body: JSON.stringify({ username: userData.name, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
      } else {
        window.location.href = '/';
        localStorage.removeItem('token');
      }
    } catch (error) {
      alert(error);
    }
  };

  const cambiarContraseña = async () => {
    setChangePass(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({ username: userData.name, oldPassword, newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err.message);
      }
      alert('Contraseña cambiada con éxito');
      setChangePass(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
      {changePass && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-md shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-gray-500 font-semibold mb-2">Contraseña Antigua</label>
                <input type="password" onChange={(e) => setOldPass(e.target.value)} id="oldPassword" name="oldPassword" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-gray-500 font-semibold mb-2">Contraseña Nueva</label>
                <input type="password" onChange={(e) => setNewPassword(e.target.value)} id="newPassword" name="newPassword" className="border text-black border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <button type="submit" className="mb-2 sm:mb-0 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-blue-600 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Cambiar Contraseña</button>
                <button type="button" onClick={() => setChangePass(false)} className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="relative mx-4 sm:mx-auto sm:w-2/3 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-white">
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white focus:outline-none"
          onClick={() => window.location.href = '/'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Panel de Usuario</h2>
        <div className="mb-6 text-center">
          <Image
            src={userData.profilePicture || '/images/sin-foto-perfil.jpg'}
            alt="Foto de Perfil"
            width={100}
            height={100}
            className="mx-auto rounded-full object-cover w-24 h-24"
          />
          <p className="mt-4 text-xl"><strong>Nombre de usuario:</strong> {userData.name}</p>
          <p className="mt-2"><strong>Email:</strong> {userData.email}</p>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Acciones</h3>
          <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
            Cambiar Foto de Perfil
          </button>
          <button onClick={cambiarContraseña} className="bg-green-600 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
            Cambiar Contraseña
          </button>
          <button onClick={eliminarCuenta} className="bg-red-600 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
            Eliminar Cuenta
          </button>
          <button onClick={cerrarSesion} className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
            Cerrar Sesión
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Mis Comentarios:</h3>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map(comment => (
                <li key={comment.id} className="bg-gray-700 p-3 rounded-md">{comment.comment}</li>
              ))}
            </ul>
          ) : (
            <p>No has realizado ningún comentario todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
