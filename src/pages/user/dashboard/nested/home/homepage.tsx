import { useState, useEffect } from "react";
import styled from "styled-components";
import { listEvents } from "./api/fetchListEvents";
import { deleteEvent } from "./api/fetchDeleteEvent";
import { useNavigate } from "react-router-dom";
import { EventCard } from "../../components/EventCard";

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
        console.log(localStorage.getItem("authToken"));
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteEvent(id);
            setResponseMessage("Evento excluído com sucesso!");
            fetchEvents();
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
        <HomeStyles>
            <h1>Lista de Eventos</h1>
            <div className="event-list">
                {events.map((event: any, index) => (
                    <EventCard
                        key={index}
                        event={event}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </HomeStyles>
    );
};

const HomeStyles = styled.div`
    background-color: #F6E4F6;
    padding: 20px;
    height: 100vh;
    font-family: "Poppins", sans-serif;


    h1 {
        margin-bottom: 20px;
        color: #4a004a;
    }

    .event-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Três cartões por linha */
        gap: 20px; /* Espaçamento entre os cartões */
    }
`;
