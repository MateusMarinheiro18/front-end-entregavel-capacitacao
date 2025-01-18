import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authcontext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // Se não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>; // Retorna o conteúdo protegido
};
