import { config } from "@/config/config";

export async function fetchLogin(data: { email: string; password: string }) {
    const response = await fetch(`${config.apiBaseUrl}/director/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Falha na autenticação. Verifique suas credenciais.");
    }

    const result = await response.json(); // Certifique-se de que o backend retorna um JSON válido com um token
    return result; // O retorno esperado deve ser { token: string }
}
