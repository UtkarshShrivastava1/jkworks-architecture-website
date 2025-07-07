import { useState } from 'react';
import { createProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('interior');
  const [carpetArea, setCarpetArea] = useState('');
  const [constructionArea, setConstructionArea] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('carpetArea', carpetArea);
    formData.append('constructionArea', constructionArea);
    images.forEach(img => formData.append('images', img));
    await createProject(formData);
    setLoading(false);
    navigate('/dashboard/projects');
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Create Project</h1>
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open sidebar"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`
          fixed inset-0 z-30 transition-transform duration-300 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block h-full w-72 flex-shrink-0 bg-slate-900
        `}
        style={{ maxWidth: "18rem" }}
      >
        <div className="h-full overflow-y-auto">
          <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={() => navigate('/login')} />
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-8">
        <div className="max-w-xl mx-auto bg-slate-800/90 p-8 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create Project</h2>
            <button
              onClick={() => navigate('/dashboard/projects')}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-200">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Carpet Area (sq. ft.)</label>
              <input
                type="text"
                placeholder="Carpet Area"
                value={carpetArea}
                onChange={e => setCarpetArea(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Construction Area (sq. ft.)</label>
              <input
                type="text"
                placeholder="Construction Area"
                value={constructionArea}
                onChange={e => setConstructionArea(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Project Images (up to 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-800 transition"
                required // Make at least one image required
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt="Preview" className="w-24 h-20 object-cover rounded border" />
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                required
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="design">Design</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default CreateProject;