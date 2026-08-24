<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = () => {
  if (authStore.login(email.value, password.value)) {
    if (authStore.user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/student/my-courses');
    }
  } else {
    error.value = 'Invalid login credentials';
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p class="text-gray-500 mt-2">Sign in to continue learning</p>
        <p class="text-xs text-primary mt-4 bg-primary/10 py-2 rounded-lg">Demo: email 'admin@example.com' password 'admin' for Admin role</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
          {{ error }}
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input v-model="email" type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="you@example.com" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="••••••••" />
        </div>
        
        <button type="submit" class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Sign In
        </button>
      </form>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Don't have an account? 
        <router-link to="/signup" class="text-primary font-bold hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>
