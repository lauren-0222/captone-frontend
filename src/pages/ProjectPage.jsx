import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ProjectPage(){
  const { id } = useParams();
  const nav = useNavigate();
  const [proj, setProj] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [err,setErr]=useState('');

  const load = async ()=>{
    try{
      setProj(await api.projects.get(id));
      setTasks(await api.tasks.list(id));
    } catch(e){ setErr(e.message); }
  };
  useEffect(()=>{ load(); },[id]);

  const createTask = async (e)=>{
    e.preventDefault();
    try{
      await api.tasks.create(id, { title, description });
      setTitle(''); setDescription('');
      load();
    } catch(e){ setErr(e.message); }
  };
  const deleteProject = async ()=>{
    try{
      await api.projects.remove(id);
      nav('/');
    } catch(e){ setErr(e.message); }
  };
  const updateStatus = async (taskId, status)=>{
    try{
      await api.tasks.update(id, taskId, { status });
      load();
    } catch(e){ setErr(e.message); }
  };

  if (!proj) return (
    <div className="max-w-5xl mx-auto p-4">
      {err ? <div className="text-red-600">{err}</div> : <div>Loading…</div>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{proj.name}</h1>
        <button className="btn bg-red-600 text-white" onClick={deleteProject}>Delete Project</button>
      </div>
      <p className="text-gray-600 mb-6">{proj.description}</p>

      {err && <div className="text-red-600 mb-3">{err}</div>}

      <form onSubmit={createTask} className="card mb-6 space-y-3">
        <div><div className="label">Task title</div><input className="input" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><div className="label">Description</div><textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} /></div>
        <button className="btn bg-slate-900 text-white">Add Task</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map(t=>(
          <div key={t._id} className="card">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-gray-600 mb-3">{t.description}</div>
            <div className="flex gap-2">
              {['To Do','In Progress','Done'].map(s=>(
                <button key={s}
                  className={`btn ${t.status===s?'bg-emerald-600 text-white':'bg-slate-100'}`}
                  onClick={()=>updateStatus(t._id, s)}>{s}</button>
              ))}
              <button className="btn bg-red-600 text-white ml-auto" onClick={()=>api.tasks.remove(id, t._id).then(load)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}