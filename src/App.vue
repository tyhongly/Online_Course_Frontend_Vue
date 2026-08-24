<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const hideNavAndFooter = computed(() => {
  return route.path.startsWith('/admin') || route.path.startsWith('/student') || route.path.startsWith('/login') || route.path.startsWith('/signup') || route.path.startsWith('/learn');
});
</script>

<template>
  <div class="font-sans text-gray-800 antialiased overflow-x-hidden">
    <Navbar v-if="!hideNavAndFooter" />
    
    <router-view />
    
    <Footer v-if="!hideNavAndFooter" />
  </div>
</template>

<style>
/* Import custom fonts in index.html, handled globally via Tailwind */
</style>
