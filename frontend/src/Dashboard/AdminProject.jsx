import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

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

  const handleSidebarNavigate = (path) => navigate(path);

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar */}
      <div className="hidden md:block h-full w-72 flex-shrink-0">
        <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={() => navigate('/login')} />
      </div>
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-slate-800/90 p-6 md:p-10 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
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
            <div className="text-slate-400 text-center py-8">No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div
                  key={project._id}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-5 flex flex-col shadow hover:shadow-lg transition"
                >
                  {project.image && (
                    <img
                      src={`${import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000'}/uploads/${project.image}`}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded mb-3 border"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-300 mb-4 break-words line-clamp-2">{project.description?.slice(0, 80)}...</p>
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
      </main>
    </div>
  );
};

export default AdminProject;