import styled from "styled-components";
import { useState } from "react";
import { createEvent } from "./api/fetchcreateevent";
import { useNavigate } from "react-router-dom";

export const CreateEventPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        day: "",
        month: "",
        initial_time: "",
        final_time: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { response } = await createEvent(formData);
            if (response.ok) {
                setResponseMessage("Evento criado com sucesso!");
                navigate("/user/dashboard/events"); // Redireciona para a lista de eventos
            } else {
                setResponseMessage("Erro ao criar o evento");
            }
        } catch (error: any) {
            console.error("Erro ao criar evento:", error.message);
        }
    };

    return (
        <CreateEventStyles>
            <h1>Criar Evento</h1>
            <form onSubmit={handleSubmit} className="event-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome do Evento"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Local"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="day"
                    placeholder="Dia"
                    value={formData.day}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="month"
                    placeholder="Mês"
                    value={formData.month}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="initial_time"
                    placeholder="Hora Inicial"
                    value={formData.initial_time}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="final_time"
                    placeholder="Hora Final"
                    value={formData.final_time}
                    onChange={handleChange}
                />
                <button type="submit">Criar Evento</button>
            </form>
            <p>{responseMessage}</p>
        </CreateEventStyles>
    );
};

const CreateEventStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .event-form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 10px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
    }
`;
