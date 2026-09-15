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

export const getAllCourses = () => apiClient.get('/courses');
export const getCourseById = (id) => apiClient.get(`/courses/${id}`);

const toCourseFormData = (course) => {
  const formData = new FormData();
  const fields = [
    'title', 'slug', 'category', 'badgeLabel', 'description', 'price',
    'accessType', 'format', 'pacing', 'isPublished'
  ];

  fields.forEach((field) => {
    const value = course[field];
    if (value !== undefined && value !== null) {
      formData.append(field, value);
    }
  });

  if (course.coverImage instanceof File) {
    formData.append('coverImage', course.coverImage);
  }

  return formData;
};

export const createCourse = (course) => apiClient.post('/courses', toCourseFormData(course));
export const updateCourse = (id, course) => apiClient.put(`/courses/${id}`, toCourseFormData(course));
export const deleteCourse = (id) => apiClient.delete(`/courses/${id}`);
export const getCourseSections = (courseId) => apiClient.get(`/courses/${courseId}/sections`);
