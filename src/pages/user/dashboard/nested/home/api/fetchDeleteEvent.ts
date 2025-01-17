import { config } from "@/config/config";

export async function deleteEvent(id: string) {
    const response = await fetch(`${config.apiBaseUrl}/events/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar evento");
    }

    return { response };
}
