import { useState } from "react";
import { createBlog } from "../services/blogService";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const categoryOptions = [
  "Architecture",
  "Design",
  "Exterior",
  "Interior",
  "3ds Max",
  "AI",
  "Animations",
  "Business",
  "Cameras & Composition",
  "For Beginners",
  "GrowFX",
  "Hardware",
  "News",
  "Post-Production",
  "Software",
  "Studio Tours",
  "Tips & Tricks",
  "Visualisations"
];

const tagOptions = ["YouTube", "Article", "News"];

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    link: "",
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("tags", form.tags);
      formData.append("link", form.link);
      if (form.image) formData.append("image", form.image);

      await createBlog(formData);
      navigate("/dashboard/blogs");
    } catch (err) {
      alert("Failed to create blog. Please check your server and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Sidebar for Mobile */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Create Blog</h1>
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
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
            <h2 className="text-2xl font-bold text-white">Create Blog</h2>
            <button
              onClick={() => navigate('/dashboard/blogs')}
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
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition"
                required
              >
                <option value="">Select a category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-200">Tag</label>
              <select
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition"
                required
              >
                <option value="">Select a tag</option>
                {tagOptions.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

             <div>
              <label className="block mb-2 font-medium text-gray-200">Description</label>
             <textarea
             name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter blog description..."
               rows={7}
             className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition resize-none"
             required
            />
          </div>
          
            <div>
              <label className="block mb-2 font-medium text-gray-200">External Link (optional)</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-800 transition"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-44 h-32 object-cover rounded-xl mt-4 border border-slate-700 shadow"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateBlog;
