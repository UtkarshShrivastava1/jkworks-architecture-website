import axios from "axios";
import { toast } from "react-toastify";

// Clean trailing slashes
const cleanUrl = (url) => url?.replace(/\/+$/, "");

// Use Vite's built-in MODE for env switching
const API_URL =
  import.meta.env.MODE === "production"
    ? `${cleanUrl(import.meta.env.VITE_PRODUCTION_URL)}/api`
    : `${cleanUrl(import.meta.env.VITE_DEVELOPMENT_URL)}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (!response) {
      toast.error("Network error! Please check your connection.");
    } else if (response.status === 403) {
      toast.error("You don't have permission to perform this action.");
    } else if (response.status === 404) {
      toast.error("Not found.");
    } else if (response.status >= 500) {
      toast.error("Server error! Please try again later.");
    } else {
      toast.error(response?.data?.message || "Something went wrong.");
    }
    return Promise.reject(error);
  }
);

export default api;
