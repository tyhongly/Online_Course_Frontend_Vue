<script setup>
import { ArrowRight, BookOpen } from 'lucide-vue-next';

defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link
    to="/categories"
    class="group flex h-full flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(15,23,42,0.3)]"
  >
    <div class="relative isolate h-48 overflow-hidden">
      <img
        :src="category.image"
        :alt="`${category.name} learning category`"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>

      <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 backdrop-blur">
          {{ category.badge }}
        </span>
        <span
          :class="[
            'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-sm font-black text-white backdrop-blur',
            category.iconBg,
            category.iconColor
          ]"
        >
          {{ category.name.charAt(0) }}
        </span>
      </div>

      <div class="absolute inset-x-0 bottom-0 p-4 text-white">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
          Popular category
        </p>
        <h3 class="mt-1 text-2xl font-bold leading-tight">
          {{ category.name }}
        </h3>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-slate-500">Courses available</p>
          <p class="mt-1 text-3xl font-bold text-slate-900">
            {{ category.courses }}
          </p>
        </div>

        <div :class="['flex h-12 w-12 items-center justify-center rounded-2xl', category.iconBg, category.iconColor]">
          <BookOpen class="h-5 w-5" />
        </div>
      </div>

      <p class="mt-4 text-sm leading-relaxed text-slate-500">
        Discover curated learning paths in {{ category.name.toLowerCase() }}.
      </p>

      <div class="mt-auto pt-5">
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
          Explore category
          <ArrowRight class="h-4 w-4" />
        </span>
      </div>
    </div>
  </router-link>
</template>
