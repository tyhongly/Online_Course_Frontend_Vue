<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleSignup = () => {
  if (!authStore.signup({ name: name.value, email: email.value, password: password.value })) {
    error.value = 'A user with that email already exists.';
    return;
  }

  router.push('/student/dashboard');
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Create Account</h1>
        <p class="text-gray-500 mt-2">Start your learning journey today</p>
      </div>
      
      <form @submit.prevent="handleSignup" class="space-y-5">
        <div v-if="error" class="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">
          {{ error }}
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="John Doe" />
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
          Sign Up
        </button>
      </form>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="text-primary font-bold hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
