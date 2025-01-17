import styled from "styled-components";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { listEvents } from "./api/fetchCalendarEvents";

export const CalendarPage = () => {
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    fetchEvents();
  }, []);

  // Função para destacar os dias com eventos no calendário
  const getDayEvents = (date: Date) => {
    return events.filter(
      (event: any) =>
        new Date().getFullYear() === new Date(event.date).getFullYear() &&
        date.getDate() === new Date(event.date).getDate() &&
        date.getMonth() === new Date(event.date).getMonth()
    );
  };

  return (
    <CalendarPageStyles>
      <h1>Calendar</h1>
      <button onClick={() => toast.success("Evento criado com sucesso!")}>
        Adicionar Evento
      </button>
      <Calendar
        className="calendar"
        modifiers={{
          events: (date) => getDayEvents(date).length > 0,
        }}
        modifiersStyles={{
          events: {
            backgroundColor: "#007bff",
            color: "#fff",
          },
        }}
        onDayClick={(day) => {
          const dayEvents = getDayEvents(day);
          if (dayEvents.length > 0) {
            toast.success(`Eventos: ${dayEvents.map((e) => e.name).join(", ")}`);
          } else {
            toast.error("Nenhum evento neste dia!");
          }
        }}
      />
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
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }

  .calendar {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
  }
`;
