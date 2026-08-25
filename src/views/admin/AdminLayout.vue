<script setup>
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const route = useRoute();

const displayName = computed(() => authStore.user?.name || 'Admin');

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const navigation = [
  { name: 'Overview', path: '/admin' },
  { name: 'Profile', path: '/admin/profile' },
  { name: 'Courses', path: '/admin/courses' },
  { name: 'Lessons', path: '/admin/lessons' },
  { name: 'Categories', path: '/admin/categories' },
  { name: 'Students', path: '/admin/students' },
  { name: 'Analytics', path: '/admin/analytics' },
];

onMounted(() => {
  if (!authStore.user) {
    router.replace('/login');
    return;
  }

  if (authStore.user.role !== 'admin') {
    router.replace('/unauthorized');
  }
});
</script>

<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900 md:overflow-hidden">
    <aside class="w-full border-b border-slate-200/80 bg-white/85 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-72 md:flex-col md:border-b-0 md:border-r md:overflow-y-auto">
      <div class="flex min-h-full flex-col">
        <div class="p-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            Admin space
          </div>
          <h2 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Course Platform</h2>
          <p class="mt-2 text-sm text-slate-500">Signed in as {{ displayName }}</p>
        </div>

        <nav class="px-3 pb-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            :class="[
              'mb-1 block rounded-2xl px-4 py-3 text-sm font-medium transition',
              route.path === item.path || (item.path !== '/admin' && route.path.startsWith(item.path))
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
            ]"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <div class="mt-auto border-t border-slate-200 p-4">
          <button
            @click="logout"
            class="w-full rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>

    <div class="md:pl-72">
      <main class="min-w-0 md:h-screen md:overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
