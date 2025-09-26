import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ツ Вход в аккаунт</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Введите имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>
        <button 
          type="button" 
          className="guest-btn"
          onClick={() => navigate('/')}
        >
          Продолжить как гость
        </button>
      </div>
    </div>
  );
}