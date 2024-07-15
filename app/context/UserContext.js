// UserContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Función para decodificar el token JWT
function parseJwt(token) {
  if (!token) { return null; }

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    throw new Error('Invalid JWT token format');
  }

  const base64Url = tokenParts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
  try {
    return JSON.parse(window.atob(base64));
  } catch (error) {
    throw new Error('Error decoding JWT token');
  }
}

// Creación del contexto de usuario
const UserContext = createContext();

// Proveedor de contexto de usuario
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Verificar que el código se esté ejecutando en el navegador
    if (typeof window !== 'undefined') {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      // Decodificar el token JWT si existe
      const decodedToken = parseJwt(token);
      // Establecer el estado de userData con el token decodificado
      setUserData(decodedToken ? { token, ...decodedToken } : {});
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de usuario
export const useUser = () => useContext(UserContext);

export default UserContext;