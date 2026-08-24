import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '../store/authStore.js';

import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import Catalog from '../views/courses/Catalog.vue';
import CourseDetail from '../views/courses/CourseDetail.vue';
import Cart from '../views/Cart.vue';
import AboutPage from '../views/AboutPage.vue';
import InstructorsPage from '../views/InstructorsPage.vue';
import PricingPage from '../views/PricingPage.vue';
// Student Views
import StudentLayout from '../views/student/StudentLayout.vue';
import MyCourses from '../views/student/MyCourses.vue';
import Profile from '../views/student/Profile.vue';
import CoursePlayer from '../views/learn/CoursePlayer.vue';

// Admin Views
import AdminLayout from '../views/admin/AdminLayout.vue';
import Overview from '../views/admin/Overview.vue';
import CourseList from '../views/admin/CourseList.vue';
import CourseEditor from '../views/admin/CourseEditor.vue';
import StudentList from '../views/admin/StudentList.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/courses', name: 'Catalog', component: Catalog },
  { path: '/course/:id', name: 'CourseDetail', component: CourseDetail },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/instructors', name: 'Instructors', component: InstructorsPage },
  { path: '/pricing', name: 'Pricing', component: PricingPage },
  { 
    path: '/student', 
    name: 'Student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'student' },
    children: [
      { path: 'my-courses', name: 'MyCourses', component: MyCourses },
      { path: 'profile', name: 'Profile', component: Profile }
    ]
  },
  { 
    path: '/learn/:courseId/lesson/:lessonId?', 
    name: 'CoursePlayer', 
    component: CoursePlayer,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: '', name: 'AdminOverview', component: Overview },
      { path: 'courses', name: 'AdminCourseList', component: CourseList },
      { path: 'courses/new', name: 'AdminCourseNew', component: CourseEditor },
      { path: 'courses/:id/edit', name: 'AdminCourseEdit', component: CourseEditor },
      { path: 'students', name: 'AdminStudentList', component: StudentList },
      { path: 'analytics', name: 'AdminAnalytics', component: () => import('../views/admin/Analytics.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Simple Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.matched.some(record => record.meta.role) ? to.meta.role || to.matched.find(r => r.meta.role)?.meta.role : null;
  
  if (requiresAuth && !authStore.user) {
    next('/login');
  } else if (requiresAuth && requiredRole && authStore.user.role !== requiredRole && authStore.user.role !== 'admin') {
    next('/'); // Redirect if wrong role
  } else {
    next();
  }
});

export default router;
