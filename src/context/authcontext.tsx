import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Se o token existe, está autenticado
    }, []);

    const login = (token: string) => {
        localStorage.setItem("authToken", token); // Salva o token
        setIsAuthenticated(true); // Atualiza o estado para autenticado
    };

    const logout = () => {
        localStorage.removeItem("authToken"); // Remove o token
        setIsAuthenticated(false); // Atualiza o estado para não autenticado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
