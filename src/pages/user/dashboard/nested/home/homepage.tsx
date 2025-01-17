import styled from "styled-components";
import { useState, useEffect } from "react";
import { listEvents } from "./api/fetchListEvents";
import { deleteEvent } from "./api/fetchDeleteEvent";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [events, setEvents] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const { response } = await listEvents();
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (error: any) {
            console.error("Erro ao buscar eventos:", error.message);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteEvent(id); // Chama o endpoint de exclusão
            setResponseMessage("Evento excluído com sucesso!");
            fetchEvents(); // Atualiza a lista de eventos
        } catch (error: any) {
            console.error("Erro ao deletar evento:", error.message);
            setResponseMessage("Erro ao deletar evento.");
        }
    };

    const handleEdit = (eventId: string) => {
        if (!eventId) {
            console.error("ID do evento está indefinido.");
            return;
        }
        navigate(`/user/dashboard/edit-event/${eventId}`);
    };
    

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventListStyles>
            <h1>Lista de Eventos</h1>
            <ul>
                {events.map((event: any, index) => (
                    <li key={index}>
                        <div>
                            <strong>{event.name}</strong> - {event.description} ({event.location}) - {event.day}/{event.month} - {event.initial_time} - {event.final_time}
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEdit(event._id.toString())}>Editar</button>
                            <button onClick={() => handleDelete(event._id.toString())}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
            <p>{responseMessage}</p>
        </EventListStyles>
    );
    
};

const EventListStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    ul {
        list-style: none;
        padding: 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #f1f1f1;
            margin-bottom: 10px;
            border-radius: 5px;

            .actions {
                display: flex;
                gap: 10px;

                button {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;

                    &:first-child {
                        background-color: #007bff;
                        color: white;
                    }

                    &:last-child {
                        background-color: #ff4d4d;
                        color: white;
                    }
                }
            }
        }
    }
`;
