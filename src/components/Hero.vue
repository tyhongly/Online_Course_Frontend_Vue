<script setup>
import { ArrowRight, Play, Star } from 'lucide-vue-next';
</script>

<template>
  <section class="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        <!-- Left Content -->
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            #1 e-Learning Platform
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
            Learning is What You Make of it. <br class="hidden lg:block"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Make it Yours</span> at SkillGro.
          </h1>
          
          <p class="text-lg md:text-xl text-dark-lighter mb-8 max-w-2xl mx-auto lg:mx-0">
            Unlock your potential with world-class instructors. Build skills for today, tomorrow, and beyond with our comprehensive courses.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#" class="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1">
              Start Free Trial <ArrowRight class="w-5 h-5" />
            </a>
            
            <button class="w-full sm:w-auto px-8 py-4 bg-white hover:bg-light text-dark rounded-full font-medium flex items-center justify-center gap-3 transition-all border border-gray-200 hover:border-gray-300">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Play class="w-4 h-4 ml-1 fill-current" />
              </div>
              Watch Our Class Demo
            </button>
          </div>
        </div>

        <!-- Right Image/Illustration -->
        <div class="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto mt-10 lg:mt-0">
          <div class="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src="/src/image/Group_Study.jpg" alt="Students learning" class="w-full h-auto object-cover" />
          </div>
          
          <!-- Floating Elements -->
          <div class="absolute -top-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce" style="animation-duration: 3s;">
            <div class="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <div class="w-10 h-10 rounded-full border-2 border-white bg-light flex items-center justify-center text-xs font-bold text-primary">
                +1K
              </div>
            </div>
            <div>
              <p class="font-bold text-dark text-sm">36K+ Enrolled</p>
              <p class="text-xs text-dark-lighter">Students Worldwide</p>
            </div>
          </div>

          <div class="absolute -bottom-8 -right-6 md:-right-8 bg-white p-5 rounded-2xl shadow-xl z-20">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Star class="w-6 h-6 fill-current" />
              </div>
              <div>
                <p class="font-heading font-bold text-xl text-dark">4.9/5</p>
                <p class="text-xs text-dark-lighter">Average Rating</p>
              </div>
            </div>
          </div>
          
          <!-- Decorative shape -->
          <div class="absolute top-1/2 -right-4 w-24 h-24 bg-accent rounded-full blur-2xl opacity-50 -z-10"></div>
        </div>

      </div>

      <!-- Brands Strip -->
      <div class="mt-20 pt-10 border-t border-gray-100">
        <p class="text-center text-sm font-medium text-dark-lighter mb-8 uppercase tracking-wider">Trusted by over 500+ leading universities and companies</p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span class="text-2xl font-bold font-heading">Google</span>
          <span class="text-2xl font-bold font-heading">Microsoft</span>
          <span class="text-2xl font-bold font-heading">Amazon</span>
          <span class="text-2xl font-bold font-heading">Spotify</span>
          <span class="text-2xl font-bold font-heading">Netflix</span>
        </div>
      </div>
    </div>
  </section>
</template>
