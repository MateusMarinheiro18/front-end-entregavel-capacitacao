import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "@/context/authcontext";
import { fetchLogin } from "./api/fetchAuth";
import logo from "@/assets/logosf.png";
import fundo from "@/assets/imagem.png";

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
            console.log("Login efetuado com sucesso!");
            navigate("/user/dashboard"); // Redireciona para o dashboard
        } catch (error: any) {
            console.error(error);
            setError("Falha no login. Verifique suas credenciais.");
        }
    };

    return (
        <LoginPageStyles>
            <div className="login-section">
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt="Logo" />
                    <h1>Faça seu login</h1>
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
            </div>
            <div className="image-section" />
        </LoginPageStyles>
    );
};

const LoginPageStyles = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: Poppins, sans-serif;

    .login-section {
        width: 40%; /* 2/5 da tela */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(238, 202, 238, 0.9); /* Fundo com leve transparência */
        padding: 30px;

        form {
            width: 80%;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            gap: 15px;

            img {
                max-width: 15rem;
                align-self: center;
            }

            h1 {
                font-size: 24px;
                font-weight: bold;
                color: #4a004a; /* Contraste */
                text-align: center;
                margin-bottom: 10px;
            }

            .error {
                color: red;
                font-size: 14px;
                text-align: center;
            }

            input {
                padding: 10px;
                border: 1px solid #d8a3d8; /* Bordas suaves */
                border-radius: 5px;
                font-size: 16px;
                background-color: #f6e6f6;
                color: #4a004a;
                outline: none;

                &:focus {
                    border: 1px solid #c88fc8;
                    background-color: #fff;
                }
            }

            button {
                padding: 10px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;

                &:hover {
                    filter: brightness(0.9);
                    transform: scale(1.02);
                }
            }

            button[type="submit"] {
                background-color: #4a004a; /* Tom mais escuro próximo ao #EECAEE */
                color: white;
            }

            button.secondary {
                background-color: transparent;
                color: #4a004a;
                text-decoration: none;

                &:hover {
                    text-decoration: none;
                    color: #730073; /* Tom mais forte */
                }
            }
        }
    }

    .image-section {
        width: 100%; /* 3/5 da tela */
        background-image: url(${fundo}); /* Imagem à direita */
        background-size: cover;
        background-position: center;
    }
`;
