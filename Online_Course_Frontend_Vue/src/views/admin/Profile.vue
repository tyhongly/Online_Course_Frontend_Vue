<script setup>
import { ref } from 'vue';
import { authStore } from '../../store/authStore.js';

const user = ref({ ...authStore.user });
const message = ref('');

const saveProfile = () => {
  authStore.updateProfile(user.value);
  message.value = 'Admin profile updated successfully!';
  setTimeout(() => {
    message.value = '';
  }, 3000);
};
</script>

<template>
  <div class="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_26%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-4 sm:p-6 lg:p-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Admin profile</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Update your account details and avatar for the admin portal.
        </p>
      </section>

      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] sm:p-8">
        <div v-if="message" class="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-center font-medium text-emerald-700">
          {{ message }}
        </div>

        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-4xl font-semibold text-slate-400">
              <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="h-full w-full object-cover" />
              <span v-else>{{ user.name ? user.name.charAt(0) : 'A' }}</span>
            </div>

            <div class="flex-1">
              <label class="mb-2 block text-sm font-medium text-slate-700">Avatar URL</label>
              <input
                v-model="user.avatar"
                type="text"
                class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                v-model="user.name"
                type="text"
                class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Role</label>
              <input
                :value="user.role"
                type="text"
                disabled
                class="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Last Activity</label>
              <input
                :value="user.lastActivityAt ? new Date(user.lastActivityAt).toLocaleString() : 'Unavailable'"
                type="text"
                disabled
                class="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
              />
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              type="submit"
              class="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
