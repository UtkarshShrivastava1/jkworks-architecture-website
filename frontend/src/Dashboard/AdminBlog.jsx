import { useEffect, useState } from 'react';
import { getBlogs, deleteBlog } from '../services/blogService';
import { useNavigate } from 'react-router-dom';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
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

  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="relative h-48 md:h-56 lg:h-64 flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-yellow-100 mb-8">
        <div className="relative z-10 text-center text-[#222222]">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-2">Blog Admin</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-xl text-blue-500">Dashboard</span>
            <span>&gt;&gt;</span>
            <span className="text-lg font-bold text-amber-700">Manage Blogs</span>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
          <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition" > Back
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
          <div className="text-gray-500 text-center py-8">No blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div
                key={blog._id}
                className="relative flex flex-col transition-all duration-300 group h-full mx-auto w-full max-w-xs border border-dashed border-black rounded bg-white shadow hover:shadow-xl"
                style={{
                  padding: '0px',
                }}
              >
                {/* If you have blog images, display here */}
                {blog.image && (
                  <div className="relative h-40 overflow-hidden rounded-t">
                    <img
                      src={`${import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000'}/uploads/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col relative" style={{ minHeight: '220px' }}>
                  <div className="absolute inset-0 bg-white bg-opacity-90"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="mx-1">|</span>
                      <span>{blog.author || "Admin"}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-black transition-colors duration-300">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{blog.content?.slice(0, 100)}...</p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;