<script setup>
import { courses } from '../data/index.js';
import CourseCard from './CourseCard.vue';

const popularCourses = courses.slice(0, 4);
</script>

<template>
  <section id="courses" class="py-16 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <!-- Header -->
      <div class="flex items-start justify-between gap-6 mb-8">
        <div class="max-w-2xl">
          <h2 class="text-2xl md:text-3xl font-bold font-heading mb-2">Popular Courses</h2>
          <p class="text-sm text-dark-lighter">Top-rated selections from our community.</p>
        </div>

        <router-link to="/courses" class="shrink-0 border border-gray-200 bg-white px-3 py-2 text-[10px] font-semibold text-dark hover:border-primary hover:text-primary transition-colors">
          Browse All Courses
        </router-link>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CourseCard 
          v-for="course in popularCourses" 
          :key="course.id" 
          :course="course" 
        />
      </div>

    </div>
  </section>
</template>
