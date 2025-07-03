import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

export const getFAQs = () => axios.get(`${API_URL}/api/faqs`);

export const getFAQById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_URL}/api/faqs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createFAQ = (faq) =>
  axios.post(`${API_URL}/api/faqs`, faq, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateFAQ = async (id, data) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await axios.put(
    `${API_URL}/api/faqs/${id}`,
    data,
    { headers }
  );
  return response.data;
};

export const deleteFAQ = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/api/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      },
  });
};