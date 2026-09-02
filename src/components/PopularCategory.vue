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
      </div>
    </div>
  </section>
</template>
