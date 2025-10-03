import { useEffect, useState } from 'react';
import { getPayments } from '../api/payments';

export default function PaymentsList() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPayments = async () => {
        try {
            setLoading(true);
            const data = await getPayments();
            setPayments(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Ошибка при загрузке платежей:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPayments();
    }, []);

    const handleRefresh = () => {
        loadPayments();
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Загрузка платежей...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ color: 'red', padding: '20px' }}>
                <div>Ошибка: {error}</div>
                <button 
                    onClick={handleRefresh}
                    style={{ 
                        marginTop: '10px', 
                        padding: '8px 16px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Попробовать снова
                </button>
            </div>
        );
    }

    if (!payments.length) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Платежей не найдено</div>
                <button 
                    onClick={handleRefresh}
                    style={{ 
                        marginTop: '10px', 
                        padding: '8px 16px', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Обновить
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Платежи ({payments.length})</h2>
                <button 
                    onClick={handleRefresh}
                    style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Обновить
                </button>
            </div>
            
            <div style={{ display: 'grid', gap: '15px' }}>
                {payments.map(p => (
                    <div key={p.payment_id} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '20px', 
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Пользователь ID:</strong> 
                            <span style={{ marginLeft: '8px', color: '#007bff' }}>{p.user_id}</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Запись ID:</strong> 
                            <span style={{ marginLeft: '8px', color: '#6c757d' }}>{p.appointment_id || '—'}</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Сумма:</strong> 
                            <span style={{ marginLeft: '8px', color: "#28a745", fontWeight: 'bold' }}>{p.amount} ₽</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Метод:</strong> 
                            <span style={{ marginLeft: '8px', color: "black" }}>{p.payment_method}</span>
                        </div>
                        <div>
                            <strong style={{ color: '#495057' }}>Статус:</strong> 
                            <span 
                                style={{ 
                                    marginLeft: '8px', 
                                    padding: '4px 8px', 
                                    borderRadius: '4px', 
                                    backgroundColor: p.status === 'completed' ? '#d4edda' : p.status === 'failed' ? '#f8d7da' : '#fff3cd',
                                    color: p.status === 'completed' ? '#155724' : p.status === 'failed' ? '#721c24' : '#856404'
                                }}
                            >
                                {p.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}