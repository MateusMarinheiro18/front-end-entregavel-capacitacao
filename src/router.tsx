import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { userRoutes } from "@/pages/user/routes"; // Certifique-se de que o caminho está correto.

export const router = createBrowserRouter([
    ...userRoutes, // Expande o array de rotas do usuário.
    {
        path: "/",
        element: <App />, // Raiz da aplicação, se necessário.
    },
]);
