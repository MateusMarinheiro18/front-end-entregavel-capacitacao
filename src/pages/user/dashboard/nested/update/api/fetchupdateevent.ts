import { config } from "@/config/config";

interface UpdateEventData {
    name: string;
    description: string;
    location: string;
    day: string;
    month: string;
    initial_time: string;
    final_time: string;
}

export async function updateEvent(id: string, data: UpdateEventData) {
    const response = await fetch(`${config.apiBaseUrl}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Dados atualizados do evento
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar evento");
    }

    return { response };
}
