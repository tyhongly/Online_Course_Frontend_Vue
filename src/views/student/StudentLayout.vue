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
  { name: 'My Learning', path: '/student/my-courses', icon: 'BookOpen' },
  { name: 'My Profile', path: '/student/profile', icon: 'User' },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800">Student Portal</h2>
        <p class="text-primary text-sm mt-1 font-medium">Welcome back, {{ authStore.user?.name || 'Student' }}!</p>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <router-link 
          v-for="item in navigation" 
          :key="item.name"
          :to="item.path" 
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium', route.path.startsWith(item.path) ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-primary']"
        >
          <span>{{ item.name }}</span>
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-gray-200">
        <button @click="logout" class="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>
