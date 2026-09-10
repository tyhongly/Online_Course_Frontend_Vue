<script setup>
import { computed, ref } from 'vue';
import { Activity, BadgeCheck, CalendarDays, Check, Link2, Mail, Save, ShieldCheck, UserRound } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';
import ProfileImageUpload from '../../components/ProfileImageUpload.vue';

const user = ref({
  ...authStore.user,
  avatar: authStore.user?.avatar || '',
  bio: authStore.user?.bio || '',
  isVerified: authStore.user?.isVerified ?? true,
  isSuspended: authStore.user?.isSuspended ?? false,
});
const message = ref('');
const isSaving = ref(false);

const initials = computed(() => (user.value.name || 'Admin').split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase());
const joinedDate = computed(() => user.value.createdAt ? new Date(user.value.createdAt).toLocaleDateString() : 'Unavailable');
const lastActivity = computed(() => user.value.lastActivityAt ? new Date(user.value.lastActivityAt).toLocaleString() : 'Unavailable');

const saveProfile = () => {
  isSaving.value = true;
  authStore.updateProfile({
    ...user.value,
    name: user.value.name.trim(),
    email: user.value.email.trim(),
    avatar: user.value.avatar.trim(),
    bio: user.value.bio.trim(),
  });
  message.value = 'Profile changes saved successfully.';
  window.setTimeout(() => {
    isSaving.value = false;
const selectedImage = ref(null);
const imageRemoved = ref(false);

const readImage = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Unable to read the selected image.'));
  reader.readAsDataURL(file);
});

const selectImage = (file) => {
  selectedImage.value = file;
  imageRemoved.value = false;
};

const removeImage = () => {
  selectedImage.value = null;
  imageRemoved.value = true;
};

const saveProfile = async () => {
  let avatar = user.value.avatar || '';
  if (imageRemoved.value) avatar = '';
  if (selectedImage.value) avatar = await readImage(selectedImage.value);

  authStore.updateProfile({ ...user.value, avatar });
  user.value.avatar = avatar;
  selectedImage.value = null;
  imageRemoved.value = false;
  message.value = 'Admin profile updated successfully!';
  setTimeout(() => {
    message.value = '';
  }, 1800);
};
</script>

<template>
  <div class="min-h-full bg-[#f5f3ef] p-5 sm:p-8">
    <div class="mx-auto max-w-6xl space-y-6">
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-[0_24px_60px_-38px_rgba(15,23,42,0.7)]">
        <div class="flex flex-col gap-6 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200"><ShieldCheck class="h-3.5 w-3.5" /> Admin account</div>
            <h1 class="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Profile settings</h1>
            <p class="mt-2 max-w-xl text-sm leading-6 text-slate-300">Manage the identity and account details used across your course platform.</p>
          </div>
          <div class="flex items-center gap-2 text-sm text-slate-300"><CalendarDays class="h-4 w-4" /> Member since {{ joinedDate }}</div>
        </div>
      </section>

      <div v-if="message" class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700"><Check class="mr-2 inline h-4 w-4" />{{ message }}</div>

      <section class="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
        <aside class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.3)]">
          <div class="bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-500 px-6 pb-8 pt-9 text-white">
            <div class="flex flex-col items-center text-center">
              <div class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/15 text-3xl font-semibold shadow-xl"><img v-if="user.avatar" :src="user.avatar" alt="Admin avatar" class="h-full w-full object-cover" /><span v-else>{{ initials }}</span></div>
              <h2 class="mt-5 text-2xl font-semibold tracking-tight">{{ user.name || 'Admin User' }}</h2>
              <p class="mt-1 break-all text-sm text-indigo-100">{{ user.email || 'No email set' }}</p>
              <div class="mt-5 flex flex-wrap justify-center gap-2"><span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase">{{ user.role || 'admin' }}</span><span :class="['rounded-full px-3 py-1 text-xs font-semibold', user.isSuspended ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700']">{{ user.isSuspended ? 'Suspended' : 'Active' }}</span></div>
            </div>
          </div>
          <div class="space-y-4 p-6 text-sm"><div class="flex items-center justify-between"><span class="text-slate-500">Verification</span><span class="inline-flex items-center gap-1 font-medium text-emerald-700"><BadgeCheck class="h-4 w-4" />{{ user.isVerified ? 'Verified' : 'Pending' }}</span></div><div class="flex items-center justify-between"><span class="text-slate-500">Last activity</span><span class="max-w-[150px] text-right font-medium text-slate-700">{{ lastActivity }}</span></div><div v-if="user.bio" class="border-t border-slate-200 pt-4 leading-6 text-slate-600">{{ user.bio }}</div></div>
        </aside>

        <div class="space-y-6">
          <div class="grid gap-3 sm:grid-cols-3"><div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-25px_rgba(15,23,42,0.3)]"><div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"><span>Account health</span><Activity class="h-4 w-4 text-emerald-500" /></div><div class="mt-2 text-lg font-semibold text-emerald-700">{{ user.isSuspended ? 'Needs review' : 'All clear' }}</div></div><div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-25px_rgba(15,23,42,0.3)]"><div class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Access level</div><div class="mt-2 text-lg font-semibold capitalize text-slate-950">{{ user.role || 'admin' }}</div></div><div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-25px_rgba(15,23,42,0.3)]"><div class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Account ID</div><div class="mt-2 truncate text-lg font-semibold text-slate-950">#{{ user.id || '—' }}</div></div></div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <div class="mb-7"><h2 class="text-xl font-semibold text-slate-950">Account details</h2><p class="mt-1 text-sm text-slate-500">Update your personal information and profile presentation.</p></div>
            <form class="space-y-6" @submit.prevent="saveProfile">
              <div class="grid gap-5 sm:grid-cols-2"><div class="space-y-2"><label class="text-sm font-semibold text-slate-700">Full name</label><div class="relative"><UserRound class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input v-model="user.name" required class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></div></div><div class="space-y-2"><label class="text-sm font-semibold text-slate-700">Email address</label><div class="relative"><Mail class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input v-model="user.email" required type="email" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></div></div></div>
              <div class="space-y-2"><label class="text-sm font-semibold text-slate-700">Avatar URL</label><div class="relative"><Link2 class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input v-model="user.avatar" type="url" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" placeholder="https://example.com/avatar.png" /></div></div>
              <div class="space-y-2"><label class="text-sm font-semibold text-slate-700">Bio</label><textarea v-model="user.bio" rows="4" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" placeholder="Tell your team a little about yourself."></textarea></div>
              <div class="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"><p class="text-sm text-slate-500">Role and account status are managed by the system.</p><button :disabled="isSaving" type="submit" class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"><Save class="h-4 w-4" />{{ isSaving ? 'Saving...' : 'Save changes' }}</button></div>
            </form>
          </div>
        </div>
  <div class="min-h-full bg-light p-4 sm:p-6 lg:p-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Profile</p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Admin profile</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Update your account details and profile picture for the admin portal.
        </p>
      </section>

      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div v-if="message" class="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-center font-medium text-emerald-700">
          {{ message }}
        </div>

        <form @submit.prevent="saveProfile" class="space-y-6">
          <ProfileImageUpload
            :image="user.avatar || ''"
            :name="user.name || 'Admin'"
            @select="selectImage"
            @remove="removeImage"
          />

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                v-model="user.name"
                type="text"
                class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
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
              class="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
