export default function TaskItem({ task, onStatus, onDelete }) {
  return (
    <div className="card">
      <div className="font-semibold">{task.title}</div>
      <div className="text-sm text-gray-600 mb-3">{task.description}</div>
      <div className="flex gap-2">
        {['To Do','In Progress','Done'].map(s=>(
          <button key={s}
            className={`btn ${task.status===s?'bg-emerald-600 text-white':'bg-slate-100'}`}
            onClick={()=>onStatus(s)}>{s}</button>
        ))}
        <button className="btn bg-red-600 text-white ml-auto" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}