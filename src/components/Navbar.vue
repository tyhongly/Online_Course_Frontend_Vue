<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-vue-next';

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
      <a href="#" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-dark transition-colors">
          S
        </div>
        <span class="font-heading font-bold text-2xl text-dark">SkillGro</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <a href="#" class="font-medium text-primary hover:text-primary-dark transition-colors">Home</a>
        <a href="#courses" class="font-medium text-dark-light hover:text-primary transition-colors">Courses</a>
        
        <div class="relative group">
          <button class="flex items-center gap-1 font-medium text-dark-light hover:text-primary transition-colors">
            Pages <ChevronDown class="w-4 h-4" />
          </button>
          <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
            <a href="#" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">About Us</a>
            <a href="#" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Instructors</a>
            <a href="#" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Pricing</a>
          </div>
        </div>

        <div class="relative group">
          <button class="flex items-center gap-1 font-medium text-dark-light hover:text-primary transition-colors">
            Dashboard <ChevronDown class="w-4 h-4" />
          </button>
          <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
            <a href="#" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Student Profile</a>
            <a href="#" class="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">Enrolled Courses</a>
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

        <button class="relative p-2 text-dark hover:text-primary transition-colors">
          <ShoppingCart class="w-6 h-6" />
          <span class="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">2</span>
        </button>

        <button class="p-2 text-dark hover:text-primary transition-colors">
          <User class="w-6 h-6" />
        </button>

        <a href="#" class="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Get Started
        </a>
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
            <a href="#" class="font-medium text-primary py-2 border-b">Home</a>
            <a href="#courses" class="font-medium text-dark py-2 border-b">Courses</a>
            <a href="#" class="font-medium text-dark py-2 border-b">Pages</a>
            <a href="#" class="font-medium text-dark py-2 border-b">Dashboard</a>
            
            <div class="mt-4 flex gap-4">
               <a href="#" class="flex-1 bg-primary text-white text-center py-3 rounded-xl font-medium">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
