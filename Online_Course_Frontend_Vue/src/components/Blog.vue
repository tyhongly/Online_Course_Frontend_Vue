<script setup>
import { blogs } from '../data/index.js';
import { Calendar, User } from 'lucide-vue-next';
</script>

<template>
  <section class="py-24 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Latest Articles</span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-dark">Our Latest News Feed</h2>
        <p class="text-lg text-dark-lighter">Stay updated with the latest insights and tips from our learning community.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="blog in blogs" 
          :key="blog.id"
          class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
        >
          <div class="relative h-56 overflow-hidden">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
              {{ blog.category }}
            </div>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex flex-col gap-2 text-sm text-dark-lighter mb-4">
              <div class="flex items-center gap-2 font-medium">
                <Calendar class="w-4 h-4" />
                {{ blog.date }}
              </div>
              <div class="flex items-center gap-2 font-medium">
                <User class="w-4 h-4" />
                {{ blog.author }}
              </div>
            </div>
            
            <h3 class="text-lg font-bold font-heading mb-4 hover:text-primary transition-colors line-clamp-2 text-dark">
              <a href="#">{{ blog.title }}</a>
            </h3>
            
            <div class="mt-auto pt-4 border-t border-gray-100">
              <a href="#" class="text-primary font-semibold hover:text-primary-dark transition-colors text-base flex items-center gap-2">
                Read More <ArrowRight class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
