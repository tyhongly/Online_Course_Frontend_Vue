import axios from 'axios';
import { getAccessToken, toAuthorizationValue } from '../utils/authToken.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

apiClient.interceptors.request.use((config) => {
  const authorization = toAuthorizationValue(getAccessToken());
  if (authorization) config.headers.Authorization = authorization;
  return config;
});

/** GET /users/me — Fetch the authenticated current user */
export const getCurrentUser = () => apiClient.get('/users/me');

/** PUT /users/me — Update the authenticated current user */
export const updateCurrentUser = (payload) => apiClient.put('/users/me', payload);

/** PUT /users/me/password — Change the authenticated user's password */
export const changeCurrentPassword = (payload) => apiClient.put('/users/me/password', payload);

/** GET /users — Fetch all users */
export const getAllUsers = () => apiClient.get('/users');

/** GET /users/{id} — Fetch a single user by ID */
export const getUserById = (id) => apiClient.get(`/users/${id}`);

// ─── User Management (Admin) ──────────────────────────────────────────────────

/** DELETE /users/{id} — Delete a user by ID */
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);

/** PUT /users/{id}/role — Update a user's role */
export const updateUserRole = (id, role) => apiClient.put(`/users/${id}/role`, { role });

/** PUT /users/{id}/suspend — Suspend a user */
export const suspendUser = (id) => apiClient.put(`/users/${id}/suspend`);

/** PUT /users/{id}/unsuspend — Unsuspend a user */
export const unsuspendUser = (id) => apiClient.put(`/users/${id}/unsuspend`);


