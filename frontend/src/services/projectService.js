import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

export const getProjects = () => axios.get(`${API_URL}/api/projects`);

export const getProjectById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_URL}/api/projects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getProjectsByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/api/projects/category/${category}`);
  return response.data;
};

export const createProject = (formData) =>
  axios.post(`${API_URL}/api/projects`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateProject = async (id, data, isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' }),
  };
  const response = await axios.put(
    `${API_URL}/api/projects/${id}`,
    data,
    { headers }
  );
  return response.data;
};

export const deleteProject = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};