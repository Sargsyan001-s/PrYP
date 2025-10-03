const API_URL = 'http://localhost:3001/api/appointments';

export async function getAppointments() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}

export async function getAppointmentById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}