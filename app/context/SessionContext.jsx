"use client"

import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('data'));
    if (userData) {
      setSessionData(userData);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
