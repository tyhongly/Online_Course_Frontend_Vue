<script setup>
import { computed } from 'vue';
import { ArrowRight, Heart, Trash2 } from 'lucide-vue-next';
import { courseStore } from '../../store/courseStore.js';
import { wishlistStore, wishlistCount } from '../../store/wishlistStore.js';

const courses = computed(() => courseStore.courses.filter((course) => wishlistStore.isWishlisted(course.id)));

const removeCourse = (courseId) => {
  wishlistStore.remove(courseId);
};
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] sm:p-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
            <Heart class="h-3.5 w-3.5 fill-current" />
            Saved courses
          </div>
          <h1 class="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">My Wishlist</h1>
          <p class="mt-2 text-sm leading-7 text-slate-600">Keep the courses you want to explore next close at hand.</p>
        </div>
        <div class="text-sm font-medium text-slate-500">{{ wishlistCount }} saved {{ wishlistCount === 1 ? 'course' : 'courses' }}</div>
      </div>
    </section>

    <section v-if="courses.length" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="course in courses" :key="course.id" class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)]">
        <router-link :to="`/course/${course.id}`" class="group block">
          <div class="relative aspect-video overflow-hidden bg-slate-100">
            <img :src="course.image" :alt="course.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-700">{{ course.category }}</span>
          </div>
          <div class="p-5">
            <h2 class="line-clamp-2 text-lg font-semibold leading-7 text-slate-950 group-hover:text-indigo-600">{{ course.title }}</h2>
            <p class="mt-2 text-sm text-slate-500">{{ course.instructor }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span class="text-xl font-bold text-indigo-600">${{ course.price }}</span>
              <span class="inline-flex items-center gap-1 text-sm font-semibold text-slate-600">View course <ArrowRight class="h-4 w-4" /></span>
            </div>
          </div>
        </router-link>
        <div class="border-t border-slate-100 px-5 py-3">
          <button @click="removeCourse(course.id)" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-rose-600">
            <Trash2 class="h-4 w-4" />
            Remove from wishlist
          </button>
        </div>
      </article>
    </section>

    <section v-else class="rounded-[32px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <Heart class="h-6 w-6" />
      </div>
      <h2 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Your wishlist is empty</h2>
      <p class="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">Save courses from the catalog when you find something you want to learn later.</p>
      <router-link to="/courses" class="mt-7 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        Browse courses
        <ArrowRight class="h-4 w-4" />
      </router-link>
    </section>
  </div>
</template>
