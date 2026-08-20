<script setup>
import { ref, watch } from 'vue';
import { useInView } from '../composables/useInView.js';
import { CheckCircle, Play } from 'lucide-vue-next';

const { target, isVisible } = useInView({ threshold: 0.5 });

const studentsCount = ref(0);
const instructorsCount = ref(0);

const animateValue = (refVar, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    refVar.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

watch(isVisible, (val) => {
  if (val) {
    animateValue(studentsCount, 0, 15, 2000);
    animateValue(instructorsCount, 0, 200, 2000);
  }
});
</script>

<template>
  <section class="py-20" ref="target">
    <div class="container mx-auto px-4 md:px-6">
      <div class="bg-primary rounded-3xl overflow-hidden relative shadow-2xl">
        <!-- Decorative bg -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div class="flex flex-col lg:flex-row items-center p-10 md:p-16 lg:p-20 gap-12 relative z-10">
          
          <!-- Left text -->
          <div class="flex-1 text-white">
            <span class="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-md">Join Our Free Workshops</span>
            <h2 class="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight text-white">
              SkillGro is Built for People Like You
            </h2>
            <p class="text-white/80 text-lg mb-8 max-w-xl">
              Learn from industry experts, join a community of passionate learners, and achieve your personal and professional goals with our interactive workshops.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 mb-10">
              <div class="flex items-center gap-3">
                <CheckCircle class="w-6 h-6 text-accent-light" />
                <span class="font-medium">Smooth Virtual Live Classes</span>
              </div>
              <div class="flex items-center gap-3">
                <CheckCircle class="w-6 h-6 text-accent-light" />
                <span class="font-medium">99% Graduation Complete</span>
              </div>
            </div>
            
            <button class="bg-white text-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-light transition-colors transform hover:-translate-y-1 shadow-lg">
              Quick Join Now <Play class="w-5 h-5 fill-current" />
            </button>
          </div>
          
          <!-- Right Stats -->
          <div class="w-full lg:w-auto flex flex-col sm:flex-row gap-6">
            <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center flex-1 lg:w-48 transform transition-transform hover:-translate-y-2">
              <div class="text-4xl md:text-5xl font-bold font-heading text-white mb-2">{{ studentsCount }}K+</div>
              <p class="text-white/80 font-medium">Active Students</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center flex-1 lg:w-48 transform transition-transform hover:-translate-y-2">
              <div class="text-4xl md:text-5xl font-bold font-heading text-white mb-2">{{ instructorsCount }}+</div>
              <p class="text-white/80 font-medium">Best Instructors</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>
