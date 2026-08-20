<script setup>
import { events } from '../data/index.js';
import { MapPin, Calendar, ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      
      <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div class="max-w-2xl">
          <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Upcoming Events</span>
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Join Our Community And Make it Bigger</h2>
        </div>
        <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-light hover:bg-gray-200 text-dark rounded-full font-medium transition-colors">
          See All Events <ArrowRight class="w-4 h-4" />
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
          <div class="relative h-60 overflow-hidden">
            <img :src="event.image" :alt="event.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-white px-4 py-2 rounded-xl text-center shadow-lg">
              <span class="block text-primary font-bold text-xl leading-none mb-1">{{ event.date.split(' ')[0] }}</span>
              <span class="block text-dark-lighter text-xs font-medium uppercase">{{ event.date.split(' ')[1] }}</span>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-dark-lighter mb-3">
              <MapPin class="w-4 h-4 text-primary" />
              {{ event.location }}
            </div>
            <h3 class="text-xl font-bold font-heading mb-4 hover:text-primary transition-colors">
              <a href="#">{{ event.title }}</a>
            </h3>
            <a href="#" class="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors">
              Get Ticket <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
