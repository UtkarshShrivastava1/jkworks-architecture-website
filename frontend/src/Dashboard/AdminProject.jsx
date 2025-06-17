import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';

const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      setProjects(Array.isArray(res.data) ? res.data : []);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Projects</h2>
         <div className="flex gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/dashboard/projects/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create Project
          </button>
        </div>
      </div>
      {projects.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project._id}
              className="bg-gray-50 border rounded-lg p-5 flex flex-col shadow hover:shadow-lg transition"
            >
            {project.image && (
           <img src={`${import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000'}/uploads/${project.image}`}
             alt={project.title}
            className="w-full h-40 object-cover rounded mb-3 border"
            />
         )}
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-4 break-words line-clamp-2">{project.description?.slice(0, 80)}...</p>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => navigate(`/dashboard/projects/edit/${project._id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProject;