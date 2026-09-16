<script setup>
import { computed, onMounted } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { courseStore } from '../store/courseStore.js';
import CatalogCourseCard from './CatalogCourseCard.vue';

const latestCourses = computed(() => [...courseStore.courses]
  .sort((first, second) => {
    const firstDate = new Date(first.createdAt || first.created_at || 0).getTime();
    const secondDate = new Date(second.createdAt || second.created_at || 0).getTime();
    return secondDate - firstDate || Number(second.id || 0) - Number(first.id || 0);
  })
  .slice(0, 4));

onMounted(async () => {
  if (courseStore.courses.length) return;

  try {
    await courseStore.fetchCourses();
  } catch (error) {
    console.error('Unable to load latest courses from API:', error);
  }
});
</script>

<template>
  <section class="bg-light-dark py-24">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <div class="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div class="max-w-2xl">
          <span class="mb-4 block text-sm font-bold uppercase tracking-wider text-primary">Latest Courses</span>
          <h2 class="mb-3 text-3xl font-bold text-dark md:text-4xl lg:text-5xl">Start learning something new</h2>
          <p class="text-base text-dark-lighter md:text-lg">Explore the newest courses added to our learning community.</p>
        </div>
        <router-link to="/courses" class="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white">
          View all courses
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>

      <div v-if="latestCourses.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CatalogCourseCard v-for="course in latestCourses" :key="course.id" :course="course" />
      </div>
      <p v-else class="py-12 text-center text-dark-lighter">No courses available yet.</p>
    </div>
  </section>
</template>
