import axios from 'axios';
import { getAccessToken, toAuthorizationValue } from '../utils/authToken.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

apiClient.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'get') return config;

  const authorization = toAuthorizationValue(getAccessToken());
  if (authorization) config.headers.Authorization = authorization;
  return config;
});

export const getCategoryById = (id) => apiClient.get(`/categories/${id}`);
export const getAllCategories = () => apiClient.get('/categories');
export const createCategory = (category) => apiClient.post('/categories', category);
export const updateCategory = (id, category) => apiClient.put(`/categories/${id}`, category);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
