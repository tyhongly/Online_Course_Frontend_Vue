<script setup>
import { computed, ref } from 'vue';
import { Link2, Mail, Save, ShieldCheck, UserCircle2 } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';

const user = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  avatar: authStore.user?.avatar || '',
});

const message = ref('');
let messageTimer = null;

const initials = computed(() => {
  const name = user.value.name || 'Student';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
});

const displayName = computed(() => user.value.name || 'Student');

const saveProfile = () => {
  authStore.updateProfile({
    name: user.value.name.trim(),
    email: user.value.email.trim(),
    avatar: user.value.avatar.trim(),
  });

  message.value = 'Profile updated successfully.';
  window.clearTimeout(messageTimer);
  messageTimer = window.setTimeout(() => {
    message.value = '';
  }, 2500);
};
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] sm:p-8">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            <ShieldCheck class="h-3.5 w-3.5" />
            Student profile
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">My Profile</h1>
            <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Keep your account details up to date so your learning space feels personal and easy to recognize.
            </p>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Changes are saved to your student account.
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)]">
        <div class="flex flex-col items-center text-center">
          <div class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-3xl font-semibold text-white shadow-lg shadow-indigo-200">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              alt="Avatar"
              class="h-full w-full object-cover"
            />
            <span v-else>{{ initials }}</span>
          </div>

          <h2 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
            {{ displayName }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">{{ user.email || 'No email set yet' }}</p>

          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">Student account</span>
            <span class="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">Editable profile</span>
          </div>
        </div>

        <div class="mt-6 space-y-3 rounded-3xl bg-slate-50 p-4">
          <div class="flex items-center gap-3 text-sm text-slate-600">
            <UserCircle2 class="h-4 w-4 text-slate-400" />
            Name, email, and avatar
          </div>
          <div class="flex items-center gap-3 text-sm text-slate-600">
            <Mail class="h-4 w-4 text-slate-400" />
            Used for your learning account
          </div>
        </div>
      </aside>

      <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)] sm:p-8">
        <div
          v-if="message"
          class="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          {{ message }}
        </div>

        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-700">Full name</label>
              <input
                v-model="user.name"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Your full name"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-700">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Avatar URL</label>
            <div class="relative">
              <Link2 class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="user.avatar"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="https://example.com/avatar.png"
              />
            </div>
            <p class="text-sm leading-6 text-slate-500">
              Paste a direct image link if you want a custom profile picture.
            </p>
          </div>

          <div class="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <p class="text-sm text-slate-500">
              Save when you’re ready to update your learning profile.
            </p>
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Save class="h-4 w-4" />
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
