import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext2";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || "http://localhost:5000";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ projects: 0, blogs: 0, faqs: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentFaqs, setRecentFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [projectsRes, blogsRes, faqsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/api/blogs`),
          axios.get(`${API_URL}/api/faqs`),
        ]);

        setStats({
          projects: projectsRes.data.length,
          blogs: blogsRes.data.length,
          faqs: faqsRes.data.length,
        });

        setRecentProjects(projectsRes.data.slice(0, 6));
        setRecentBlogs(blogsRes.data.slice(0, 6));
        setRecentFaqs(faqsRes.data.slice(0, 6));
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
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
          <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={handleLogout} />
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
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-2 sm:p-4 md:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto bg-slate-800/90 rounded-2xl shadow-2xl p-3 sm:p-6 md:p-10 min-h-[90vh]">
          {/* Only show heading on md+ screens, on mobile it's in the topbar */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl shadow p-4 sm:p-6 flex flex-col items-start">
              <p className="text-blue-100 text-sm">Projects</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.projects}</p>
            </div>
            <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-xl shadow p-4 sm:p-6 flex flex-col items-start">
              <p className="text-green-100 text-sm">Blogs</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.blogs}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl shadow p-4 sm:p-6 flex flex-col items-start">
              <p className="text-purple-100 text-sm">FAQs</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.faqs}</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-slate-900/80 rounded-xl shadow p-3 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white border-b border-slate-700 pb-2 mb-4 sm:mb-6">Recent Projects</h2>
            {recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentProjects.map((project) => (
                  <div key={project._id} className="bg-slate-800 p-3 sm:p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col">
                    {project.image && (
                      <img
                        src={`${API_URL}/uploads/${project.image}`}
                        alt={project.title}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4"
                      />
                    )}
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-4 break-words line-clamp-2">{project.description}</p>
                    <button
                      className="mt-auto px-3 py-2 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-xs sm:text-base"
                      onClick={() => navigate(`/dashboard/projects/edit/${project._id}`)}
                    >
                      Edit Project
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <p className="text-slate-400 mb-4">No projects found.</p>
                <button
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-base"
                  onClick={() => navigate("/dashboard/projects/create")}
                >
                  Add Project
                </button>
              </div>
            )}
          </div>

          {/* Recent Blogs */}
          <div className="bg-slate-900/80 rounded-xl shadow p-3 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white border-b border-slate-700 pb-2 mb-4 sm:mb-6">Recent Blogs</h2>
            {recentBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentBlogs.map((blog) => (
                  <div key={blog._id} className="bg-slate-800 p-3 sm:p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{blog.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-4">{blog.content?.slice(0, 100)}...</p>
                    <button
                      className="mt-auto px-3 py-2 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-xs sm:text-base"
                      onClick={() => navigate(`/dashboard/blogs/edit/${blog._id}`)}
                    >
                      Edit Blog
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <p className="text-slate-400 mb-4">No blogs found.</p>
                <button
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-xs sm:text-base"
                  onClick={() => navigate("/dashboard/blogs/create")}
                >
                  Add Blog
                </button>
              </div>
            )}
          </div>

          {/* Recent FAQs */}
          <div className="bg-slate-900/80 rounded-xl shadow p-3 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white border-b border-slate-700 pb-2 mb-4 sm:mb-6">Recent FAQs</h2>
            {recentFaqs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentFaqs.map((faq) => (
                  <div key={faq._id} className="bg-slate-800 p-3 sm:p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-4 break-words line-clamp-2">{faq.answer}</p>
                    <button
                      className="mt-auto px-3 py-2 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-xs sm:text-base"
                      onClick={() => navigate(`/dashboard/faqs/edit/${faq._id}`)}
                    >
                      Edit FAQ
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <p className="text-slate-400 mb-4">No FAQs found.</p>
                <button
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-xs sm:text-base"
                  onClick={() => navigate("/dashboard/faqs/create")}
                >
                  Add FAQ
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;