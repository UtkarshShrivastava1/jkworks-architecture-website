
import api from "./api";

export const getFAQs = () => api.get("/faqs");

export const getFAQById = async (id) => {
  const res = await api.get(`/faqs/${id}`);
  return res.data;
};

export const createFAQ = (faq) =>
  api.post("/faqs", faq, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateFAQ = async (id, data) => {
  const res = await api.put(`/faqs/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const deleteFAQ = (id) => api.delete(`/faqs/${id}`);
