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
      <div class="absolute top-2 left-2 flex gap-1">
        <span class="bg-white/95 px-2 py-0.5 text-[9px] font-bold text-primary rounded">
          {{ course.category }}
        </span>
        <span 
          :class="[
            'px-2 py-0.5 text-[9px] font-bold rounded',
            (course.type === 'document' || course.price === 0)
              ? 'bg-emerald-500 text-white' 
              : 'bg-primary text-white'
          ]"
        >
          {{ (course.type === 'document' || course.price === 0) ? 'Free Document' : 'Video Course' }}
        </span>
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
          <template v-if="course.type === 'document' || course.price === 0">
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">FREE</span>
          </template>
          <template v-else>
            <span class="text-sm font-bold text-primary">${{ course.price }}</span>
            <span v-if="course.originalPrice" class="text-[9px] text-dark-lighter line-through">${{ course.originalPrice }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
