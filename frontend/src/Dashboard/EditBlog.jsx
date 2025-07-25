import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await api.get(`/blogs/${id}`);
      const blog = res.data;
      setTitle(blog.title || "");
      setCategory(blog.category || "");
      setDescription(blog.description || "");
      setTag(blog.tags?.[0] || ""); // assuming tags is an array
      setLink(blog.link || "");
      setImage(blog.image || "");
      setPreview(blog.image || "");
      setFetching(false);
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(file ? URL.createObjectURL(file) : image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData;

      if (newImage) {
        formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("tags", tag);
        formData.append("link", link);
        formData.append("image", newImage);

        await api.put(`/blogs/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        formData = {
          title,
          category,
          description,
          tags: tag,
          link,
        };
        await api.put(`/blogs/${id}`, formData);
      }

      navigate("/dashboard/blogs");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  if (fetching) return <div className="text-center mt-10 text-white">Loading blog...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Edit Blog</h1>
        <button
          className="text-white"
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
          md:block h-full w-72 flex-shrink-0 bg-slate-900
        `}
      >
        <div className="h-full overflow-y-auto">
          <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={() => navigate('/login')} />
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90">
        <div className="max-w-xl mx-auto bg-slate-800/90 p-8 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Blog</h2>
            <button
              onClick={() => navigate("/dashboard/blogs")}
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
              <label className="block mb-1 font-medium text-gray-200">Category</label>
              <select
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Architecture">Architecture</option>
                <option value="Design">Design</option>
                <option value="Exterior">Exterior</option>
                <option value="Interior">Interior</option>
                <option value="3ds Max">3ds Max</option>
                <option value="AI">AI</option>
                <option value="Animations">Animations</option>
                <option value="Business">Business</option>
                <option value="Cameras & Composition">Cameras & Composition</option>
                <option value="For Beginners">For Beginners</option>
                <option value="GrowFX">GrowFX</option>
                <option value="Hardware">Hardware</option>
                <option value="News">News</option>
                <option value="Post-Production">Post-Production</option>
                <option value="Software">Software</option>
                <option value="Studio Tours">Studio Tours</option>
                <option value="Tips & Tricks">Tips & Tricks</option>
                <option value="Visualisations">Visualisations</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-200">Tags</label>
              <select
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              >
                <option value="">Select tag</option>
                <option value="article">Article</option>
                <option value="news">News</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
         <div>
         <label className="block mb-1 font-medium text-gray-200">Description</label>
          <textarea
           className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           rows={7}
           required
          />
        </div>

            <div>
              <label className="block mb-1 font-medium text-gray-200">Optional Link</label>
              <input
                type="url"
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-200">Blog Image</label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
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

export default EditBlog;
