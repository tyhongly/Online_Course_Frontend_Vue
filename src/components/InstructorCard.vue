<script setup>
import { Star, Facebook, Twitter, Linkedin, Instagram } from 'lucide-vue-next';

defineProps({
  instructor: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group text-center h-full flex flex-col p-6">
    <div class="relative mx-auto w-32 h-32 mb-6">
      <img :src="instructor.avatar" :alt="instructor.name" class="w-full h-full object-cover rounded-full border-4 border-light group-hover:border-primary/20 transition-colors" />
      <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-sm font-bold border border-gray-100">
        <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        {{ instructor.rating }}
      </div>
    </div>
    
    <h3 class="text-xl font-bold font-heading mb-1 hover:text-primary transition-colors">
      <a href="#">{{ instructor.name }}</a>
    </h3>
    <p class="text-sm font-medium text-primary mb-4">{{ instructor.specialty }}</p>
    
    <p class="text-dark-lighter text-sm mb-6 flex-grow">{{ instructor.bio }}</p>
    
    <div class="flex justify-center items-center gap-3 mb-6">
      <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
        <Facebook class="w-4 h-4" />
      </a>
      <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
        <Twitter class="w-4 h-4" />
      </a>
      <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
        <Linkedin class="w-4 h-4" />
      </a>
      <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
        <Instagram class="w-4 h-4" />
      </a>
    </div>
    
    <div class="border-t border-gray-100 pt-4 mt-auto flex justify-between items-center text-sm font-medium text-dark-lighter">
      <span>{{ instructor.students }} Students</span>
      <span>{{ instructor.courses }} Courses</span>
    </div>
  </div>
</template>
