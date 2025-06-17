import { useState, useEffect } from 'react';
import { getProjectById, updateProject } from '../services/projectService';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(id);
      setTitle(project.title);
      setAddress(project.address || '');
      setDescription(project.description);
      setImage(project.image);
      setPreview(`${API_URL}/uploads/${project.image}`);
    };
    fetchProject();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(file ? URL.createObjectURL(file) : `${API_URL}/uploads/${image}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData;
      if (newImage) {
        formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('image', newImage);
      } else {
        formData = { title, address, description };
      }
      await updateProject(id, formData, !!newImage);
      navigate('/dashboard/projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Edit Project</h2>
      <button
        onClick={() => navigate('/dashboard/projects')}
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
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Project Image</label>
          {preview && (
            <img
              src={preview}
              alt="Project"
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

export default EditProject;