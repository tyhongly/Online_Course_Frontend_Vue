import { reactive } from 'vue';
import { courses as initialCourses } from '../data/index.js';
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '../services/courseApi.js';

// Get from localStorage if exists, else use mock data
const storedCourses = localStorage.getItem('course_data');
let defaultCourses = storedCourses ? JSON.parse(storedCourses) : initialCourses.map(c => ({
  ...c,
  status: 'live', // live or draft
  lessons: [
    { id: 1, title: 'Introduction', type: 'video', content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 1 },
    { id: 2, title: 'Basic Concepts', type: 'text', content: 'This is a text lesson explaining the basic concepts.', order: 2 },
    { id: 3, title: 'Knowledge Check', type: 'quiz', content: [
      { q: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' }
    ], order: 3 }
  ]
}));

export const courseStore = reactive({
  courses: defaultCourses,

  async fetchCourses() {
    const response = await getAllCourses();
    const payload = response?.data?.data || response?.data || [];
    this.courses = Array.isArray(payload) ? payload : payload.courses || [];
    this.save();
    return this.courses;
  },

  save() {
    localStorage.setItem('course_data', JSON.stringify(this.courses));
  },

  async addCourse(course) {
    const newCourse = {
      ...course,
      thumbnailUrl: course.thumbnailUrl || course.image || '',
      image: course.image || course.thumbnailUrl || '',
      published: course.published ?? course.status !== 'draft',
      lessons: [],
      status: course.status || 'draft',
      students: '0',
      rating: 0,
      reviews: 0
    };
    const response = await createCourse(newCourse);
    const payload = response?.data?.data || response?.data || response;
    const createdCourse = payload?.course || payload;
    this.courses.push({ ...newCourse, ...createdCourse });
    this.save();
    return { ...newCourse, ...createdCourse };
  },

  async updateCourse(id, updatedData) {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      const nextCourse = {
        ...this.courses[index],
        ...updatedData,
        thumbnailUrl: updatedData.thumbnailUrl || updatedData.image || this.courses[index].thumbnailUrl || this.courses[index].image || '',
        image: updatedData.image || updatedData.thumbnailUrl || this.courses[index].image || this.courses[index].thumbnailUrl || '',
        published: updatedData.published ?? this.courses[index].published ?? this.courses[index].status !== 'draft',
        status: updatedData.status || this.courses[index].status || 'draft',
      };
      const response = await updateCourse(id, nextCourse);
      const payload = response?.data?.data || response?.data || response;
      this.courses[index] = { ...nextCourse, ...(payload?.course || payload) };
      this.save();
      return this.courses[index];
    }
  },

  async deleteCourse(id) {
    await deleteCourse(id);
    this.courses = this.courses.filter(c => String(c.id) !== String(id));
    this.save();
  },

  addLesson(courseId, lesson) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.lessons.push({ ...lesson, id: Date.now() });
      this.save();
    }
  },

  updateLesson(courseId, lessonId, lessonData) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      const idx = course.lessons.findIndex(l => l.id === lessonId);
      if (idx !== -1) {
        course.lessons[idx] = { ...course.lessons[idx], ...lessonData };
        this.save();
      }
    }
  },

  deleteLesson(courseId, lessonId) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.lessons = course.lessons.filter(l => l.id !== lessonId);
      this.save();
    }
  }
});
