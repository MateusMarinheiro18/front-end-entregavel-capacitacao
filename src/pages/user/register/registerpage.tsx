import { useState } from "react";
import styled from "styled-components";
import { register } from "./api/fetchAuth";
import { useNavigate } from "react-router-dom";

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
            <h1>Criar Conta</h1>
            <form onSubmit={handleSubmit}>
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
        </RegisterPageStyles>
    );
};

const RegisterPageStyles = styled.div`
    /* Similar styling como LoginPage */
    /* Reutilize o estilo da LoginPage para consistência */
`;
