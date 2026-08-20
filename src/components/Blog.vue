<script setup>
import { blogs } from '../data/index.js';
import { Calendar, User } from 'lucide-vue-next';
</script>

<template>
  <section class="py-20 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Latest Articles</span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Our Latest News Feed</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="blog in blogs" 
          :key="blog.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
        >
          <div class="relative h-48 overflow-hidden">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
              {{ blog.category }}
            </div>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-4 text-xs text-dark-lighter mb-3">
              <div class="flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5" />
                {{ blog.date }}
              </div>
              <div class="flex items-center gap-1">
                <User class="w-3.5 h-3.5" />
                {{ blog.author }}
              </div>
            </div>
            
            <h3 class="text-lg font-bold font-heading mb-4 hover:text-primary transition-colors line-clamp-2">
              <a href="#">{{ blog.title }}</a>
            </h3>
            
            <div class="mt-auto pt-4 border-t border-gray-100">
              <a href="#" class="text-dark font-medium hover:text-primary transition-colors text-sm flex items-center gap-1">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
