import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const emailOk = (v) => /\S+@\S+\.\S+/.test(v);
const pwOk = (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
// ≥8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');

  const submit = async (e)=>{
    e.preventDefault();
    setErr('');

    if (name.trim().length < 2) return setErr('Please enter your full name.');
    if (!emailOk(email)) return setErr('Please enter a valid email address.');
    if (!pwOk(password)) {
      return setErr('Password must be 8+ chars and include upper, lower, number, and symbol.');
    }

    try{
      await register(name, email, password);
      navigate('/projects', { replace: true }); // go to Projects after register
    } catch(e){ setErr(e.message); }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div><div className="label">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Lauren Foster" /></div>
        <div><div className="label">Email</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div>
        <div><div className="label">Password</div><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Strong password" /></div>
        <button className="btn bg-slate-900 text-white w-full">Register</button>
      </form>
      <div className="text-sm mt-3">Already have an account? <Link className="underline" to="/login">Login</Link></div>
    </div>
  );
}