import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goProjects = () => {
    if (user) {
      navigate('/projects');
    } else {
      // send message to Login screen
      navigate('/login', { state: { msg: 'Please log in to view your Projects.' } });
    }
  };

  const doLogout = () => {
    logout();
    navigate('/login', { replace: true, state: { msg: 'You have been logged out.' } });
  };

  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">Pro-Tasker</Link>

        <div className="flex items-center gap-3">
          {/* Projects tab is always visible; behavior depends on auth */}
          <button className="btn bg-slate-700" onClick={goProjects}>Projects</button>

          {user ? (
            <>
              <span className="hidden sm:inline opacity-80">Hi, {user.name}</span>
              <button className="btn bg-white text-slate-900" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn bg-white text-slate-900" to="/login">Login</Link>
              <Link className="btn bg-slate-700" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}