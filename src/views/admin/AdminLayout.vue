<script setup>
import { useRouter, useRoute } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const route = useRoute();

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const navigation = [
  { name: 'Overview', path: '/admin' },
  { name: 'Courses', path: '/admin/courses' },
  { name: 'Students', path: '/admin/students' },
  { name: 'Analytics', path: '/admin/analytics' },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-dark text-white shadow-xl flex flex-col">
      <div class="p-6 border-b border-gray-800">
        <h2 class="text-2xl font-bold font-heading">Admin Portal</h2>
        <p class="text-gray-400 text-sm mt-1">Manage Platform</p>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <router-link 
          v-for="item in navigation" 
          :key="item.name"
          :to="item.path" 
          :class="['block px-4 py-3 rounded-lg transition-colors font-medium', route.path === item.path || (item.path !== '/admin' && route.path.startsWith(item.path)) ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white']"
        >
          {{ item.name }}
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-gray-800">
        <button @click="logout" class="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium">
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>
