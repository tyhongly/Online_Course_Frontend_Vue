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

// ─── Wishlist (Current User) ──────────────────────────────────────────────────

/** GET /users/me/wishlist — Get current user's wishlist */
export const getMyWishlist = () => apiClient.get('/users/me/wishlist');

/** POST /users/me/wishlist — Add a course to the current user's wishlist */
export const addToWishlist = (courseId) => apiClient.post('/users/me/wishlist', { courseId });

/** DELETE /users/me/wishlist/{id} — Remove a course from the current user's wishlist */
export const removeFromWishlist = (id) => apiClient.delete(`/users/me/wishlist/${id}`);