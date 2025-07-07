
import api from "./api";

export const getBlogs = () => api.get("/blogs");

export const getBlogById = async (id) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = (formData) =>
  api.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBlog = (id, data, isFormData = false) =>
  api.put(`/blogs/${id}`, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });

export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
