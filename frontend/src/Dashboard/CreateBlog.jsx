import { useState } from "react";
import { createBlog } from "../services/blogService";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      await createBlog(formData);
      navigate("/dashboard/blogs");
    } catch (err) {
      alert("Failed to create blog. Please check your server and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow border border-gray-100">
      <h2 className="text-2xl font-bold mb-7 text-center text-gray-800">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 bg-gray-50 transition"
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
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
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold shadow hover:bg-gray-900 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;