import axios from 'axios';
import { getAccessToken, toAuthorizationValue } from '../utils/authToken.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

apiClient.interceptors.request.use((config) => {
  const authorization = toAuthorizationValue(getAccessToken());
  if (authorization) config.headers.Authorization = authorization;
  return config;
});

export const createSection = (section) => apiClient.post('/sections', section);
export const getSections = () => apiClient.get('/sections');
export const getSection = (id) => apiClient.get(`/sections/${id}`);
export const updateSection = (id, section) => apiClient.put(`/sections/${id}`, section);
export const deleteSection = (id) => apiClient.delete(`/sections/${id}`);
