"use client";

import React, { createContext, useState, useEffect } from 'react';

function parseJwt(token) {
  if (!token) {
    return;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return;
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  try {
    return JSON.parse(window.atob(base64));
  } catch (e) {
    console.error('Error decoding token:', e);
    return;
  }
}

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const decodedToken = parseJwt(token);
      setSessionData(decodedToken ? { token, ...decodedToken } : {});
    }
  }, []);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
