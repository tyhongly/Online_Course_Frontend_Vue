import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

export const loginAccount = (credentials) => apiClient.post('/auth/login', credentials);
export const createAccount = (account) => apiClient.post('/auth/createAcc', account);
