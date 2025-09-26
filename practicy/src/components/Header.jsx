import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <nav className="main-nav">
        <NavLink to="/" end>Главная</NavLink>
        <NavLink to="/cart">Корзина</NavLink>
      </nav>

      <div className="header-actions">
        <button 
          onClick={toggleTheme} 
          className={`theme-toggle-btn ${isDark ? 'dark' : 'light'}`}
        >
          {isDark ? '☽' : '☀️'} {isDark ? 'Тёмная' : 'Светлая'}
        </button>

        {user ? (
          <button onClick={logout} className="logout-btn">
            Выйти
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className="login-btn">
            Вход
          </button>
        )}
      </div>
    </header>
  );
}
