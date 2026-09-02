<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false);

const goToHome = () => {
  router.push('/');
};

const handleSignup = async () => {
  error.value = '';
  isSubmitting.value = true;

  try {
    await authStore.signup({
      name: name.value,
      email: email.value,
      password: password.value
    });
    await router.push('/login');
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to create your account. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
      <button
        type="button"
        @click="goToHome"
        class="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-600 transition hover:bg-gray-200 hover:text-gray-800"
        aria-label="Go to home"
      >
        ×
      </button>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Create Account</h1>
        <p class="text-gray-500 mt-2">Start your learning journey today</p>
      </div>
      
      <form @submit.prevent="handleSignup" class="space-y-5">
        <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
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
        
        <button type="submit" :disabled="isSubmitting" class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="text-primary font-bold hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
