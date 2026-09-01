<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import { authStore } from '../../store/authStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';
import { wishlistStore } from '../../store/wishlistStore.js';
import { Heart, FileText, Video, CheckCircle2, ShieldCheck } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const courseId = Number(route.params.id);
const course = computed(() => courseStore.courses.find(c => c.id === courseId));

const isDocument = computed(() => course.value?.type === 'document' || course.value?.price === 0);

const isEnrolled = computed(() => {
  if (!authStore.user) return false;
  return !!enrollmentStore.getEnrollment(authStore.user.id, courseId);
});

const toggleWishlist = () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  wishlistStore.toggle(courseId);
};

const handleFreeEnrollment = () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  
  enrollmentStore.enroll(authStore.user.id, courseId);
  router.push(`/learn/${courseId}/lesson/${course.value.lessons[0]?.id || ''}`);
};

const telegramAdminUrl = 'https://t.me/tosrean_admin';
</script>

<template>
  <div v-if="course" class="bg-gray-50 min-h-screen pb-20">
    <!-- Hero Header -->
    <div class="bg-whute text-black pt-20 pb-24 px-4 relative overflow-hidden">
      <!-- <img :src="course.image" class="absolute inset-0 w-full h-full object-cover opacity-20" /> -->
      <div class="absolute inset-0 "></div>
      <!-- bg-gradient-to-r from-dark to-dark/50 -->
      <div class="container mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div class="lg:w-2/3">
          <div class="flex items-center gap-2 mb-4 flex-wrap">
            <span class="bg-primary/20 text-primary px-3 py-1 text-sm font-bold rounded-full uppercase">{{ course.category }}</span>
            <span 
              :class="[
                'px-3 py-1 text-sm font-bold rounded-full uppercase',
                isDocument ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'
              ]"
            >
              {{ isDocument ? 'Free Document Course' : 'Video Course' }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">{{ course.title }}</h1>
          <p class="text-gray-600 text-lg mb-8 max-w-2xl">
            {{ isDocument ? 'Read and learn from comprehensive document lessons and practical guides.' : 'Master practical skills with in-depth video walkthroughs and expert demonstrations.' }}
          </p>
          
          <!-- <div class="flex flex-wrap items-center gap-6 text-sm">
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
          </div> -->
        </div>
        
        <!-- Action Card -->
        <div class="lg:w-1/3 w-full">
          <div class="bg-white rounded-2xl shadow-2xl p-6 text-dark max-w-sm mx-auto">
            <img :src="course.image" alt="" class="w-full aspect-video object-cover rounded-xl mb-6 shadow-sm" />
            
            <!-- Price Display -->
            <div class="mb-6">
              <template v-if="isDocument">
                <div class="flex items-baseline gap-2">
                  <span class="text-4xl font-extrabold text-emerald-600">FREE</span>
                  <span class="text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">100% Free Access</span>
                </div>
              </template>
              <template v-else>
                <div class="text-3xl font-bold text-gray-800 flex items-end gap-2">
                  ${{ course.price }}
                  <span v-if="course.originalPrice" class="text-lg text-gray-400 line-through font-normal">${{ course.originalPrice }}</span>
                </div>
                <p class="text-xs text-primary font-medium mt-1">Video Course • Admin Access</p>
              </template>
            </div>
                        <!-- Primary Action Button -->
            <!-- Case 1: Already Enrolled -->
            <button 
              v-if="isEnrolled" 
              @click="router.push(`/learn/${course.id}/lesson/${course.lessons[0]?.id || ''}`)" 
              class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              Continue Learning
            </button>
            
            <!-- Case 2: Document Course (Free Instant Enrollment) -->
            <button 
              v-else-if="isDocument" 
              @click="handleFreeEnrollment" 
              class="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <FileText class="w-5 h-5" /> Start Learning
            </button>

            <!-- Case 3: Video Course (Contact Admin via Telegram) -->
            <div v-else class="space-y-3">
              <a 
                :href="telegramAdminUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="w-full bg-[#229ED9] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <!-- Telegram SVG Icon -->
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Contact For Enroll
              </a>
              <p class="text-xs text-gray-500 text-center leading-relaxed">
                Contact our admin on Telegram to purchase and unlock access to this video course.
              </p>
            </div>

            <button
              type="button"
              @click="toggleWishlist"
              class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700"
            >
              <Heart class="h-4 w-4" :class="wishlistStore.isWishlisted(course.id) ? 'fill-current text-rose-500' : ''" />
              {{ wishlistStore.isWishlisted(course.id) ? 'Saved to Wishlist' : 'Add to Wishlist' }}
            </button>
            
            <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
              <ShieldCheck class="w-4 h-4 text-emerald-500" />
              <span>Full Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Course Content Details -->
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
      
      <!-- Course Features & Highlights Sidebar -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Course Overview</h2>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800 text-sm">Course Format</h4>
              <p class="text-gray-500 text-xs mt-0.5">{{ isDocument ? 'Structured text & document modules' : 'Video lectures & interactive exercises' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800 text-sm">Access Type</h4>
              <p class="text-gray-500 text-xs mt-0.5">{{ isDocument ? '100% Free Forever' : 'Paid via Admin Contact' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800 text-sm">Pacing</h4>
              <p class="text-gray-500 text-xs mt-0.5">Self-paced learning anytime, anywhere</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800 text-sm">Certificate</h4>
              <p class="text-gray-500 text-xs mt-0.5">Completion badge on your dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
