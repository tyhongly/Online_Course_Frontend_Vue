<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();

onMounted(() => {
  // Dev-only helper: seed an admin session locally so the protected dashboard can be previewed.
  authStore.login('admin@example.com', 'admin');
  router.replace('/admin');
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
