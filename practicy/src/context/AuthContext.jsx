// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialLoginData = {
  'user@example.com': '1a345a',
  'admin@mpt.mpt': 'admin123'
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth должен использоваться в рамках AuthProvider!!!!!');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginData, setLoginData] = useState(() => {
    const saved = localStorage.getItem('loginData');
    return saved ? JSON.parse(saved) : initialLoginData;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [loginData]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (email) => {
    const username = email.split('@')[0];
    setUser({ email, username });
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const register = (email, password) => {
    setLoginData(prev => ({
      ...prev,
      [email]: password
    }));
    login(email);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users: loginData, // ← ИСПРАВЛЕНО: передаём loginData как users
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};