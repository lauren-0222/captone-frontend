import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">Pro-Tasker</Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="opacity-80">Hi, {user.name}</span>
              <button className="btn bg-white text-slate-900" onClick={logout}>Logout</button>
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