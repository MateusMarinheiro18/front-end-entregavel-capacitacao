import { config } from "../../../../../../config/config";

export interface Event {
  _id: string;
  name: string;
  description?: string;
  location: string;
  day: string;
  month: string;
  initial_time: string;
  final_time?: string;
}

export async function listEvents(day?: string, month?: string): Promise<Event[]> {
  const { apiBaseUrl } = config;

  // Monta a URL da requisição com os parâmetros de dia e mês, se fornecidos
  let requestRoute = "/calendar-events";
  if (day && month) {
    requestRoute += `/${day}/${month}`;
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiBaseUrl + requestRoute, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data: Event[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
}
