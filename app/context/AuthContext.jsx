"use client"
import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
});

export const AuthProvider = ({ children }) => {
    const [loggin, setLoggin] = useState(false);

    return (
        <AuthContext.Provider value={{loggin, setLoggin}}>
            {children}
        </AuthContext.Provider>
    )
}

