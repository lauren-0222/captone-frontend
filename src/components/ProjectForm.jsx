export default function ProjectForm({ values, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="card mb-6 space-y-3">
      <div><div className="label">Name</div><input className="input" name="name" value={values.name} onChange={onChange} /></div>
      <div><div className="label">Description</div><textarea className="input" name="description" value={values.description} onChange={onChange} /></div>
      <button className="btn bg-emerald-600 text-white">Save</button>
    </form>
  );
}