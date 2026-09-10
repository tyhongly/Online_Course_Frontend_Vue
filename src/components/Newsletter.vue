<script setup>
import { ref } from 'vue';
import { ArrowRight, Mail } from 'lucide-vue-next';

const email = ref('');

const subscribe = () => {
  if (email.value) {
    alert(`Subscribed with: ${email.value}`);
    email.value = '';
  }
};
</script>

<template>
  <section class="relative overflow-hidden bg-white py-10 md:py-12">
    <div class="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary opacity-15 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 h-36 w-36 translate-y-1/2 -translate-x-1/2 rounded-full bg-accent opacity-15 blur-3xl"></div>
    
    <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-black/[0.025] px-5 py-6 backdrop-blur-sm md:flex-row md:justify-between md:px-8">
        
        <div class="flex-1 text-center md:text-left">
          <h2 class="font-heading text-2xl font-bold leading-tight text-black md:text-3xl">Stay Updated with New Courses</h2>
          <p class="mt-2 text-sm text-black md:text-base">Get notified about new IT courses and learning resources.</p>
        </div>
        
        <div class="w-full md:max-w-md md:flex-1">
          <form @submit.prevent="subscribe" class="flex flex-col gap-2 sm:flex-row">
            <div class="relative flex-1">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail class="w-5 h-5 text-gray-400" />
              </div>
              <input 
                v-model="email" 
                type="email" 
                required 
                placeholder="Enter your email address" 
                class="w-full rounded-xl border border-transparent bg-white py-3 pl-11 pr-4 text-sm text-dark shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <button 
              type="submit" 
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
            >
              Subscribe
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  </section>
</template>
