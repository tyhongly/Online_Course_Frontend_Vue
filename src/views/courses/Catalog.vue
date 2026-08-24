<script setup>
import { ref, computed } from 'vue';
import { courseStore } from '../../store/courseStore.js';

const searchQuery = ref('');
const selectedCategory = ref('All');

const categories = ['All', ...new Set(courseStore.courses.map(c => c.category))];

const filteredCourses = computed(() => {
  let result = courseStore.courses.filter(c => c.status === 'live');
  if (selectedCategory.value !== 'All') {
    result = result.filter(c => c.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
  }
  return result;
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-10">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Course Catalog</h1>
        <p class="text-gray-500">Discover your next skill with our expert-led courses.</p>
        
        <div class="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search courses or instructors..." 
            class="px-5 py-3 rounded-full border border-gray-300 w-full md:w-96 outline-none focus:border-primary shadow-sm"
          />
          <select v-model="selectedCategory" class="px-5 py-3 rounded-full border border-gray-300 outline-none focus:border-primary bg-white shadow-sm">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
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
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
              {{ course.category }}
            </div>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {{ course.title }}
            </h3>
            
            <div class="flex items-center gap-2 mb-4 mt-auto">
              <img :src="course.instructorAvatar" alt="" class="w-8 h-8 rounded-full object-cover" />
              <span class="text-sm font-medium text-gray-600">{{ course.instructor }}</span>
            </div>
            
            <div class="flex items-center justify-between border-t border-gray-100 pt-4">
              <div class="flex items-center gap-1 text-amber-500">
                <span class="font-bold text-sm">{{ course.rating }}</span>
                <span class="text-xs text-gray-400">({{ course.reviews }})</span>
              </div>
              <div class="font-bold text-xl text-primary">
                ${{ course.price }}
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
