import { useState, useEffect } from 'react';
import { getProjectById, updateProject } from '../services/projectService';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(id);
      setTitle(project.title);
      setAddress(project.address || '');
      setDescription(project.description);
      setImage(project.image);
      setPreview(`${API_URL}/uploads/${project.image}`);
      setFetching(false);
    };
    fetchProject();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(file ? URL.createObjectURL(file) : (image ? `${API_URL}/uploads/${image}` : ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData;
      if (newImage) {
        formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('image', newImage);
      } else {
        formData = { title, address, description };
      }
      await updateProject(id, formData, !!newImage);
      navigate('/dashboard/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarNavigate = (path) => navigate(path);

  if (fetching) {
    return <div className="text-center mt-10 text-white">Loading project...</div>;
  }

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar */}
      <div className="hidden md:block h-full w-72 flex-shrink-0">
        <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={() => navigate('/login')} />
      </div>
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-8">
        <div className="max-w-xl mx-auto bg-slate-800/90 p-8 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Project</h2>
            <button
              onClick={() => navigate('/dashboard/projects')}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-200">Title</label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">Address</label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">Description</label>
              <textarea
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">Project Image</label>
              {preview && (
                <img
                  src={preview}
                  alt="Project"
                  className="w-40 h-32 object-cover rounded mb-2 border"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-800 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProject;