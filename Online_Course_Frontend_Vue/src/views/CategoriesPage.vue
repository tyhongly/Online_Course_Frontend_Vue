<script setup>
import { computed, ref } from 'vue';
import { ChevronRight, Search } from 'lucide-vue-next';
import { categories } from '../data/categories.js';

const searchQuery = ref('');

const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return categories;

  return categories.filter((category) =>
    category.name.toLowerCase().includes(query) ||
    category.desc.toLowerCase().includes(query)
  );
});
</script>

<template>
  <main class="min-h-screen bg-light pb-20 pt-28">
    <div class="container mx-auto px-4 md:px-6">
      <header class="mx-auto mb-12 max-w-2xl text-center">
        <span class="mb-3 block text-sm font-medium uppercase tracking-wider text-primary">Explore categories</span>
        <h1 class="mb-3 font-heading text-3xl font-bold text-dark md:text-4xl">Choose a learning path</h1>
        <p class="text-dark-lighter">Browse focused topics and find courses that match your goals.</p>

        <div class="relative mt-8 text-left">
          <Search class="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-lighter" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search categories..."
            aria-label="Search categories"
            class="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-5 text-dark shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </header>

      <section v-if="filteredCategories.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Course categories">
        <router-link
          v-for="category in filteredCategories"
          :key="category.slug"
          :to="{ name: 'Category', params: { slug: category.slug } }"
          class="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
            {{ category.icon }}
          </span>
          <span class="min-w-0 flex-1">
            <span class="mb-1 block font-heading text-lg font-bold text-dark transition-colors group-hover:text-primary">
              {{ category.name }}
            </span>
            <span class="block text-sm leading-relaxed text-dark-lighter">{{ category.desc }}</span>
          </span>
          <ChevronRight class="mt-4 h-5 w-5 shrink-0 text-dark-lighter transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </router-link>
      </section>

      <div v-else class="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
        <h2 class="font-heading text-xl font-bold text-dark">No categories found</h2>
        <p class="mt-2 text-dark-lighter">Try a different search term.</p>
      </div>
    </div>
  </main>
</template>
