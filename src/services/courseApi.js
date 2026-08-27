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

export const getAllCourses = () => apiClient.get('/course/getAll');
export const createCourse = (course) => apiClient.post('/course/create', course);
export const updateCourse = (id, course) => apiClient.put(`/course/update/${id}`, course);
export const deleteCourse = (id) => apiClient.delete(`/course/delete/${id}`);
