<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-vue-next';
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
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-dark transition-colors">
          S
        </div>
        <span class="font-heading font-bold text-2xl text-dark">SkillGro</span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <router-link to="/" class="font-medium text-primary hover:text-primary-dark transition-colors">Home</router-link>
        <a href="/#courses" class="font-medium text-dark-light hover:text-primary transition-colors">Courses</a>
        
        <div class="relative group">
          <button class="flex items-center gap-1 font-medium text-dark-light hover:text-primary transition-colors">
            Pages <ChevronDown class="w-4 h-4" />
          </button>
          <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
            <router-link to="/about" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">About Us</router-link>
            <router-link to="/instructors" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Instructors</router-link>
            <router-link to="/pricing" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Pricing</router-link>
          </div>
        </div>
      </nav>

      <!-- Right Actions -->
      <div class="hidden lg:flex items-center gap-5">
        <div class="relative group">
          <button class="flex items-center gap-1 text-sm font-medium bg-light px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Categories <ChevronDown class="w-4 h-4" />
          </button>
          <!-- Dropdown omitted for brevity -->
        </div>

        <router-link to="/cart" class="relative p-2 text-dark hover:text-primary transition-colors" aria-label="Open shopping cart">
          <ShoppingCart class="w-6 h-6" />
          <span v-if="cartCount" class="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">{{ cartCount }}</span>
        </router-link>

        <button class="p-2 text-dark hover:text-primary transition-colors">
          <User class="w-6 h-6" />
        </button>

        <template v-if="isLoggedIn">
          <router-link
            :to="appRoute"
            class="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Open App
          </router-link>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="font-medium text-dark-light hover:text-primary transition-colors"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Sign Up
          </router-link>
        </template>
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
            <span class="font-heading font-bold text-xl">SkillGro</span>
            <button @click="mobileMenuOpen = false" class="p-2 rounded-full hover:bg-light">
              <X class="w-6 h-6" />
            </button>
          </div>
          <div class="p-5 flex flex-col gap-4">
            <router-link to="/" class="font-medium text-primary py-2 border-b" @click="mobileMenuOpen = false">Home</router-link>
            <a href="/#courses" class="font-medium text-dark py-2 border-b" @click="mobileMenuOpen = false">Courses</a>
            <router-link to="/about" class="font-medium text-dark py-2 border-b" @click="mobileMenuOpen = false">Pages</router-link>
            <template v-if="isLoggedIn">
              <router-link :to="appRoute" class="font-medium text-dark py-2 border-b" @click="mobileMenuOpen = false">Open App</router-link>
            </template>
            <template v-else>
              <router-link to="/login" class="font-medium text-dark py-2 border-b" @click="mobileMenuOpen = false">Login</router-link>
              <router-link to="/signup" class="font-medium text-dark py-2 border-b" @click="mobileMenuOpen = false">Sign Up</router-link>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
