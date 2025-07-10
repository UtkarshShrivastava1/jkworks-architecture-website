import { useState, useEffect } from "react";
import api, { API_URL } from "../services/api"; // <-- Import api and API_URL
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [constructionArea, setConstructionArea] = useState("");
  const [images, setImages] = useState([]); // new images to upload
  const [existingImages, setExistingImages] = useState([]); // already uploaded images
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      // Use api.get instead of getProjectById
      const res = await api.get(`/projects/${id}`);
      const project = res.data;
      setTitle(project.title || "");
      setAddress(project.address || "");
      setDescription(project.description || "");
      setCategory(project.category || "");
      setCarpetArea(project.carpetArea || "");
      setConstructionArea(project.constructionArea || "");
      setExistingImages(project.images || []);
      setPreviews((project.images || []).map((img) => `${API_URL.replace("/api", "")}/uploads/${img}`));
      setFetching(false);
    };
    fetchProject();
  }, [id]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData;
      if (images.length > 0) {
        formData = new FormData();
        formData.append("title", title);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("carpetArea", carpetArea);
        formData.append("constructionArea", constructionArea);
        images.forEach((img) => formData.append("images", img));
        // Use api.put for multipart/form-data
        await api.put(`/projects/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        formData = {
          title,
          address,
          description,
          category,
          carpetArea,
          constructionArea,
        };
        await api.put(`/projects/${id}`, formData);
      }
      navigate("/dashboard/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  if (fetching) {
    return (
      <div className="text-center mt-10 text-white">Loading project...</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* ...Sidebar code unchanged... */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-8">
        <div className="max-w-xl mx-auto bg-slate-800/90 p-8 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Project</h2>
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Title
              </label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Address
              </label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Description
              </label>
              <textarea
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Carpet Area (sq. ft.)
              </label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Construction Area (sq. ft.)
              </label>
              <input
                className="w-full border border-slate-700 rounded px-3 py-2 bg-slate-900 text-white"
                value={constructionArea}
                onChange={(e) => setConstructionArea(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Project Images (up to 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-800 transition"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {previews.length > 0
                  ? previews.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Preview"
                        className="w-24 h-20 object-cover rounded border"
                      />
                    ))
                 : existingImages.map((img, i) => (
                  <img
                   key={i}
                   src={`${API_URL.replace("/api", "")}/uploads/${img}`}
                    alt="Existing"
                  className="w-24 h-20 object-cover rounded border"
                  />
                  ))
                  }
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                required
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="design">Design</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default EditProject;
