const API_URL = 'http://localhost:3001/api/payments';

export async function getPayments() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}

export async function getPaymentById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}