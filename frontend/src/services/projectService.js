
import api from "./api";

export const getProjects = () => api.get("/projects");

export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const getProjectsByCategory = async (category) => {
  const res = await api.get(`/projects/category/${category}`);
  return res.data;
};

export const createProject = (formData) =>
  api.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProject = async (id, data, isFormData = false) =>
  api.put(`/projects/${id}`, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });

export const deleteProject = (id) => api.delete(`/projects/${id}`);
