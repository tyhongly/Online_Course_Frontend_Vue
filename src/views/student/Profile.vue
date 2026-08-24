<script setup>
import { ref } from 'vue';
import { authStore } from '../../store/authStore.js';

const user = ref({ ...authStore.user });
const message = ref('');

const saveProfile = () => {
  authStore.updateProfile(user.value);
  message.value = 'Profile updated successfully!';
  setTimeout(() => message.value = '', 3000);
};
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div v-if="message" class="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-center font-medium">
        {{ message }}
      </div>
      
      <form @submit.prevent="saveProfile" class="space-y-6">
        <div class="flex items-center gap-6 mb-8">
          <div class="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-4xl text-gray-400 font-bold">
            <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="w-full h-full object-cover" />
            <span v-else>{{ user.name ? user.name.charAt(0) : 'U' }}</span>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
            <input v-model="user.avatar" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" placeholder="https://example.com/avatar.png" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input v-model="user.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="user.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" />
          </div>
        </div>
        
        <div class="pt-4 flex justify-end">
          <button type="submit" class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
