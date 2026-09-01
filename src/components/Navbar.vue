<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ShoppingCart, Menu, X } from 'lucide-vue-next';
import { authStore } from '../store/authStore.js';
import { cartCount } from '../store/cartStore.js';

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const isLoggedIn = computed(() => !!authStore.user);
const appRoute = computed(() => '/dashboard');

// Close the mobile drawer on navigation
const closeMenu = () => { mobileMenuOpen.value = false; };
</script>

<template>
  <header 
    :class="[
      'fixed w-full top-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4 md:px-6 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
          T
        </div>
        <span class="font-heading font-bold text-2xl text-dark">TosRean</span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <router-link to="/" class="font-medium text-dark-light hover:text-primary transition" active-class="text-primary" exact-active-class="text-primary">Home</router-link>
        <router-link to="/courses" class="font-medium text-dark-light hover:text-primary transition" active-class="text-primary">Courses</router-link>
        <router-link to="/categories" class="font-medium text-dark-light hover:text-primary transition" active-class="text-primary">Categories</router-link>
        <router-link to="/about" class="font-medium text-dark-light hover:text-primary transition" active-class="text-primary">About</router-link>
      </nav>

      <!-- Right Actions -->
      <div class="hidden lg:flex items-center gap-5">
        <router-link to="/cart" class="relative p-2 text-dark" aria-label="Open shopping cart">
          <ShoppingCart class="w-6 h-6" />
          <span v-if="cartCount" class="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">{{ cartCount }}</span>
        </router-link>

        <router-link to="/login" class="font-medium text-dark">
          Login
        </router-link>

        <router-link to="/signup" class="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-md">
          Sign Up
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button @click="mobileMenuOpen = true" class="lg:hidden p-2 text-dark">
        <Menu class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 flex">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-dark/50" @click="mobileMenuOpen = false"></div>
        
        <!-- Drawer content -->
        <div class="relative w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-y-auto">
          <div class="p-5 border-b flex justify-between items-center">
            <span class="font-heading font-bold text-xl">TosRean</span>
            <button @click="mobileMenuOpen = false" class="p-2 rounded-full hover:bg-light">
              <X class="w-6 h-6" />
            </button>
          </div>
          <div class="p-5 flex flex-col gap-4">
            <router-link to="/" class="font-medium text-dark py-2 border-b" active-class="text-primary" exact-active-class="text-primary" @click="closeMenu">Home</router-link>
            <router-link to="/courses" class="font-medium text-dark py-2 border-b" active-class="text-primary" @click="closeMenu">Courses</router-link>
            <router-link to="/categories" class="font-medium text-dark py-2 border-b" active-class="text-primary" @click="closeMenu">Categories</router-link>
            <router-link to="/about" class="font-medium text-dark py-2 border-b" active-class="text-primary" @click="closeMenu">AboutUs</router-link>
            <router-link v-if="isLoggedIn" :to="appRoute" class="font-medium text-dark py-2 border-b" @click="closeMenu">Dashboard</router-link>
            
            <div class="mt-4 flex gap-3">
              <router-link to="/login" class="flex-1 border border-primary text-primary text-center py-3 rounded-xl font-medium" @click="closeMenu">Login</router-link>
              <router-link to="/signup" class="flex-1 bg-primary text-white text-center py-3 rounded-xl font-medium" @click="closeMenu">Sign Up</router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
