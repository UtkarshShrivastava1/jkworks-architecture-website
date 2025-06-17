import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import blogBg from '../assets/blog.jpg';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

const BlogGridHeader = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section with Background Image */}
      <motion.div
        className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center"
        style={{
          backgroundImage: `url(${blogBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 text-center text-[#222222]">
          <h2 className="text-6xl font-bold font-serif mb-4">Blog Grid</h2>
          <div className="flex items-center justify-center space-x-2">
            <a href="/" className="font-bold text-2xl text-blue-500 hover:text-yellow-400 hover:shadow-yellow-400 hover:shadow-lg transition duration-300">Home</a>
            <span>&gt;&gt;</span>
            <span className="text-l font-bold text-2xl">Blog Grid</span>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid Section */}
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative flex flex-col transition-all duration-300 group h-full mx-auto w-full max-w-xs"
                style={{
                  transition: 'all 0.3s ease',
                  border: '1px dashed black',
                  borderRadius: '0px',
                  padding: '0px',
                }}
              >
                {/* Blog image */}
               {blog.image && (
                <img
              src={`${API_URL}/uploads/${blog.image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
                />
            )}

                {/* Content section with subtle overlay */}
                <div className="p-6 flex-grow flex flex-col relative" style={{ minHeight: '300px' }}>
                  <div className="absolute inset-0 bg-white bg-opacity-90"></div>
                  <div className="relative z-10">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-black transition-colors duration-300">{blog.title}</h3>
                    <div className="mb-6 flex-grow overflow-auto break-words" style={{ maxHeight: "120px" }}>
                      <p className="text-gray-600 whitespace-pre-line">
                        {blog.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm text-gray-500">By - {blog.author || "Admin"}</div>
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

export default BlogGridHeader;