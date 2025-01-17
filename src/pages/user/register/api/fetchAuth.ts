import { config } from "@/config/config";

export async function register(data: { name: string; email: string; password: string }) {
    const response = await fetch(`${config.apiBaseUrl}/director/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return { response };
}
