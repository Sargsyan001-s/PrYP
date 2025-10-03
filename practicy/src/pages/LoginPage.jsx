import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password); 
      
    } catch (err) {
      setErrors({ submit: err.message || 'Неверный email или пароль' });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>🔒 Вход в аккаунт</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email || errors.submit) {
                  setErrors(prev => {
                    const { email, submit, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password || errors.submit) {
                  setErrors(prev => {
                    const { password, submit, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>

        <p className="switch-form">
          Нет аккаунта?{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </button>
        </p>

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