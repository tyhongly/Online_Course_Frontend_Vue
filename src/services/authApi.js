import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8081/api'
});

export const loginAccount = (credentials) => apiClient.post('/auth/login', credentials);
export const createAccount = (account) => apiClient.post('/auth/register', account);
export const verifyOtp = (data) => apiClient.post('/auth/verify-otp', data);
export const requestPasswordResetRequest = (email) => apiClient.post('/auth/password/forgot', { email });
export const verifyPasswordResetOtpRequest = (data) => apiClient.post('/auth/password/verify-otp', data);
export const resetPasswordRequest = (data) => apiClient.post('/auth/password/reset', data);
