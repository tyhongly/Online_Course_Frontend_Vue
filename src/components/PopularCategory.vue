<script setup>
import { popularCategories } from '../data/index.js';
import PopularCategoryCard from './PopularCategoryCard.vue';
</script>

<template>
  <section class="py-20 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <span class="mb-3 block text-sm font-medium uppercase tracking-wider text-primary">Popular Categories</span>
          <h2 class="mb-3 text-3xl font-bold font-heading md:text-4xl">Find the right learning path</h2>
          <p class="text-sm text-dark-lighter">Browse our most popular subjects and jump into a focused track.</p>
          <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Explore Categories</span>
          <h2 class="text-2xl md:text-3xl font-bold font-heading mb-2">Find the right Category for you</h2>
          <p class="text-sm text-dark-lighter">Browse our most popular learning paths.</p>
        </div>

        <router-link
          to="/categories"
          class="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
        >
          View All Categories
        </router-link>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <PopularCategoryCard
          v-for="category in popularCategories"
          :key="category.id"
          :category="category"
        />
  <section class="py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        <div class="max-w-2xl">
          <span class="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Explore Categories</span>
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-3 text-dark">Find the Right Category for You</h2>
          <p class="text-base md:text-lg text-dark-lighter">Browse our most popular learning paths and discover your next skill.</p>
        </div>

        <router-link to="/courses" class="shrink-0 border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md whitespace-nowrap">
          View All Categories →
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          v-for="category in popularCategories"
          :key="category.id"
          to="/courses"
          class="group relative overflow-hidden min-h-64 bg-dark rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <img
            :src="category.image"
            :alt="`${category.name} courses`"
            class="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-110 group-hover:opacity-70"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div class="relative flex min-h-64 flex-col justify-end p-6 text-white">
            <span class="mb-3 self-start rounded-full bg-white/95 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-md">
              {{ category.badge }}
            </span>
            <h3 class="text-2xl font-bold font-heading mb-2">{{ category.name }}</h3>
            <p class="text-base text-white/90 font-medium">{{ category.courses }} courses available</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
