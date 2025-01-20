import styled from "styled-components";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { listEvents, Event as CalendarEvent } from "./api/fetchCalendarEvents";
import { EventCard } from "../../components/EventCard";
import { deleteEvent } from "./api/fetchDeleteEvent";
import { useNavigate } from "react-router-dom";

export const CalendarPage = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const fetchEventsByDate = async (day: string, month: string) => {
        try {
            const data = await listEvents(day, month);
            setFilteredEvents(data);

            if (data.length > 0) {
            } else {
                toast.error("Nenhum evento encontrado para esta data!");
            }
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            toast.error("Erro ao buscar eventos!");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteEvent(id);
            setResponseMessage("Evento excluído com sucesso!");
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

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);

        const dayString = day.getDate().toString().padStart(2, "0");
        const monthString = (day.getMonth() + 1).toString().padStart(2, "0");

        fetchEventsByDate(dayString, monthString);
    };

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const data = await listEvents();
                setEvents(data);
            } catch (error) {
                console.error("Erro ao buscar todos os eventos:", error);
            }
        };

        fetchAllEvents();
    }, []);

    return (
        <CalendarPageStyles>
            <h1>Acompanhe seus eventos com o calendário</h1>
            <div className="content">
                <Calendar
                    className="calendar"
                    modifiers={{
                        events: (date) =>
                            events.some(
                                (event) =>
                                    event.day === date.getDate().toString().padStart(2, "0") &&
                                    event.month === (date.getMonth() + 1).toString().padStart(2, "0")
                            ),
                    }}
                    modifiersStyles={{
                        events: {
                            backgroundColor: "#4A004A",
                            color: "white",
                        },
                    }}
                    onDayClick={handleDayClick}
                />
                {selectedDate && (
                    <div className="event-list">
                        <h2>
                            Eventos em {selectedDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                        </h2>
                        {filteredEvents.length > 0 ? (
                            <ul>
                                {filteredEvents.map((event, index) => (
                                    <li key={index}>
                                        <EventCard 
                                            key={index}
                                            event={event}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                        
                                    </li>
                                ))}
                            </ul>
                        ) : (
                          null 
                        )}
                    </div>
                )}
            </div>
        </CalendarPageStyles>
    );
};

const CalendarPageStyles = styled.div`
    font-family: "Poppins", sans-serif;
    background-color: #F6E4F6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;

    h1 {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #4a004a; /* Tom mais escuro da cor principal */
    }

    .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100%;

        /* Ajusta para flex-direction: column quando a largura for menor que 1200px */
        @media (max-width: 1200px) {
            flex-direction: column;
        }
    }

    .calendar {
        margin-top: 10px; /* Movido mais para cima */
        width: 40%; /* Ajustado para ocupar mais espaço */
        background-color: #D6B5D6;
        padding: 15px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        font-family: "Poppins", sans-serif;

        button {
            border: none;
            background-color: transparent;
            align-items: center;
            border-radius: 5px;

            &:hover {
                transition: all 0.5s ease;
                background-color: #6E326E;
                color: white;
            }
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        div {
            div {
                div {
                    display: flex;
                    flex-direction: row;
                    font-size: 25px; /* Texto maior */
                    font-weight: bold;
                    justify-content: space-between;
                    color: #4A004A; /* Cor do texto */
                }
            }
        }
        
        th {
            font-size: 18px; /* Texto maior */
            font-weight: bold;
            color: #4A004A; /* Cor do texto */
            padding: 10px;
            border-bottom: 2px solid #4A004A; /* Linha inferior */
        }

        td {
            text-align: center;
            vertical-align: middle;
            width: 10rem;
            height: 70px;
            position: relative;
        }

        td button {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 20px; /* Texto maior */
            font-weight: bold;
            color: #4A004A; /* Cor do texto */
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;

            &:hover {
                background-color: #4A004A; /* Cor de fundo no hover */
                color: white; /* Cor do texto no hover */
            }
        }

        td button.selected {
            background-color: #4a004a; /* Cor do botão selecionado */
            color: white;
        }

        td button.event {
            position: relative;

            &:after {
                content: "";
                width: 10px;
                height: 10px;
                background-color: white; /* Indicador de evento */
                border-radius: 50%;
                position: absolute;
                bottom: 6px;
                right: 6px;
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            color: #4a004a;

            .navigation {
                cursor: pointer;
                font-size: 16px;
                color: #FF14D5;
                transition: all 0.3s ease;

                &:hover {
                    color: #4A004A; /* Cor de hover */
                }
            }
        }

        .weekdays {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 16px; /* Aumentado */
            font-weight: bold;
            color: #FF14D5;
        }
    }

    .event-list {
        margin-top: 20px;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        h2 {
            margin-bottom: 10px;
            font-size: 20px;
            color: #4a004a;
            align-self: center;
        }

        ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
        }

        li {
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;

        }
    }
`;
