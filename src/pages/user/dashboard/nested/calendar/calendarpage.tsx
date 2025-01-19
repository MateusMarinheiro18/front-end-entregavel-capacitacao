import styled from "styled-components";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { listEvents, Event as CalendarEvent } from "./api/fetchCalendarEvents";
import { EventCard } from "../../components/EventCard";

export const CalendarPage = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
            <h1>Calendar</h1>
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
                        backgroundColor: "#007bff",
                        color: "#fff",
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
                                    <EventCard event={event} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum evento encontrado para esta data.</p>
                    )}
                </div>
            )}
        </CalendarPageStyles>
    );
};

const CalendarPageStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #4a004a; /* Tom mais escuro da cor principal */
    }

    .calendar {
        margin-top: 20px;
        width: 100%;
        max-width: 600px;
        background-color: white;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        font-family: "Poppins", sans-serif;

        .day {
            color: #4a004a; /* Cor principal */
            background-color: #f9e5f9; /* Tom mais claro da cor principal */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: #d9a8d9; /* Efeito hover mais escuro */
                color: white;
            }
        }

        .day--selected {
            background-color: #4a004a; /* Cor principal para o dia selecionado */
            color: white;
        }

        .day--event {
            position: relative;

            &:after {
                content: "";
                width: 8px;
                height: 8px;
                background-color: #4a004a; /* Indicador de evento */
                border-radius: 50%;
                position: absolute;
                bottom: 4px;
                right: 4px;
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
                color: #d9a8d9;
                transition: all 0.3s ease;

                &:hover {
                    color: #4a004a; /* Cor de hover */
                }
            }
        }

        .weekdays {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
            color: #4a004a;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-top: 10px;
        }
    }

    .event-list {
        margin-top: 20px;
        width: 100%;
        max-width: 600px;
        text-align: center;

        h2 {
            margin-bottom: 10px;
            font-size: 20px;
            color: #4a004a;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            background-color: #f9e5f9;
            color: #4a004a;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.05);
                background-color: #d9a8d9;
                color: white;
            }
        }
    }
`;
