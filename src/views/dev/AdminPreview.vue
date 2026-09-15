<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();

onMounted(async () => {
  // Only enter the protected dashboard after the login response has stored its JWT.
  try {
    await authStore.login('admin@example.com', 'admin');
    await router.replace('/admin');
  } catch (error) {
    await router.replace('/');
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-950 px-4 py-16 text-white">
    <div class="mx-auto max-w-xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Preview</p>
      <h1 class="mt-4 text-3xl font-semibold tracking-tight">Loading admin dashboard...</h1>
      <p class="mt-3 text-sm text-white/70">Seeding a local admin session and opening the protected dashboard.</p>
    </div>
  </div>
</template>
