<script setup>
import { ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Free Document Library -->
        <div class="relative rounded-3xl overflow-hidden group">
          <div class="absolute inset-0 bg-dark/40 group-hover:bg-dark/50 transition-colors z-10"></div>
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80" alt="Free Document Courses" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
          
          <div class="absolute inset-0 z-20 flex flex-col justify-center p-10 md:p-12">
            <h3 class="text-3xl font-bold font-heading text-white mb-4">Free Document Library</h3>
            <p class="text-white/80 mb-8 max-w-sm">Access 100% free structured document courses, guides, and learning resources.</p>
            <router-link to="/courses" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-dark rounded-full font-medium hover:bg-primary hover:text-white transition-colors w-max shadow-lg transform hover:-translate-y-1">
              Read Free Courses <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>
        
        <!-- Become a Student -->
        <div class="relative rounded-3xl overflow-hidden group">
          <div class="absolute inset-0 bg-primary/60 group-hover:bg-primary/70 transition-colors mix-blend-multiply z-10"></div>
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Become a Student" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
          
          <div class="absolute inset-0 z-20 flex flex-col justify-center p-10 md:p-12">
            <h3 class="text-3xl font-bold font-heading text-white mb-4">Become a Student</h3>
            <p class="text-white/90 mb-8 max-w-sm">Join millions of people from around the world learning together.</p>
            <a href="#" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-dark hover:text-white transition-colors w-max shadow-lg transform hover:-translate-y-1">
              Apply Now <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
