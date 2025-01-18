import { config } from "@/config/config";

interface CreateEventData {
    name: string;
    description: string;
    location: string;
    day: string;
    month: string;
    initial_time: string;
    final_time: string;
}

export async function createEvent(data: CreateEventData) {
    const response = await fetch(`${config.apiBaseUrl}/event`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Dados do evento a serem enviados ao backend
    });

    if (!response.ok) {
        throw new Error("Erro ao criar evento");
    }

    return { response };
}
