import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

function App() {
  
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
    
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

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
         
          <Route path="/register" element={<RegisterPage />} />
           
        </Routes>
      </main>
    </div>
  );
}

export default App;