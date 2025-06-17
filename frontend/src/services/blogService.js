import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getBlogs = () =>
  axios.get(`${API_URL}/api/blogs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getBlogById = async (id) => {
  const res = await axios.get(`${API_URL}/api/blogs/${id}`);
  return res.data; // <-- Only return the blog object, not the whole response
};

export const createBlog = (formData) =>
  axios.post(`${API_URL}/api/blogs`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateBlog = (id, data, isFormData = false) =>
  axios.put(
    `${API_URL}/api/blogs/${id}`,
    data,
    {
      headers: {
        ...(isFormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export const deleteBlog = (id) =>
  axios.delete(`${API_URL}/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });