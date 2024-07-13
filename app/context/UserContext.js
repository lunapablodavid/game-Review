"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Función para decodificar el token JWT
function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
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