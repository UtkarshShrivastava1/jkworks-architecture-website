import axios from "axios";
import { toast } from "react-toastify";

// Clean trailing slashes
const cleanUrl = (url) => url?.replace(/\/+$/, "");

// ✅ Exportable API base URL
export const API_URL =
  import.meta.env.MODE === "production"
    ? `${cleanUrl(import.meta.env.VITE_PRODUCTION_URL)}/api`
    : `${cleanUrl(import.meta.env.VITE_DEVELOPMENT_URL)}/api`;

// Debug logging (you can remove in production)
console.log("🔍 API Configuration Debug:");
console.log("Mode:", import.meta.env.MODE);
console.log("Production URL:", import.meta.env.VITE_PRODUCTION_URL);
console.log("Development URL:", import.meta.env.VITE_DEVELOPMENT_URL);
console.log("Final API URL:", API_URL);

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token from localStorage if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: Debug request
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// 🧱 Global error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const { response, request } = error;

    console.error("❌ API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: response?.status,
      message: error.message,
      request,
    });

    if (!response) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout! Please try again.");
      } else {
        toast.error("Network error! Please check your connection.");
      }
    } else if (response.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
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

// ✅ Export both
export default api;
