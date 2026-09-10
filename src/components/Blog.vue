<script setup>
import { blogs } from '../data/index.js';
</script>

<template>
  <section class="py-24 bg-light-dark">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      
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
          <div class="h-56 overflow-hidden">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <span class="w-fit rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {{ blog.category }}
            </span>

            <time class="mt-3 text-sm font-medium text-dark-lighter">{{ blog.date }}</time>
            
            <h3 class="mt-3 text-lg font-bold font-heading mb-4 hover:text-primary transition-colors line-clamp-2 text-dark">
              <a href="#">{{ blog.title }}</a>
            </h3>
            
            <a href="#" class="mt-auto pt-4 text-base font-semibold text-primary transition-colors hover:text-primary-dark">
              Read article →
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
