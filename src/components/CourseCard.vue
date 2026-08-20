<script setup>
import { Star, BookOpen, Clock, Users } from 'lucide-vue-next';

defineProps({
  course: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
    <!-- Thumbnail -->
    <div class="relative h-56 overflow-hidden">
      <img :src="course.image" :alt="course.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
        {{ course.category }}
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Price & Rating -->
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold text-accent">${{ course.price }}</span>
          <span class="text-sm text-dark-lighter line-through">${{ course.originalPrice }}</span>
        </div>
        <div class="flex items-center gap-1 text-sm font-medium text-dark-lighter">
          <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
          {{ course.rating }} ({{ course.reviews }})
        </div>
      </div>
      
      <!-- Title -->
      <a href="#" class="text-xl font-bold font-heading mb-4 hover:text-primary transition-colors line-clamp-2">
        {{ course.title }}
      </a>
      
      <!-- Instructor -->
      <div class="flex items-center gap-3 mb-6 mt-auto border-t border-gray-100 pt-4">
        <img :src="course.instructorAvatar" :alt="course.instructor" class="w-10 h-10 rounded-full object-cover" />
        <span class="font-medium text-dark">{{ course.instructor }}</span>
      </div>
      
      <!-- Meta info -->
      <div class="flex items-center justify-between text-sm text-dark-lighter border-t border-gray-100 pt-4">
        <div class="flex items-center gap-1">
          <BookOpen class="w-4 h-4 text-primary" />
          <span>{{ course.lessons }} Lessons</span>
        </div>
        <div class="flex items-center gap-1">
          <Clock class="w-4 h-4 text-primary" />
          <span>{{ course.duration }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Users class="w-4 h-4 text-primary" />
          <span>{{ course.students }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
