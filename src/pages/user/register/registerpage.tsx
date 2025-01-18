import { useState } from "react";
import styled from "styled-components";
import { register } from "./api/fetchAuth";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logosf.png";
import fundo from "@/assets/imagem.png";

export const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { response } = await register(formData);
            if (response.ok) {
                navigate("/login");
            } else {
                setErrorMessage("Erro ao criar conta!");
            }
        } catch (error) {
            setErrorMessage("Erro ao registrar.");
        }
    };

    return (
        <RegisterPageStyles>
            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <div className="logo-container">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1>Criar Conta</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Registrar</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </form>
            </div>
            <div className="image-section" />
        </RegisterPageStyles>
    );
};

const RegisterPageStyles = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: Poppins, sans-serif;

    .form-section {
        width: 40%; /* 2/5 da tela */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(238, 202, 238, 0.9); /* Fundo com leve transparência */
        padding: 30px;

        .logo-container {
            align-self: center;
            img {
                max-width: 15rem;
                align-self: center;
            }
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            color: #4a004a; /* Contraste */
            text-align: center;
            margin-bottom: 20px;
        }

        form {
            width: 80%;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            gap: 15px;

            input {
                padding: 10px;
                border: 1px solid #d8a3d8;
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
                background-color: #4a004a;
                color: white;

                &:hover {
                    filter: brightness(0.9);
                    transform: scale(1.02);
                }
            }

            .error {
                color: red;
                font-size: 14px;
                text-align: center;
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
