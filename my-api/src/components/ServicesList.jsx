import { useEffect, useState } from 'react';
import { getServices } from '../api/services';

export default function ServicesList() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadServices = async () => {
        try {
            setLoading(true);
            const data = await getServices();
            setServices(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Ошибка при загрузке услуг:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleRefresh = () => {
        loadServices();
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Загрузка услуг...</div>
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

    if (!services.length) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Услуг не найдено</div>
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
                <h2>Услуги ({services.length})</h2>
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
                {services.map(s => (
                    <div key={s.service_id} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '20px', 
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Название:</strong> 
                            <span style={{ marginLeft: '8px', color: "black", fontWeight: 'bold' }}>{s.name}</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Описание:</strong> 
                            <span style={{ marginLeft: '8px', color: "black" }}>{s.description || '—'}</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>Длительность:</strong> 
                            <span style={{ marginLeft: '8px', color: "black" }}>{s.duration_minutes} мин</span>
                        </div>
                        <div>
                            <strong style={{ color: '#495057' }}>Цена:</strong> 
                            <span style={{ marginLeft: '8px', color: "#28a745", fontWeight: 'bold' }}>{s.price} ₽</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}