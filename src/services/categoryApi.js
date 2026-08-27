import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createCategory = (category) => apiClient.post('/category/create', category);
export const getAllCategories = () => apiClient.get('/category/getAll');
export const updateCategory = (id, category) => apiClient.put(`/category/update/${id}`, category);
export const deleteCategory = (id) => apiClient.delete(`/category/delete/${id}`);
