<script setup>
import { computed } from 'vue';
import { courseStore } from '../../store/courseStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';

const totalCourses = computed(() => courseStore.courses.length);
const activeCourses = computed(() => courseStore.courses.filter(c => c.status === 'live').length);
const totalEnrollments = computed(() => enrollmentStore.enrollments.length);

// Mock revenue and students
const totalStudents = computed(() => new Set(enrollmentStore.enrollments.map(e => e.userId)).size);
const totalRevenue = computed(() => {
  return enrollmentStore.enrollments.reduce((acc, en) => {
    const course = courseStore.courses.find(c => c.id === en.courseId);
    return acc + (course ? course.price : 0);
  }, 0);
});
</script>

<template>
  <div class="p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Overview</h1>
      <p class="text-gray-500 mt-2">Platform statistics at a glance.</p>
    </header>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Total Students</h3>
        <p class="text-3xl font-bold text-gray-800">{{ totalStudents + 12500 }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Total Enrollments</h3>
        <p class="text-3xl font-bold text-gray-800">{{ totalEnrollments + 35000 }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Active Courses</h3>
        <p class="text-3xl font-bold text-gray-800">{{ activeCourses }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Total Revenue</h3>
        <p class="text-3xl font-bold text-gray-800">${{ (totalRevenue + 45200).toLocaleString() }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Users</h2>
          <div class="text-gray-500 text-sm">
            Mocked data for recent signups...
          </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Sales</h2>
          <div class="text-gray-500 text-sm">
            Mocked data for recent purchases...
          </div>
      </div>
    </div>
  </div>
</template>
