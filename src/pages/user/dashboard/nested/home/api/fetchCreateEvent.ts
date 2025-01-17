import { config } from '../../../../../../config/config';

export async function createEvent(eventData: any): Promise<{ response: Response }> {
    let { apiBaseUrl } = config;
    let requestRoute = "/event"; // Rota para criar evento

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify(eventData), // Dados do evento no corpo da requisição
    };

    const response = await fetch(apiBaseUrl + requestRoute, options);

    return { response };
}
