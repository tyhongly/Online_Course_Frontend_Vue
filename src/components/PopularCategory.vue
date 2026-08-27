<script setup>
import { popularCategories } from '../data/index.js';
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-start justify-between gap-6 mb-8">
        <div class="max-w-2xl">
          <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Explore Categories</span>
          <h2 class="text-2xl md:text-3xl font-bold font-heading mb-2">Find the right course for you</h2>
          <p class="text-sm text-dark-lighter">Browse our most popular learning paths.</p>
        </div>

        <router-link to="/courses" class="shrink-0 border border-gray-200 bg-white px-3 py-2 text-[10px] font-semibold text-dark hover:border-primary hover:text-primary transition-colors">
          View All Categories
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="category in popularCategories"
          :key="category.id"
          to="/courses"
          class="group relative overflow-hidden min-h-52 bg-dark"
        >
          <img
            :src="category.image"
            :alt="`${category.name} courses`"
            class="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-300 group-hover:scale-105 group-hover:opacity-60"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="relative flex min-h-52 flex-col justify-end p-5 text-white">
            <span class="mb-2 self-start rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-dark">
              {{ category.badge }}
            </span>
            <h3 class="text-xl font-bold font-heading">{{ category.name }}</h3>
            <p class="mt-1 text-sm text-white/80">{{ category.courses }} courses</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
