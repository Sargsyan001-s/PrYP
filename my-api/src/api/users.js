const API_URL = 'http://localhost:3001/api/users';

export async function getUsers() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}

export async function getUserById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}
