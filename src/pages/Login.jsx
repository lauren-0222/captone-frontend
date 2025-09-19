import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const emailOk = (v) => /\S+@\S+\.\S+/.test(v);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const presetMsg = location.state?.msg || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(presetMsg);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');

    if (!emailOk(email)) return setErr('Please enter a valid email.');
    if (!password) return setErr('Password is required.');

    try {
      await login(email, password);
      navigate('/projects', { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <div className="label">Email</div>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <div className="label">Password</div>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn bg-slate-900 text-white w-full">Sign in</button>
      </form>
      <div className="text-sm mt-3">No account? <Link className="underline" to="/register">Register</Link></div>
    </div>
  );
}