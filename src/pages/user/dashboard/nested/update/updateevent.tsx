import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const EditEventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [eventData, setEventData] = useState<{
        name: string;
        description: string;
        location: string;
        day: string;
        month: string;
        initial_time: string;
        final_time: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            console.error("ID do evento não encontrado.");
            return;
        }

        fetch(`http://localhost:8000/event-get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEventData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar o evento:", err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData!,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/event-edit/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                console.log("Evento atualizado com sucesso!");
                navigate("/user/dashboard");
            } else {
                console.error("Erro ao atualizar o evento.");
            }
        } catch (err) {
            console.error("Erro ao enviar os dados:", err);
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <EditEventPageStyles>
            <div className="form-container">
                <h1>Editar Evento</h1>
                {eventData ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="left-column">
                                <input
                                    name="name"
                                    value={eventData.name}
                                    onChange={handleChange}
                                    placeholder="Nome do Evento"
                                    required
                                />
                                <input
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleChange}
                                    placeholder="Descrição"
                                />
                                <input
                                    name="location"
                                    value={eventData.location}
                                    onChange={handleChange}
                                    placeholder="Local"
                                />
                                <input
                                    name="day"
                                    type="number"
                                    value={eventData.day}
                                    onChange={handleChange}
                                    placeholder="Dia"
                                />
                            </div>
                            <div className="right-column">
                                <input
                                    name="month"
                                    type="number"
                                    value={eventData.month}
                                    onChange={handleChange}
                                    placeholder="Mês"
                                />
                                <input
                                    name="initial_time"
                                    value={eventData.initial_time}
                                    onChange={handleChange}
                                    placeholder="Hora Inicial"
                                />
                                <input
                                    name="final_time"
                                    value={eventData.final_time}
                                    onChange={handleChange}
                                    placeholder="Hora Final"
                                />
                            </div>
                        </div>
                        <button type="submit">Salvar</button>
                    </form>
                ) : (
                    <p>Carregando os dados do evento...</p>
                )}
            </div>
        </EditEventPageStyles>
    );
};

const EditEventPageStyles = styled.div`
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
