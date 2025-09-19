export default function TaskForm({ values, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="card mb-6 space-y-3">
      <div><div className="label">Task title</div><input className="input" name="title" value={values.title} onChange={onChange} /></div>
      <div><div className="label">Description</div><textarea className="input" name="description" value={values.description} onChange={onChange} /></div>
      <button className="btn bg-slate-900 text-white">Add Task</button>
    </form>
  );
}