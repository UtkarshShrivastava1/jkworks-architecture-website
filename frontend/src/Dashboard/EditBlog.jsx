import { useState, useEffect } from 'react';
import { getBlogById, updateBlog } from '../services/blogService';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // <-- Move here!
  const navigate = useNavigate();

useEffect(() => {
  const fetchBlog = async () => {
    const blog = await getBlogById(id);
    console.log('Fetched blog:', blog); // Add this line
    setTitle(blog.title || '');
    setCategory(blog.category || '');
    setDescription(blog.description || blog.content || '');
    setImage(blog.image || '');
    setPreview(blog.image ? `${API_URL}/uploads/${blog.image}` : '');
    setFetching(false);
  };
  fetchBlog();
}, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(file ? URL.createObjectURL(file) : (image ? `${API_URL}/uploads/${image}` : ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData;
      if (newImage) {
        formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('image', newImage);
      } else {
        formData = { title, category, description };
      }
      await updateBlog(id, formData, !!newImage);
      navigate('/dashboard/blogs');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center mt-10">Loading blog...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
         <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Edit Blog</h2>
      <button
        onClick={() => navigate('/dashboard/blogs')}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Blog Image</label>
          {preview && (
            <img
              src={preview}
              alt="Blog"
              className="w-40 h-32 object-cover rounded mb-2 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;             