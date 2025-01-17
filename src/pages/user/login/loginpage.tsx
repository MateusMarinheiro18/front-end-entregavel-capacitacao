import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "@/context/authcontext";
import { fetchLogin } from "./api/fetchAuth";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const authContext = useAuth(); // Obtém o contexto de autenticação
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Limpa mensagens de erro anteriores
    
        try {
            const { token } = await fetchLogin({ email, password }); // Obtém o token do backend
            if (!token) throw new Error("Token inválido");
    
            authContext.login(token); // Passa o token para o contexto de autenticação
            navigate("/user/dashboard/home"); // Redireciona para o dashboard
        } catch (error: any) {
            console.error(error);
            setError("Falha no login. Verifique suas credenciais.");
        }
    };
    

    return (
        <LoginPageStyles>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
                <button
                    type="button"
                    onClick={() => navigate("/auth/register")}
                    className="secondary"
                >
                    Criar Conta
                </button>
            </form>
        </LoginPageStyles>
    );
};

const LoginPageStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;

    form {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 300px;

        h1 {
            margin-bottom: 10px;
            font-size: 24px;
            text-align: center;
        }

        .error {
            color: red;
            font-size: 14px;
            text-align: center;
        }

        input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        button[type="submit"] {
            background-color: #007bff;
            color: white;
        }

        button.secondary {
            background-color: transparent;
            color: #007bff;
            text-decoration: underline;
        }
    }
`;
