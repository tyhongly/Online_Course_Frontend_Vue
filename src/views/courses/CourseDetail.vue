<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import { authStore } from '../../store/authStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';

const route = useRoute();
const router = useRouter();

const courseId = Number(route.params.id);
const course = computed(() => courseStore.courses.find(c => c.id === courseId));

const isEnrolled = computed(() => {
  if (!authStore.user) return false;
  return !!enrollmentStore.getEnrollment(authStore.user.id, courseId);
});

const showPaymentModal = ref(false);

const handleEnrollment = () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  
  if (course.value.price > 0) {
    showPaymentModal.value = true;
  } else {
    enroll();
  }
};

const enroll = () => {
  enrollmentStore.enroll(authStore.user.id, courseId);
  showPaymentModal.value = false;
  router.push(`/learn/${courseId}/lesson/${course.value.lessons[0]?.id || ''}`);
};
</script>

<template>
  <div v-if="course" class="bg-gray-50 min-h-screen pb-20">
    <!-- Hero Header -->
    <div class="bg-dark text-white pt-20 pb-24 px-4 relative overflow-hidden">
      <img :src="course.image" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-gradient-to-r from-dark to-dark/50"></div>
      
      <div class="container mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div class="lg:w-2/3">
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-primary/20 text-primary px-3 py-1 text-sm font-bold rounded-full uppercase">{{ course.category }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">{{ course.title }}</h1>
          <p class="text-gray-300 text-lg mb-8 max-w-2xl">Master the skills you need to succeed. This comprehensive course will take you from beginner to advanced.</p>
          
          <div class="flex flex-wrap items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-lg">{{ course.rating }}</span>
              <span class="text-gray-400">({{ course.reviews }} reviews)</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="font-bold">{{ course.students }}</span> students
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="font-bold">{{ course.lessons?.length || 0 }}</span> lessons
            </div>
          </div>
        </div>
        
        <!-- Action Card -->
        <div class="lg:w-1/3 w-full">
          <div class="bg-white rounded-2xl shadow-2xl p-6 text-dark max-w-sm mx-auto">
            <img :src="course.image" alt="" class="w-full aspect-video object-cover rounded-xl mb-6 shadow-sm" />
            
            <div class="text-3xl font-bold text-gray-800 mb-6 flex items-end gap-2">
              ${{ course.price }}
              <span v-if="course.originalPrice" class="text-lg text-gray-400 line-through font-normal">${{ course.originalPrice }}</span>
            </div>
            
            <button 
              v-if="isEnrolled" 
              @click="router.push(`/learn/${course.id}/lesson/${course.lessons[0]?.id || ''}`)" 
              class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Go to Course
            </button>
            <button 
              v-else 
              @click="handleEnrollment" 
              class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Enroll Now
            </button>
            
            <p class="text-center text-sm text-gray-500 mt-4 font-medium">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Course Content Details (Mocked Layout) -->
    <div class="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div v-for="(lesson, idx) in course.lessons" :key="lesson.id" class="p-4 flex items-center justify-between hover:bg-gray-50">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                {{ idx + 1 }}
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ lesson.title }}</h4>
                <p class="text-xs text-gray-500 uppercase font-medium mt-1">{{ lesson.type }}</p>
              </div>
            </div>
          </div>
          <div v-if="!course.lessons || course.lessons.length === 0" class="p-8 text-center text-gray-500">
            No lessons uploaded yet.
          </div>
        </div>
      </div>
      
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Instructor</h2>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <img :src="course.instructorAvatar" alt="" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20" />
          <h3 class="font-bold text-xl text-gray-800">{{ course.instructor }}</h3>
          <p class="text-gray-500 text-sm mt-2">Expert Instructor & Professional</p>
        </div>
      </div>
    </div>

    <!-- Mock Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-dark/70 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Complete Checkout</h2>
        <p class="text-gray-500 mb-6">Total to pay: <span class="font-bold text-dark">${{ course.price }}</span></p>
        
        <div class="space-y-4 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input type="text" placeholder="**** **** **** ****" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <div class="flex gap-4">
            <div class="w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
              <input type="text" placeholder="MM/YY" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
            </div>
            <div class="w-1/2">
              <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input type="text" placeholder="***" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
            </div>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button @click="showPaymentModal = false" class="flex-1 px-4 py-3 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50">Cancel</button>
          <button @click="enroll" class="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-md">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>
