import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/authcontext"; // Ajuste o caminho se necessário
import { Toaster } from "react-hot-toast";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" />
        </AuthProvider>
    </React.StrictMode>
);
