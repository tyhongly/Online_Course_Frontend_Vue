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
  <div class="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full group rounded-xl">
    <!-- Thumbnail -->
    <router-link :to="`/course/${course.id}`" class="relative aspect-[1.65] overflow-hidden rounded-lg">
      <img :src="course.image" :alt="course.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute top-3 left-3 flex gap-2">
        <span class="bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-primary rounded-lg shadow-md">
          {{ course.category }}
        </span>
        <span
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg shadow-md',
            (course.type === 'document' || course.price === 0)
              ? 'bg-emerald-600 text-white'
              : 'bg-primary text-white'
          ]"
        >
          {{ (course.type === 'document' || course.price === 0) ? 'Free Document' : 'Video Course' }}
        </span>
      </div>
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
        </div>
      </div>
    </div>
  </div>
</template>
