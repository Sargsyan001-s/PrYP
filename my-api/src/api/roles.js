const API_URL = 'http://localhost:3001/api/roles';

export async function getRoles() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}
