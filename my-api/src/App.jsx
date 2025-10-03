import React, { useState } from 'react';
import UsersList from './components/UsersList';
import RolesList from './components/RolesList';
import ServicesList from './components/ServicesList';
import AppointmentsList from './components/AppointmentsList';
import PaymentsList from './components/PaymentsList';

function App() {
    const [activeTab, setActiveTab] = useState('appointments');

    return (
        <div className="app">
            <header className="app-header">
                <h1>Система управления клиникой</h1>
                <nav className="app-nav">
                    <button 
                        className={activeTab === 'users' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => setActiveTab('users')}
                    >
                        Пользователи
                    </button>
                    <button 
                        className={activeTab === 'roles' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => setActiveTab('roles')}
                    >
                        Роли
                    </button>
                    <button 
                        className={activeTab === 'services' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => setActiveTab('services')}
                    >
                        Услуги
                    </button>
                    <button 
                        className={activeTab === 'appointments' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => setActiveTab('appointments')}
                    >
                        Записи
                    </button>
                    <button 
                        className={activeTab === 'payments' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => setActiveTab('payments')}
                    >
                        Платежи
                    </button>
                </nav>
            </header>

            <main className="app-main">
                {activeTab === 'users' && (
                    <section className="app-section">
                        <h2>Пользователи</h2>
                        <UsersList />
                    </section>
                )}

                {activeTab === 'roles' && (
                    <section className="app-section">
                        <h2>Роли</h2>
                        <RolesList />
                    </section>
                )}

                {activeTab === 'services' && (
                    <section className="app-section">
                        <h2>Услуги</h2>
                        <ServicesList />
                    </section>
                )}

                {activeTab === 'appointments' && (
                    <section className="app-section">
                        <h2>Записи</h2>
                        <AppointmentsList />
                    </section>
                )}

                {activeTab === 'payments' && (
                    <section className="app-section">
                        <h2>Платежи</h2>
                        <PaymentsList />
                    </section>
                )}
            </main>

            <footer className="app-footer">
                <p>© Клиника красоты — твой успех начинается здесь!</p>
            </footer>
        </div>
    );
}

export default App;