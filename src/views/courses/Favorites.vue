<script setup>
import { computed } from 'vue';
import { Heart } from 'lucide-vue-next';
import CatalogCourseCard from '../../components/CatalogCourseCard.vue';
import { courseStore } from '../../store/courseStore.js';
import { wishlistStore, wishlistCount } from '../../store/wishlistStore.js';
import { isTechnologyCourse } from '../../utils/technologyContent.js';

const normalizeCourse = (course) => ({
  ...course,
  category: course.category || course.categoryName || 'General',
  type: course.type || (Number(course.price) === 0 ? 'document' : 'video'),
  image: course.thumbnailUrl || course.image || '',
  rating: Number(course.rating) || 0,
  reviews: Number(course.reviews) || 0,
  duration: course.duration || 'Self paced'
});

const favoriteCourses = computed(() => courseStore.courses
  .filter((course) => course.published !== false && course.status !== 'draft' && isTechnologyCourse(course))
  .filter((course) => wishlistStore.isWishlisted(course.id))
  .map(normalizeCourse));
</script>

<template>
  <main class="min-h-screen bg-[#f7f9fd] px-4 pb-16 pt-28 text-slate-900 md:px-6 md:pt-32">
    <div class="mx-auto max-w-7xl">
      <section class="max-w-3xl">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
          <Heart class="h-3.5 w-3.5 fill-current" />
          {{ wishlistCount }} saved {{ wishlistCount === 1 ? 'course' : 'courses' }}
        </div>
        <h1 class="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Favorite Courses</h1>
        <p class="mt-3 text-base leading-7 text-slate-500 md:text-lg">Courses you've saved for later.</p>
      </section>

      <section v-if="favoriteCourses.length" class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <CatalogCourseCard v-for="course in favoriteCourses" :key="course.id" :course="course" />
      </section>

      <section v-else class="mt-10 rounded-[2rem] border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
          <Heart class="h-8 w-8" />
        </div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-slate-950">No favorite courses yet</h2>
        <p class="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">Explore our courses and save the ones you like.</p>
        <router-link to="/courses" class="mt-7 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md">
          Browse Courses
        </router-link>
      </section>
    </div>
  </main>
</template>
