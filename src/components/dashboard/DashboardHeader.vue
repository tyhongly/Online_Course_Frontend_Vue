<script setup>
import { computed } from 'vue';
import { Bell, Search } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';

defineProps({
  profileRoute: {
    type: String,
    required: true,
  },
});

const displayName = computed(() => authStore.user?.username || authStore.user?.name || 'User');
const avatarInitials = computed(() => displayName.value
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part.charAt(0))
  .join('')
  .toUpperCase() || 'U');
</script>

<template>
  <header class="flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
    <form class="relative w-36 sm:w-52 md:w-64" role="search" @submit.prevent>
      <label for="dashboard-search" class="sr-only">Search dashboard</label>
      <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id="dashboard-search"
        type="search"
        placeholder="Search..."
        class="h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </form>

    <div class="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
        aria-label="Notifications"
      >
        <Bell class="h-5 w-5" aria-hidden="true" />
      </button>

      <router-link
        :to="profileRoute"
        class="group inline-flex cursor-pointer items-center gap-2 rounded-full p-1.5 pr-2 transition hover:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/15 sm:gap-3 sm:pr-3"
        aria-label="Open your profile"
      >
        <span class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-white shadow-sm ring-2 ring-white">
          <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" :alt="`${displayName} profile picture`" class="h-full w-full object-cover" />
          <span v-else>{{ avatarInitials }}</span>
        </span>
        <span class="hidden max-w-36 truncate text-sm font-semibold text-slate-700 transition group-hover:text-primary sm:block">{{ displayName }}</span>
      </router-link>
    </div>
  </header>
</template>
