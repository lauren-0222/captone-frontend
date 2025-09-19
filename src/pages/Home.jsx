import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStarted = () => {
    if (user) navigate('/projects');
    else navigate('/login', { state: { msg: 'Log in to start managing your projects.' } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Welcome to Pro-Tasker</h1>
        <p className="text-gray-700 mb-4">
          Organize projects, track tasks by status (To Do, In Progress, Done), and view live dashboards and project details.
        </p>
        <button className="btn bg-emerald-600 text-white" onClick={getStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}