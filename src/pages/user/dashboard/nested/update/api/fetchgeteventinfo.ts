import { config } from "@/config/config";

export async function getEventInfo(id: string) {
    const response = await fetch(`${config.apiBaseUrl}/events/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar informações do evento");
    }

    return { response };
}