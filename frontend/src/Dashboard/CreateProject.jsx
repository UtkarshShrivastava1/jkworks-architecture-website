import { useState } from 'react';
import { createProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('interior');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);
    await createProject(formData);
    setLoading(false);
    navigate('/dashboard/projects');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow border border-gray-100">
      <h2 className="text-2xl font-bold mb-7 text-center text-gray-800">Create Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-44 h-32 object-cover rounded-xl mt-4 border border-gray-200 shadow"
            />
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:border-gray-500 transition"
            required
          >
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="design">Design</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold shadow hover:bg-gray-900 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;