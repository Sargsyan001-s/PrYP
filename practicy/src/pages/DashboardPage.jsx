import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h1> o(≧▽≦)o  Привет, {user?.username || 'Друг'}!</h1>
      <p>Вы вошли в личный кабинет.</p>
    </div>
  );
}
