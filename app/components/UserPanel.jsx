// UserPanel.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import Image from 'next/image';

const UserPanel = () => {
  const { userData } = useUser();

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50">
      <p className="text-white text-lg">Cargando...</p>
    </div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 ">
    <div className="mx-4 sm:mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Panel de Usuario</h2>
      <div className="mb-6 text-center">
        <Image
          src={userData.profilePicture || '/images/default-profile.png'}
          alt="Foto de Perfil"
          width={100}
          height={100}
          className="mx-auto rounded-full"
        />
        <p className="mt-4 text-xl"><strong>Nombre de usuario:</strong> {userData.name}</p>
        <p className="mt-2"><strong>Email:</strong> {userData.email}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Mis Comentarios:</h3>
        {userData.comments && userData.comments.length > 0 ? (
          <ul className="space-y-4">
            {userData.comments.map(comment => (
              <li key={comment.id} className="bg-gray-700 p-3 rounded-md">{comment.comment}</li>
            ))}
          </ul>
        ) : (
          <p>No has realizado ningún comentario todavía.</p>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Cambiar Foto de Perfil
        </button>
        <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Cambiar Contraseña
        </button>
        <button className="bg-red-600 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Eliminar Cuenta
        </button>
        <button className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-700 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
          Cerrar Sesión
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserPanel;
