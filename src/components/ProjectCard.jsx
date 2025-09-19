export default function ProjectCard({ project, onClick }) {
  return (
    <div className="card hover:shadow cursor-pointer" onClick={onClick}>
      <div className="text-lg font-semibold">{project.name}</div>
      <div className="text-sm text-gray-600">{project.description}</div>
    </div>
  );
}