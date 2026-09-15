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
