import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const categories = [
  "Architecture", "Design", "Exterior", "Interior", "3ds Max", "AI", "Animations", "Business",
  "Cameras & Composition", "For Beginners", "GrowFX", "Hardware", "News", "Post-Production",
  "Software", "Studio Tours", "Tips & Tricks", "Visualisations"
];

export default function IntegratedBlogComponent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  // Pagination
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const currentPosts = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="pt-32 pb-10 text-center">
        <h1 className="text-5xl font-bold text-[#d07310]">Blog</h1>
        <p className="mt-4 text-gray-600">
          Explore cutting-edge architectural visualization techniques
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-4 mb-10">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-5 py-2 rounded-full border ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-[#d59653] to-[#d07310] text-white'
              : 'bg-white text-black border-gray-300 hover:border-[#d07310]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#d59653] to-[#d07310] text-white'
                : 'bg-white text-black border-gray-300 hover:border-[#d07310]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found for this category.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((blog) => (
              <div key={blog._id} className="group relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-white text-xl font-bold underline"
                  >
                    Read More
                  </Link>
                </div>
                <div className="p-4 bg-white">
                  <span className="text-xs px-2 py-1 bg-gray-800 text-white rounded-full">
                    {blog.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg">{blog.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-full ${
                  currentPage === pageNum
                    ? 'bg-gradient-to-r from-[#d59653] to-[#d07310] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#d07310]'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
