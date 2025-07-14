import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, User, Link as LinkIcon } from "lucide-react";
import api from "../services/api";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="text-gray-600 text-base sm:text-lg">Fetching article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-red-600 text-base sm:text-lg">Blog not found.</p>
      </div>
    );
  }

  const tag = Array.isArray(blog.tags) ? blog.tags[0] : blog.tags;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 mt-8">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm sm:text-base font-medium"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Blog Card */}
        <div className="bg-white shadow-md sm:shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={blog?.image || "/no-image.jpg"}
              alt={blog.title}
              className="w-full h-52 sm:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Tag Badge */}
            {tag && (
              <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-md">
                {tag}
              </span>
            )}
          </div>

          {/* Blog Content */}
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm text-gray-500 mb-4 sm:mb-6 gap-2 sm:gap-4">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {blog.author || "Admin"}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-base sm:prose-lg max-w-none text-gray-700">
              <p>{blog.description}</p>
            </div>

            {/* Optional Link */}
            {blog.link && (
              <div className="mt-6">
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Related Link</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
