import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const STATUSES = ['To Do','In Progress','Done'];

export default function ProjectPage(){
  const { id } = useParams();
  const nav = useNavigate();

  const [proj, setProj] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [err,setErr]=useState('');

  // create task
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');

  // edit project
  const [editProj, setEditProj] = useState(false);
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');

  // edit task (title/desc only; status handled by dropdown)
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDesc, setEditTaskDesc] = useState('');

  const load = async ()=>{
    try{
      const p = await api.projects.get(id);
      setProj(p);
      setProjName(p.name);
      setProjDesc(p.description || '');
      setTasks(await api.tasks.list(id));
    } catch(e){ setErr(e.message); }
  };
  useEffect(()=>{ load(); },[id]);

  // project actions
  const deleteProject = async ()=>{
    if (!confirm('Delete this project?')) return;
    try{
      await api.projects.remove(id);
      nav('/projects');
    } catch(e){ setErr(e.message); }
  };

  const saveProject = async ()=>{
    if (!projName.trim()) { setErr('Project name is required.'); return; }
    try{
      await api.projects.update(id, { name: projName.trim(), description: projDesc });
      setEditProj(false);
      load();
    } catch(e){ setErr(e.message); }
  };

  //  task actions 
  const createTask = async (e)=>{
    e.preventDefault();
    setErr('');
    if (!title.trim()) { setErr('Task title is required.'); return; }
    try{
      await api.tasks.create(id, { title: title.trim(), description });
      setTitle(''); setDescription('');
      load();
    } catch(e){ setErr(e.message); }
  };

  const startTaskEdit = (t)=>{
    setEditingTaskId(t._id);
    setEditTaskTitle(t.title);
    setEditTaskDesc(t.description || '');
  };
  const cancelTaskEdit = ()=>{
    setEditingTaskId(null);
    setEditTaskTitle(''); setEditTaskDesc('');
  };
  const saveTaskEdit = async ()=>{
    if (!editTaskTitle.trim()) { setErr('Task title is required.'); return; }
    try{
      await api.tasks.update(id, editingTaskId, { title: editTaskTitle.trim(), description: editTaskDesc });
      cancelTaskEdit();
      load();
    } catch(e){ setErr(e.message); }
  };

  const changeTaskStatus = async (taskId, status)=>{
    try{
      await api.tasks.update(id, taskId, { status });
      load(); // refresh columns
    } catch(e){ setErr(e.message); }
  };

  const deleteTask = async (taskId)=>{
    if (!confirm('Delete this task?')) return;
    await api.tasks.remove(id, taskId);
    load();
  };

  if (!proj) return (
    <div className="max-w-5xl mx-auto p-4">
      {err ? <div className="text-red-600">{err}</div> : <div>Loading…</div>}
    </div>
  );

  // group tasks into columns
  const groups = { 'To Do': [], 'In Progress': [], 'Done': [] };
  for (const t of tasks) (groups[t.status] || groups['To Do']).push(t);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Project header */}
      <div className="flex items-center justify-between">
        {editProj ? (
          <div className="flex-1 mr-4">
            <div className="label">Project name</div>
            <input className="input mb-2" value={projName} onChange={e=>setProjName(e.target.value)} />
            <div className="label">Description</div>
            <textarea className="input" value={projDesc} onChange={e=>setProjDesc(e.target.value)} />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">{proj.name}</h1>
            <p className="text-gray-600">{proj.description}</p>
          </div>
        )}

        <div className="flex gap-2">
          {editProj ? (
            <>
              <button className="btn bg-emerald-600 text-white" onClick={saveProject}>Save</button>
              <button className="btn bg-slate-200" onClick={()=>setEditProj(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn bg-slate-100" onClick={()=>setEditProj(true)}>Edit Project</button>
              <button className="btn bg-red-600 text-white" onClick={deleteProject}>Delete Project</button>
            </>
          )}
        </div>
      </div>

      {err && <div className="text-red-600 my-4">{err}</div>}

      {/* Create task */}
      <form onSubmit={createTask} className="card my-6 space-y-3">
        <div><div className="label">Task title</div><input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Build login form" /></div>
        <div><div className="label">Description</div><textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional details" /></div>
        <button className="btn bg-slate-900 text-white">Add Task</button>
      </form>

      {/* Columns with status dropdown on each task */}
      <div className="grid md:grid-cols-3 gap-4">
        {STATUSES.map(status=>(
          <div key={status} className="space-y-3">
            <div className="font-semibold text-sm uppercase tracking-wide text-gray-600">{status}</div>
            {groups[status].length === 0 && (
              <div className="text-sm text-gray-400">No tasks</div>
            )}
            {groups[status].map(t=>(
              <div key={t._id} className="card">
                {editingTaskId === t._id ? (
                  <>
                    <div className="label">Title</div>
                    <input className="input mb-2" value={editTaskTitle} onChange={e=>setEditTaskTitle(e.target.value)} />
                    <div className="label">Description</div>
                    <textarea className="input mb-3" value={editTaskDesc} onChange={e=>setEditTaskDesc(e.target.value)} />
                    <div className="flex gap-2">
                      <button className="btn bg-emerald-600 text-white" onClick={saveTaskEdit}>Save</button>
                      <button className="btn bg-slate-200" onClick={cancelTaskEdit}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{t.description}</div>

                    {/* Always-visible status dropdown */}
                    <div className="mb-3">
                      <div className="label mb-1">Status</div>
                      <select
                        className="input"
                        value={t.status}
                        onChange={(e)=>changeTaskStatus(t._id, e.target.value)}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn bg-slate-100" onClick={()=>startTaskEdit(t)}>Edit</button>
                      <button className="btn bg-red-600 text-white ml-auto" onClick={()=>deleteTask(t._id)}>Delete</button>
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