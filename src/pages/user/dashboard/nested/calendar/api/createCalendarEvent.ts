import { config } from '../../../../../../config/config';

export async function createCalendarEvent(eventData: object): Promise<Response> {
    const { apiBaseUrl } = config;
    const requestRoute = '/calendar/event'; // Rota no backend

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    };

    const response = await fetch(apiBaseUrl + requestRoute, options);

    if (!response.ok) {
        throw new Error('Erro ao criar evento no calendário');
    }

    return response;
}
