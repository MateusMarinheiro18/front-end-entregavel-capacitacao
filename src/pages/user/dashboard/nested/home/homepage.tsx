import { useState, useEffect } from "react";
import styled from "styled-components";
import { listEvents } from "./api/fetchListEvents";
import { deleteEvent } from "./api/fetchDeleteEvent";
import { useNavigate } from "react-router-dom";
import { EventCard } from "../../components/EventCard";

export const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]); // Eventos filtrados
    const [searchQuery, setSearchQuery] = useState(""); // Estado da barra de pesquisa
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const { response } = await listEvents();
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
                setFilteredEvents(data); // Inicialmente, todos os eventos são exibidos
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

    // Função para lidar com a pesquisa
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredEvents(events); // Mostra todos os eventos se a barra de pesquisa estiver vazia
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filtered = events.filter((event: any) =>
                event.name.toLowerCase().includes(lowercasedQuery) // Filtra pelo título do evento
            );
            setFilteredEvents(filtered);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <HomeStyles>
            <h1>Visão geral dos seus eventos</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar pelo título do evento..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="event-list">
                {filteredEvents.map((event: any, index) => (
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
    display: flex;
    flex-direction: column;
    align-items: center;
    

    h1 {
        margin-bottom: 20px;
        color: #4a004a;
    }

    .search-container {
        margin-bottom: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
            width: 100%;
            max-width: 600px;
            padding: 10px;
            border: 1px solid #d8a3d8;
            border-radius: 5px;
            font-size: 16px;
            color: #4a004a;
            background-color: #f6e6f6;
            outline: none;

            &:focus {
                border: 1px solid #c88fc8;
                background-color: white;
            }
        }
    }

    .event-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Três cartões por linha */
        gap: 20px; /* Espaçamento entre os cartões */

        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr); /* Dois cartões por linha em telas menores */
        }

        @media (max-width: 480px) {
            grid-template-columns: 1fr; /* Um cartão por linha em telas muito pequenas */
        }
    }
`;
