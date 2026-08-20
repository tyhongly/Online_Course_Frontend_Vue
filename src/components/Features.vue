<script setup>
import { features } from '../data/index.js';
import { UserCheck, BookOpen, Award } from 'lucide-vue-next';

const icons = {
  UserCheck,
  BookOpen,
  Award
};
</script>

<template>
  <section class="py-20 bg-light-dark">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">Our Top Features</span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">Achieve Your Goal With SkillGro</h2>
        <p class="text-dark-lighter">We provide a wide range of features to make your learning experience smooth and effective.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
        >
          <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <component :is="icons[feature.icon]" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold font-heading mb-3">{{ feature.title }}</h3>
          <p class="text-dark-lighter leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
