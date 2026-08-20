<script setup>
import { ref } from 'vue';
import { Mail } from 'lucide-vue-next';

const email = ref('');

const subscribe = () => {
  if (email.value) {
    alert(`Subscribed with: ${email.value}`);
    email.value = '';
  }
};
</script>

<template>
  <section class="py-20 relative overflow-hidden bg-dark">
    <!-- Decorative Shapes -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20 translate-y-1/2"></div>
    
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-3xl md:text-4xl font-bold font-heading text-white mb-4">Want to stay informed about new courses & study?</h2>
          <p class="text-dark-lighter text-lg">Sign up for our newsletter to receive the latest updates.</p>
        </div>
        
        <div class="w-full md:w-[450px]">
          <form @submit.prevent="subscribe" class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail class="w-5 h-5 text-gray-400" />
            </div>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="Enter your email address" 
              class="w-full pl-12 pr-36 py-4 rounded-full bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit" 
              class="absolute right-2 top-2 bottom-2 px-6 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        </div>
        
      </div>
    </div>
  </section>
</template>
