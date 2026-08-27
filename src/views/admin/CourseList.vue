<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';

const router = useRouter();
const courses = computed(() => courseStore.courses);
const error = ref('');

onMounted(async () => {
  try {
    await courseStore.fetchCourses();
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to load courses.';
  }
});

const removeCourse = async (id) => {
  if (confirm('Are you sure you want to delete this course?')) {
    try {
      await courseStore.deleteCourse(id);
    } catch (requestError) {
      error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to delete course.';
    }
  }
};
</script>

<template>
  <div class="p-8">
    <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{{ error }}</div>
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Manage Courses</h1>
        <p class="text-gray-500 mt-2">Create, edit, and manage your course catalog.</p>
      </div>
      <router-link to="/admin/courses/new" class="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md">
        + Create Course
      </router-link>
    </header>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
            <th class="p-4 font-medium">Course Title</th>
            <th class="p-4 font-medium">Category</th>
            <th class="p-4 font-medium">Price</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="course in courses" :key="course.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-200 rounded-md overflow-hidden shrink-0">
                  <img :src="course.thumbnailUrl || course.image" alt="" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="font-bold text-gray-800 line-clamp-1 max-w-xs">{{ course.title }}</div>
                  <div class="text-xs text-gray-500">{{ course.lessons?.length || 0 }} lessons</div>
                </div>
              </div>
            </td>
            <td class="p-4 text-gray-600">{{ course.category }}</td>
            <td class="p-4 font-bold text-gray-800">${{ course.price }}</td>
            <td class="p-4">
              <span 
                :class="['px-3 py-1 rounded-full text-xs font-bold uppercase', course.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700']"
              >
                {{ course.status }}
              </span>
            </td>
            <td class="p-4 text-right">
              <div class="inline-flex items-center gap-2">
                <router-link :to="`/admin/courses/${course.id}/edit`" class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1">Edit</router-link>
                <button @click="removeCourse(course.id)" class="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">Delete</button>
              </div>
            </td>
          </tr>
          <tr v-if="courses.length === 0">
            <td colspan="5" class="p-8 text-center text-gray-500">No courses available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
