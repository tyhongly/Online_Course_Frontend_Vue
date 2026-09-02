<script setup>
import { ref, computed } from 'vue';
import { Heart, FileText, Video } from 'lucide-vue-next';
import { courseStore } from '../../store/courseStore.js';
import { wishlistStore } from '../../store/wishlistStore.js';

const searchQuery = ref('');
const selectedCategory = ref('All');
const selectedType = ref('All'); // 'All' | 'document' | 'video'

const categories = computed(() => ['All', ...new Set(courseStore.courses.map(c => c.category).filter(Boolean))]);

const filteredCourses = computed(() => {
  let result = courseStore.courses.filter(c => c.status === 'live' || !c.status || c.published !== false);
  if (selectedCategory.value !== 'All') {
    result = result.filter(c => c.category === selectedCategory.value);
  }
  if (selectedType.value !== 'All') {
    result = result.filter(c => {
      if (selectedType.value === 'document') return c.type === 'document' || Number(c.price) === 0;
      if (selectedType.value === 'video') return c.type === 'video' && Number(c.price) > 0;
      return true;
    });
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim();
    result = result.filter(c => c.title?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q));
  }
  return result;
});

const toggleWishlist = (courseId) => {
  wishlistStore.toggle(courseId);
};
</script>

<template>
  <div class="bg-white min-h-screen pt-32 pb-16">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-dark mb-4 font-heading">Course Catalog</h1>
        <p class="text-lg md:text-xl text-dark-lighter">Discover free document courses and expert video masterclasses tailored to your learning goals.</p>
        
        <!-- Search and Category Filters -->
        <div class="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search courses by name or category..." 
            class="px-6 py-3.5 rounded-lg border-2 border-gray-200 w-full md:w-96 outline-none focus:border-primary shadow-sm text-base font-medium transition-colors"
          />
        </div>

        <!-- Type Selector Tabs -->
        <div class="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <button 
            @click="selectedType = 'All'" 
            :class="['px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-md', selectedType === 'All' ? 'bg-primary text-white shadow-lg' : 'bg-light text-dark border-2 border-gray-200 hover:border-primary hover:text-primary']"
          >
            All Courses
          </button>
          <button 
            @click="selectedType = 'document'" 
            :class="['px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2', selectedType === 'document' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-light text-dark border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-600']"
          >
            <FileText class="w-4 h-4" /> Free Documents
          </button>
          <button 
            @click="selectedType = 'video'" 
            :class="['px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2', selectedType === 'video' ? 'bg-primary text-white shadow-lg' : 'bg-light text-dark border-2 border-gray-200 hover:border-primary hover:text-primary']"
          >
            <Video class="w-4 h-4" /> Video Courses
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <router-link 
          v-for="course in filteredCourses" 
          :key="course.id"
          :to="'/course/' + course.id" 
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
        >
          <div class="relative overflow-hidden aspect-video">
            <img :src="course.image" :alt="course.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-4 left-4 flex gap-1.5 flex-wrap">
              <span class="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
                {{ course.category }}
              </span>
              <span 
                :class="[
                  'text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm',
                  (course.type === 'document' || course.price === 0) ? 'bg-emerald-600' : 'bg-primary'
                ]"
              >
                {{ (course.type === 'document' || course.price === 0) ? 'Free Document' : 'Video' }}
              </span>
            </div>
            <button
              type="button"
              @click.stop.prevent="toggleWishlist(course.id)"
              :aria-label="wishlistStore.isWishlisted(course.id) ? 'Remove from wishlist' : 'Add to wishlist'"
              class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-rose-500 shadow-sm transition hover:bg-rose-50"
            >
              <Heart class="h-5 w-5" :class="wishlistStore.isWishlisted(course.id) ? 'fill-current' : ''" />
            </button>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="font-bold text-lg text-gray-800 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
              {{ course.title }}
            </h3>
            
            <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <div class="flex items-center gap-1 text-amber-500">
                <span class="font-bold text-sm">{{ course.rating }}</span>
                <span class="text-xs text-gray-400">({{ course.reviews }})</span>
              </div>
              <div>
                <template v-if="course.type === 'document' || course.price === 0">
                  <span class="font-bold text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide">FREE</span>
                </template>
                <template v-else>
                  <span class="font-bold text-xl text-primary">${{ course.price }}</span>
                </template>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      
      <div v-if="filteredCourses.length === 0" class="text-center py-20 text-gray-500">
        No courses found matching your criteria.
      </div>
    </div>
  </div>
</template>
