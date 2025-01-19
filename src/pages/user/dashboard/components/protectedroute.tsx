import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authcontext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>; // Mostra um carregamento enquanto verifica a autenticação
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};
