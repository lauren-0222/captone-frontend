import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const STATUSES = ['To Do', 'In Progress', 'Done'];

export default function Dashboard(){
  const [projects, setProjects] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [newStatus, setNewStatus] = useState('To Do');
  const [err,setErr]=useState('');

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState('To Do');

  const load = async ()=>{
    try { setProjects(await api.projects.list()); }
    catch(e){ setErr(e.message); }
  };
  useEffect(()=>{ load(); },[]);

  const create = async (e)=>{
    e.preventDefault();
    setErr('');
    if (!name.trim()) return setErr('Project name is required.');
    try{
      await api.projects.create({ name: name.trim(), description, status: newStatus });
      setName(''); setDescription(''); setNewStatus('To Do');
      load();
    } catch(e){ setErr(e.message); }
  };

  const startEdit = (p)=>{
    setEditingId(p._id);
    setEditName(p.name);
    setEditDesc(p.description || '');
    setEditStatus(p.status || 'To Do');
  };
  const cancelEdit = ()=>{ setEditingId(null); setEditName(''); setEditDesc(''); setEditStatus('To Do'); };
  const saveEdit = async ()=>{
    if (!editName.trim()) { setErr('Project name is required.'); return; }
    try{
      await api.projects.update(editingId, { name: editName.trim(), description: editDesc, status: editStatus });
      cancelEdit();
      load();
    } catch(e){ setErr(e.message); }
  };

  const changeStatusQuick = async (id, status)=>{
    try{
      await api.projects.update(id, { status });
      load();
    } catch(e){ setErr(e.message); }
  };

  const deleteProject = async (id)=>{
    if (!confirm('Delete this project?')) return;
    await api.projects.remove(id);
    load();
  };

  // group projects by status (fallback to 'To Do' for legacy docs)
  const groups = { 'To Do': [], 'In Progress': [], 'Done': [] };
  for (const p of projects) (groups[p.status || 'To Do'] || groups['To Do']).push(p);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {err && <div className="text-red-600 mb-4">{err}</div>}

      {/* Create project */}
      <form onSubmit={create} className="card mb-6 grid md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <div className="label">Name</div>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="New project name" />
        </div>
        <div className="md:col-span-1">
          <div className="label">Status</div>
          <select className="input" value={newStatus} onChange={e=>setNewStatus(e.target.value)}>
            {STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="md:col-span-3">
          <div className="label">Description</div>
          <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional description" />
        </div>
        <div className="md:col-span-3">
          <button className="btn bg-emerald-600 text-white">Create Project</button>
        </div>
      </form>

      {/* Columns by status */}
      <div className="grid md:grid-cols-3 gap-4">
        {STATUSES.map(status=>(
          <div key={status} className="space-y-3">
            <div className="font-semibold text-sm uppercase tracking-wide text-gray-600">{status}</div>
            {groups[status].length === 0 && <div className="text-sm text-gray-400">No projects</div>}

            {groups[status].map(p=>(
              <div key={p._id} className="card">
                {editingId === p._id ? (
                  <>
                    <div className="label">Name</div>
                    <input className="input mb-2" value={editName} onChange={e=>setEditName(e.target.value)} />

                    <div className="label">Status</div>
                    <select className="input mb-2" value={editStatus} onChange={e=>setEditStatus(e.target.value)}>
                      {STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
                    </select>

                    <div className="label">Description</div>
                    <textarea className="input mb-3" value={editDesc} onChange={e=>setEditDesc(e.target.value)} />

                    <div className="flex gap-2">
                      <button className="btn bg-emerald-600 text-white" onClick={saveEdit}>Save</button>
                      <button className="btn bg-slate-200" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Title/description (clicking the title also opens the project) */}
                    <Link to={`/projects/${p._id}`} className="block hover:opacity-90">
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-600">{p.description}</div>
                    </Link>

                    {/* Project status dropdown */}
                    <div className="mt-3">
                      <div className="label mb-1">Status</div>
                      <select
                        className="input"
                        value={p.status || 'To Do'}
                        onChange={(e)=>changeStatusQuick(p._id, e.target.value)}
                      >
                        {STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Clear action row including a big 'Open Project' CTA */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Link to={`/projects/${p._id}`} className="btn bg-emerald-600 text-white">
                        Open Project (View Tasks)
                      </Link>
                      <button className="btn bg-slate-100" onClick={()=>startEdit(p)}>Edit</button>
                      <button className="btn bg-red-600 text-white" onClick={()=>deleteProject(p._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}