<script setup>
import { ref, computed } from 'vue';
import { courses } from '../data/index.js';
import CourseCard from './CourseCard.vue';
import { ArrowRight } from 'lucide-vue-next';

const activeTab = ref('All Courses');
const tabs = ['All Courses', 'Design', 'Business', 'Development'];

const filteredCourses = computed(() => {
  if (activeTab.value === 'All Courses') return courses;
  return courses.filter(course => course.category === activeTab.value);
});
</script>

<template>
  <section id="courses" class="py-20 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <!-- Header & Tabs -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div class="max-w-2xl">
          <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Top Class Courses</span>
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Explore Our World's Best Courses</h2>
          <p class="text-dark-lighter">Choose from over 100,000 online video courses with new additions published every month.</p>
        </div>
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-5 py-2.5 rounded-full font-medium text-sm transition-all',
              activeTab === tab 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-dark-lighter hover:bg-light border border-gray-100 hover:text-primary'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Course Grid -->
      <transition-group 
        name="list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        <CourseCard 
          v-for="course in filteredCourses" 
          :key="course.id" 
          :course="course" 
        />
      </transition-group>

      <!-- CTA -->
      <div class="text-center">
        <a href="#" class="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-colors shadow-sm">
          See All Courses <ArrowRight class="w-5 h-5" />
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
