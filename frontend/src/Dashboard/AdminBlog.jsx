import { useEffect, useState } from 'react';
import { getBlogs, deleteBlog } from '../services/blogService';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getBlogs();
      setBlogs(Array.isArray(res.data) ? res.data : []);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
      setBlogs(blogs.filter(blog => blog._id !== id));
    }
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Manage Blogs</h1>
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
        <div className="max-w-6xl mx-auto bg-slate-800/90 p-6 md:p-10 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Manage Blogs</h2>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => navigate('/dashboard/blogs/create')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                + Create Blog
              </button>
            </div>
          </div>
          {blogs.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No blogs found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <div
                  key={blog._id}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-5 flex flex-col shadow hover:shadow-lg transition"
                >
                  {blog.image && (
                    <img
                      src={`${import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000'}/uploads/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded mb-3 border"
                    />
                  )}
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="mx-1">|</span>
                    <span>{blog.author || "Admin"}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
                  <p className="text-sm text-slate-300 mb-4 flex-grow">{blog.content?.slice(0, 100)}...</p>
                  <div className="flex items-center justify-between mt-auto gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/blogs/edit/${blog._id}`)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
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

export default AdminBlog;