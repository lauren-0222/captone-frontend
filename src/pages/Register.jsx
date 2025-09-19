import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');

  const submit = async (e)=>{
    e.preventDefault();
    try{ await register(name, email, password); } catch(e){ setErr(e.message); }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div><div className="label">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><div className="label">Email</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><div className="label">Password</div><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn bg-slate-900 text-white w-full">Register</button>
      </form>
    </div>
  );
}