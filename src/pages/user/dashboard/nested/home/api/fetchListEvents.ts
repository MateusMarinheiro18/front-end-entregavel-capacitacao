import { config } from '../../../../../../config/config';

export async function listEvents(): Promise<{ response: Response }> {
    let { apiBaseUrl } = config;
    let requestRoute = "/event-list"; // Rota para listar eventos

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        }
    };

    const response = await fetch(apiBaseUrl + requestRoute, options);

    return { response };
}
