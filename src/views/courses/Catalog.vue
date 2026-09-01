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
  <div class="bg-gray-50 min-h-screen pt-32 pb-10">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Course Catalog</h1>
        <p class="text-gray-500">Discover free document courses and expert video masterclasses.</p>
        
        <!-- Search and Category Filters -->
        <div class="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search courses..." 
            class="px-5 py-3 rounded-full border border-gray-300 w-full md:w-80 outline-none focus:border-primary shadow-sm"
          />
          <!-- <select v-model="selectedCategory" class="px-5 py-3 rounded-full border border-gray-300 outline-none focus:border-primary bg-white shadow-sm">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select> -->
        </div>

        <!-- Type Selector Tabs -->
        <div class="mt-6 flex items-center justify-center gap-2">
          <button 
            @click="selectedType = 'All'" 
            :class="['px-5 py-2 rounded-full text-sm font-semibold transition-colors', selectedType === 'All' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100']"
          >
            All Courses
          </button>
          <button 
            @click="selectedType = 'document'" 
            :class="['px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5', selectedType === 'document' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100']"
          >
            <FileText class="w-4 h-4" /> Free Documents
          </button>
          <button 
            @click="selectedType = 'video'" 
            :class="['px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5', selectedType === 'video' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100']"
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
                  <span class="font-bold text-lg text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider text-xs">FREE</span>
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
