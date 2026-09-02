<script setup>
import { Star } from 'lucide-vue-next';

defineProps({
  course: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link
    :to="`/course/${course.id}`"
    class="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-35px_rgba(15,23,42,0.28)]"
  >
    <div class="relative aspect-[1.45] overflow-hidden bg-slate-100">
      <img
        :src="course.image"
        :alt="course.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent"></div>
      <div class="absolute left-4 top-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur">
  <div class="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
    <!-- Thumbnail -->
    <router-link :to="`/course/${course.id}`" class="relative aspect-[1.65] overflow-hidden rounded-lg">
      <img :src="course.image" :alt="course.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute top-3 left-3 flex gap-2">
        <span class="bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-primary rounded-lg shadow-md">
          {{ course.category }}
        </span>
        <span
          :class="[
<<<<<<< HEAD
            'rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm',
=======
            'px-3 py-1.5 text-xs font-bold rounded-lg shadow-md',
>>>>>>> origin/develop
            (course.type === 'document' || course.price === 0)
              ? 'bg-emerald-600'
              : 'bg-primary'
          ]"
        >
          {{ (course.type === 'document' || course.price === 0) ? 'Free Document' : 'Video Course' }}
        </span>
      </div>
<<<<<<< HEAD
    </div>

    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
        {{ course.category }}
      </p>

      <h3 class="mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary">
        {{ course.title }}
      </h3>

      <div class="mt-5 flex items-center gap-4 text-sm text-slate-500">
        <span class="inline-flex items-center gap-1.5">
          <Star class="h-4 w-4 fill-amber-400 text-amber-400" />
          <span class="font-semibold text-slate-700">{{ course.rating }}</span>
          <span>({{ course.reviews }})</span>
        </span>
        <span v-if="course.lessons" class="text-slate-400">
          {{ course.lessons }} lessons
        </span>
      </div>

      <div class="mt-auto flex items-end justify-between border-t border-slate-100 pt-5">
        <div class="text-sm text-slate-500">
          <p v-if="course.duration" class="font-medium text-slate-700">{{ course.duration }}</p>
          <p v-else>Self-paced learning</p>
        </div>

        <div class="text-right">
          <template v-if="course.type === 'document' || course.price === 0">
            <span class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              FREE
            </span>
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold text-primary">${{ course.price }}</span>
              <span v-if="course.originalPrice" class="text-sm text-slate-400 line-through">
                ${{ course.originalPrice }}
              </span>
            </div>
          </template>
=======
    </router-link>
    
    <!-- Content -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title -->
      <router-link :to="`/course/${course.id}`" class="text-base font-bold font-heading leading-snug mb-2 hover:text-primary transition-colors line-clamp-2">
        {{ course.title }}
      </router-link>
      
      <div class="mt-auto space-y-3">
        <!-- Rating -->
        <div class="flex items-center gap-1.5 text-sm text-dark-lighter">
          <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
          <span class="font-semibold text-dark">{{ course.rating }}</span>
          <span class="text-xs">({{ course.reviews }} reviews)</span>
        </div>
        
        <!-- Price -->
        <div class="border-t border-gray-200 pt-3 flex items-center justify-between">
          <div>
            <template v-if="course.type === 'document' || course.price === 0">
              <span class="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full inline-block uppercase tracking-wide">FREE</span>
            </template>
            <template v-else>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary">${{ course.price }}</span>
                <span v-if="course.originalPrice" class="text-xs text-dark-lighter line-through opacity-70">${{ course.originalPrice }}</span>
              </div>
            </template>
          </div>
>>>>>>> origin/develop
        </div>
      </div>
    </div>
  </router-link>
</template>
