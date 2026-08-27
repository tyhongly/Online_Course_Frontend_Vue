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
  <div class="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
    <!-- Thumbnail -->
    <router-link :to="`/course/${course.id}`" class="relative aspect-[1.65] overflow-hidden">
      <img :src="course.image" :alt="course.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div class="absolute top-2 left-2 bg-white/90 px-2 py-0.5 text-[9px] font-bold text-primary">
        {{ course.category }}
      </div>
    </router-link>
    
    <!-- Content -->
    <div class="p-3 flex flex-col flex-grow">
      <div class="text-[9px] text-primary font-medium mb-1">{{ course.category }}</div>
      
      <!-- Title -->
      <router-link :to="`/course/${course.id}`" class="text-xs font-bold font-heading leading-tight mb-3 hover:text-primary transition-colors line-clamp-2">
        {{ course.title }}
      </router-link>
      
      <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-2">
        <div class="flex items-center gap-1 text-[9px] text-dark-lighter">
          <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
          {{ course.rating }} ({{ course.reviews }})
        </div>
        <div class="flex items-center gap-1">
          <span class="text-sm font-bold text-primary">${{ course.price }}</span>
          <span class="text-[9px] text-dark-lighter line-through">${{ course.originalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
