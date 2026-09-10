<script setup>
import { ref } from 'vue';
import { authStore } from '../../store/authStore.js';
import ProfileImageUpload from '../../components/ProfileImageUpload.vue';

const user = ref({ ...authStore.user });
const message = ref('');
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
  }, 3000);
};
</script>

<template>
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
