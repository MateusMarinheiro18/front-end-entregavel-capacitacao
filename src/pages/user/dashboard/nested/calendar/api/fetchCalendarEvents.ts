import { config } from "../../../../../../config/config";

export async function listEvents(): Promise<{ response: Response }> {
  const { apiBaseUrl } = config;
  const requestRoute = "/event"; // Altere para sua rota de eventos

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);
  return { response };
}
