import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard(){
  const [projects, setProjects] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [err,setErr]=useState('');

  const load = async ()=>{
    try { setProjects(await api.projects.list()); }
    catch(e){ setErr(e.message); }
  };
  useEffect(()=>{ load(); },[]);

  const create = async (e)=>{
    e.preventDefault();
    try{
      await api.projects.create({ name, description });
      setName(''); setDescription('');
      load();
    } catch(e){ setErr(e.message); }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Projects</h1>

      {err && <div className="text-red-600 mb-4">{err}</div>}

      <form onSubmit={create} className="card mb-6 space-y-3">
        <div>
          <div className="label">Name</div>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <div className="label">Description</div>
          <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <button className="btn bg-emerald-600 text-white">Create Project</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map(p=>(
          <Link to={`/projects/${p._id}`} key={p._id} className="card hover:shadow-lg">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}