<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { BadgeCheck, BookOpen, LayoutDashboard, LogOut, User } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const route = useRoute();

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const navigation = [
  { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Learning', path: '/student/my-courses', icon: BookOpen },
  { name: 'My Profile', path: '/student/profile', icon: User },
];

const userInitials = computed(() => {
  const name = authStore.user?.name || 'Student';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
});
</script>

<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900 md:overflow-hidden">
    <div class="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col md:block">
      <aside class="border-b border-slate-200/80 bg-white/85 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:flex md:w-[286px] md:flex-col md:border-b-0 md:border-r">
        <div class="px-6 py-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            <BadgeCheck class="h-3.5 w-3.5" />
            Student space
          </div>

          <div class="mt-5 flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-base font-bold text-white shadow-lg shadow-indigo-200">
              {{ userInitials }}
            </div>
            <div>
              <p class="text-sm text-slate-500">Welcome back</p>
              <h2 class="text-lg font-semibold tracking-tight text-slate-950">{{ authStore.user?.name || 'Student' }}</h2>
            </div>
          </div>
        </div>

        <nav class="flex flex-1 flex-col gap-1 px-4 pb-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            :class="[
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
              route.path.startsWith(item.path)
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            ]"
          >
            <component :is="item.icon" class="h-4 w-4 shrink-0" />
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <div class="border-t border-slate-200 p-4">
          <button
            @click="logout"
            class="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <LogOut class="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main class="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-8 md:ml-[286px] md:h-screen md:px-8 md:pb-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
