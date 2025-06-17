import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext2";
import axios from "axios";

// If you have an AdminSidebar component, import it here
// import AdminSidebar from "../components/AdminSidebar";

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || "http://localhost:5000";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ projects: 0, blogs: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [projectsRes, blogsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/api/blogs`),
        ]);

        setStats({
          projects: projectsRes.data.length,
          blogs: blogsRes.data.length,
        });

        setRecentProjects(projectsRes.data.slice(0, 6));
        setRecentBlogs(blogsRes.data.slice(0, 6));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Projects</p>
          <p className="text-2xl font-bold">{stats.projects}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Blogs</p>
          <p className="text-2xl font-bold">{stats.blogs}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-8">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard/projects")}
        >
          Manage Projects
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard/projects/create")}
        >
          Create Project
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard/blogs")}
        >
          Manage Blogs
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard/blogs/create")}
        >
          Create Blog
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Recent Projects</h2>
        {recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-200">
                {project.image && (
                  <img
                    src={`${API_URL}/uploads/${project.image}`}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-700">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4 break-words line-clamp-2">{project.description}</p>
                <button
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/dashboard/projects/edit/${project._id}`)}
                >
                  Edit Project
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No projects found.</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate("/dashboard/projects/create")}
            >
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Recent Blogs</h2>
        {recentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <div key={blog._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-200">
                <h3 className="text-lg font-semibold text-gray-700">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.content?.slice(0, 100)}...</p>
                <button
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/dashboard/blogs/edit/${blog._id}`)}
                >
                  Edit Blog
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No blogs found.</p>
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => navigate("/dashboard/blogs/create")}
            >
              Add Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;