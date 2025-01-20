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
        <CreateEventPageStyles>
            <div className="form-container">
                <h1>Criar Evento</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="left-column">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome do Evento"
                                value={formData.name}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </div>
                        <div className="right-column">
                            <input
                                type="number"
                                name="month"
                                placeholder="Mês"
                                value={formData.month}
                                onChange={handleChange}
                                required
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
                        </div>
                    </div>
                    <button type="submit">Criar Evento</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </CreateEventPageStyles>
    );
};

const CreateEventPageStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f6e4f6;
    font-family: "Poppins", sans-serif;

    .form-container {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        width: 80%;
        margin-bottom: 10rem;

        h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #4a004a;
            text-align: center;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .form-grid {
                display: flex;
                justify-content: space-between;
                gap: 20px;

                .left-column,
                .right-column {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
            }

            input {
                padding: 10px;
                border: 1px solid #d8a3d8;
                border-radius: 5px;
                font-size: 16px;
                font-family: "Poppins", sans-serif;
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
                background-color: #4a004a;
                color: white;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #730073;
                }
            }
        }

        p {
            color: #555;
            text-align: center;
        }
    }
`;
