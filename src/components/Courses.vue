<script setup>
import { courses } from '../data/index.js';
import CourseCard from './CourseCard.vue';

const popularCourses = courses.slice(0, 4);
</script>

<template>
  <section id="courses" class="py-24 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-3 text-dark">Popular Courses</h2>
          <p class="text-base md:text-lg text-dark-lighter">Discover our top-rated selections from our learning community.</p>
        </div>

        <router-link to="/courses" class="shrink-0 border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md">
          Browse All Courses →
        </router-link>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CourseCard 
          v-for="course in popularCourses" 
          :key="course.id" 
          :course="course" 
        />
      </div>

    </div>
  </section>
</template>
