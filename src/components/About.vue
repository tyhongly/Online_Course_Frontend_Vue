<script setup>
import { CheckCircle2, ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <section class="py-24 md:py-32 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        
        <!-- Left Image -->
        <div class="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
          <!-- Decorative Background Shape -->
          <div class="absolute inset-0 bg-primary/15 rounded-[3rem] transform -rotate-6 scale-105 -z-10 blur-2xl"></div>
          
          <div class="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white h-[500px] hover:shadow-3xl transition-shadow duration-300">
            <img src="/src/image/Group_Meeting.jpg" alt="Students learning together" class="w-full h-full object-cover" />
          </div>

          <!-- Floating Badge -->
          <!-- <div class="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20 max-w-[200px]">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                10+
              </div>
              <p class="font-bold text-dark text-sm leading-tight">Years of Experience</p>
            </div>
          </div> -->
        </div>

        <!-- Right Content -->
        <div class="flex-1">
          <span class="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">About TosRean</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight text-dark">
            Thousands of Top Courses in One Place
          </h2>
          <p class="text-lg text-dark-lighter mb-10 leading-relaxed font-medium">
            TosRean is a global training provider based across the UK that specializes in accredited and bespoke training courses. We crush the barriers to finding a quality learning path.
          </p>

          <ul class="space-y-5 mb-12">
            <li class="flex items-start gap-4">
              <CheckCircle2 class="w-7 h-7 text-accent flex-shrink-0 mt-1" />
              <span class="text-dark font-semibold text-base">Free Document & Video Learning Materials</span>
            </li>
            <li class="flex items-start gap-4">
              <CheckCircle2 class="w-7 h-7 text-accent flex-shrink-0 mt-1" />
              <span class="text-dark font-semibold text-base">Access Your Classes Anywhere, Anytime</span>
            </li>
            <li class="flex items-start gap-4">
              <CheckCircle2 class="w-7 h-7 text-accent flex-shrink-0 mt-1" />
              <span class="text-dark font-semibold text-base">Flexible Learning Plans & Pace</span>
            </li>
          </ul>

          <a href="#" class="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1 text-base">
            Start Free Trial <ArrowRight class="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
