// UserPanel.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Image from 'next/image';

const UserPanel = () => {
  const { userData } = useUser();
  const [comments, setComments] = useState([])

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
            console.error("Error al cargar los comentarios:", error);
            setComments([]);
        }
    };

    fetchComments();
}, [userData.token]);

const cerrarSesion = () => {
  localStorage.removeItem("token")
  window.location.href='/'
}
const eliminarCuenta = () => {
  
}

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50">
      <p className="text-white text-lg">Cargando...</p>
    </div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 ">
    <div className="mx-4 sm:mx-auto sm:w-2/3 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-white">
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
        <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Cambiar Contraseña
        </button>
        <button onClick={()=> eliminarCuenta()} className="bg-red-600 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Eliminar Cuenta
        </button>
        <button onClick={()=> cerrarSesion()} className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
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
