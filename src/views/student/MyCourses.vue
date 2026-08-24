<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';
import { courseStore } from '../../store/courseStore.js';

const router = useRouter();

const myEnrollments = computed(() => {
  if (!authStore.user) return [];
  return enrollmentStore.getUserEnrollments(authStore.user.id).map(en => {
    const course = courseStore.courses.find(c => c.id === en.courseId);
    return {
      ...course,
      progress: enrollmentStore.getCourseProgress(authStore.user.id, en.courseId, course?.lessons?.length || 0)
    };
  }).filter(c => c.id);
});

const completedCount = computed(() => myEnrollments.value.filter(c => c.progress === 100).length);

const downloadCertificate = (courseTitle) => {
  // Mock certificate download
  alert(`Downloading certificate for ${courseTitle}... (Imagine a beautiful PDF downloading)`);
};
</script>

<template>
  <div class="p-8 pb-24">
    
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-8 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full bg-white opacity-10"></div>
      <div class="absolute bottom-0 right-32 -mb-12 w-32 h-32 rounded-full bg-white opacity-10"></div>
      
      <div class="relative z-10">
        <h1 class="text-3xl font-bold font-heading mb-2">My Learning Journey</h1>
        <p class="text-primary-light max-w-lg">Pick up where you left off or discover new skills to level up your career.</p>
        
        <router-link to="/courses" class="inline-block mt-6 bg-white text-primary font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          Browse More Courses
        </router-link>
      </div>
      
      <!-- Optional illustration could go here -->
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Enrolled Courses</h3>
        <p class="text-3xl font-bold text-gray-800">{{ myEnrollments.length }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Completed Courses</h3>
        <p class="text-3xl font-bold text-gray-800">{{ completedCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 font-medium mb-1">Certificates Earned</h3>
        <p class="text-3xl font-bold text-gray-800">{{ completedCount }}</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="myEnrollments.length === 0" class="p-12 text-center text-gray-500">
        You are not enrolled in any courses yet.
        <div class="mt-4">
          <router-link to="/courses" class="text-primary font-bold hover:underline">Browse Courses</router-link>
        </div>
      </div>
      
      <div v-else class="divide-y divide-gray-100">
        <div v-for="course in myEnrollments" :key="course.id" class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6 flex-grow">
            <div class="w-full sm:w-40 aspect-video bg-gray-200 rounded-lg overflow-hidden shrink-0 shadow-sm relative">
              <img :src="course.image" :alt="course.title" class="w-full h-full object-cover" />
              <div v-if="course.progress === 100" class="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
                <div class="bg-white rounded-full p-2 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
            </div>
            <div class="flex-grow w-full max-w-lg">
              <h4 class="font-bold text-xl text-gray-800 mb-1 line-clamp-2">{{ course.title }}</h4>
              <p class="text-sm text-gray-500 mb-4">Instructor: {{ course.instructor }}</p>
              
              <div class="flex items-center gap-4">
                <div class="flex-grow bg-gray-200 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full transition-all duration-1000" :style="{ width: course.progress + '%' }"></div>
                </div>
                <span class="text-sm font-bold text-gray-700 w-12">{{ course.progress }}%</span>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col gap-2 shrink-0 sm:w-48">
            <button 
              @click="router.push(`/learn/${course.id}/lesson/${course.lessons[0]?.id || ''}`)"
              class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-center"
            >
              {{ course.progress === 0 ? 'Start Course' : (course.progress === 100 ? 'Review Course' : 'Continue Learning') }}
            </button>
            <button 
              v-if="course.progress === 100"
              @click="downloadCertificate(course.title)"
              class="w-full bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-center text-sm"
            >
              Download Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
