import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const EditEventPage = () => {
    const { id } = useParams<{ id: string }>(); // Captura o ID da URL
    const [eventData, setEventData] = useState<{
        name: string;
        description: string;
        location: string;
        day: string;
        month: string;
        initial_time: string;
        final_time: string;
    } | null>(null); // Estado do evento
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            console.error("ID do evento não encontrado.");
            return;
        }

        fetch(`http://localhost:8000/events/${id}`) // Substitua pela URL correta da API
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
            const response = await fetch(`http://localhost:8000/api/events/${id}`, {
                method: "PUT", // Método para atualizar o evento
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                console.log("Evento atualizado com sucesso!");
                navigate("/user/dashboard/home"); // Redireciona para a lista de eventos
            } else {
                console.error("Erro ao atualizar o evento.");
            }
        } catch (err) {
            console.error("Erro ao enviar os dados:", err);
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Editar Evento</h1>
            {eventData ? (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Salvar</button>
                </form>
            ) : (
                <p>Carregando os dados do evento...</p>
            )}
        </div>
    );
};
