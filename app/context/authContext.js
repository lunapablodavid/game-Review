"use client"

import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggin, setLoggin] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggin, setLoggin}}>{children}</AuthContext.Provider>
    )
}
