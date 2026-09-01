import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '../store/authStore.js';

import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import Catalog from '../views/courses/Catalog.vue';
import CourseDetail from '../views/courses/CourseDetail.vue';
import Cart from '../views/Cart.vue';
import AboutPage from '../views/AboutPage.vue';
import PricingPage from '../views/PricingPage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import Unauthorized from '../views/Unauthorized.vue';
import AdminPreview from '../views/dev/AdminPreview.vue';
import Category from '../components/Category.vue';
// Student Views
import StudentLayout from '../views/student/StudentLayout.vue';
import Dashboard from '../views/student/Dashboard.vue';
import MyCourses from '../views/student/MyCourses.vue';
import Profile from '../views/student/Profile.vue';
import Wishlist from '../views/student/Wishlist.vue';
import CoursePlayer from '../views/learn/CoursePlayer.vue';

// Admin Views
import AdminLayout from '../views/admin/AdminLayout.vue';
import Overview from '../views/admin/Overview.vue';
import AdminProfile from '../views/admin/Profile.vue';
import CourseList from '../views/admin/CourseList.vue';
import CourseEditor from '../views/admin/CourseEditor.vue';
import StudentList from '../views/admin/StudentList.vue';
import CategoryList from '../views/admin/CategoryList.vue';
import CategoryEditor from '../views/admin/CategoryEditor.vue';
import LessonList from '../views/admin/LessonList.vue';
import LessonEditor from '../views/admin/LessonEditor.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    redirect: () => (authStore.user?.role === 'admin' ? '/admin' : '/student/dashboard'),
  },
  {
    path: '/dashboard/:pathMatch(.*)*',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/courses', name: 'Catalog', component: Catalog },
  { path: '/categories', name: 'Categories', component: CategoriesPage },
  { path: '/categories/:slug', name: 'Category', component: Category },
  { path: '/course/:id', name: 'CourseDetail', component: CourseDetail },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/instructors', redirect: '/courses' },
  { path: '/pricing', name: 'Pricing', component: PricingPage },
  { path: '/unauthorized', name: 'Unauthorized', component: Unauthorized },
  ...(import.meta.env.DEV ? [{ path: '/preview/admin', name: 'AdminPreview', component: AdminPreview }] : []),
  { 
    path: '/student', 
    name: 'Student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'student' },
    children: [
      { path: '', redirect: '/student/dashboard' },
      { path: 'dashboard', name: 'StudentDashboard', component: Dashboard },
      { path: 'my-courses', name: 'StudentMyCourses', component: MyCourses },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'wishlist', name: 'StudentWishlist', component: Wishlist }
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
      { path: 'dashboard', redirect: '/admin' },
      { path: 'profile', name: 'AdminProfile', component: AdminProfile },
      { path: 'courses', name: 'AdminCourseList', component: CourseList },
      { path: 'courses/new', name: 'AdminCourseNew', component: CourseEditor },
      { path: 'courses/:id/edit', name: 'AdminCourseEdit', component: CourseEditor },
      { path: 'lessons', name: 'AdminLessonList', component: LessonList },
      { path: 'lessons/new', name: 'AdminLessonNew', component: LessonEditor },
      { path: 'lessons/:id/edit', name: 'AdminLessonEdit', component: LessonEditor },
      { path: 'categories', name: 'AdminCategoryList', component: CategoryList },
      { path: 'categories/new', name: 'AdminCategoryNew', component: CategoryEditor },
      { path: 'categories/:id/edit', name: 'AdminCategoryEdit', component: CategoryEditor },
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
  if ((to.path === '/login' || to.path === '/signup') && authStore.user) {
    next('/dashboard');
    return;
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role || null;
  
  if (requiresAuth && !authStore.user) {
    next('/login');
  } else if (requiresAuth && requiredRole && authStore.user.role !== requiredRole) {
    next('/unauthorized'); // Redirect if wrong role
  } else {
    next();
  }
});

export default router;
