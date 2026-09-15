<script setup>
import { computed, ref } from "vue";
import { Mail, Save, ShieldCheck, UserCircle2 } from "lucide-vue-next";
import { authStore } from "../../store/authStore.js";
import ProfileImageUpload from "../../components/ProfileImageUpload.vue";

const user = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  avatar: authStore.user?.avatar || "",
});

const message = ref("");
const selectedImage = ref(null);
const imageRemoved = ref(false);
const profileImageUpload = ref(null);
let messageTimer = null;

const initials = computed(() => {
  const name = user.value.name || "Student";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
});

const displayName = computed(() => user.value.name || "Student");

const readImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error("Unable to read the selected image."));
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
  let avatar = user.value.avatar;
  if (imageRemoved.value) avatar = "";
  if (selectedImage.value) avatar = await readImage(selectedImage.value);

  authStore.updateProfile({
    name: user.value.name.trim(),
    email: user.value.email.trim(),
    avatar,
  });

  user.value.avatar = avatar;
  selectedImage.value = null;
  imageRemoved.value = false;

  message.value = "Profile updated successfully.";
  window.clearTimeout(messageTimer);
  messageTimer = window.setTimeout(() => {
    message.value = "";
  }, 2500);
};
</script>

<template>
  <div class="min-h-full bg-slate-50 p-5 sm:p-8">
    <div class="mx-auto max-w-6xl">

      <!-- Success message -->
      <div
        v-if="message"
        class="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
      >
        <Check class="mr-2 inline h-4 w-4" />
        {{ message }}
      </div>

      <!-- SINGLE PROFILE CONTAINER -->
      <section
        class="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.3)] lg:grid-cols-[310px_minmax(0,1fr)]"
      >

        <!-- =========================
             LEFT: PROFILE SUMMARY
        ========================== -->
        <aside class="border-b border-slate-200 lg:border-b-0 lg:border-r">

          <!-- Profile header -->
          <div class="bg-blue-600 px-6 pb-8 pt-9 text-white">
            <div class="flex flex-col items-center text-center">

              <!-- Profile image -->
              <ProfileImageUpload
                inline
                ref="profileImageUpload"
                :image="user.avatar"
                :name="user.name || 'Admin'"
                @select="selectImage"
                @remove="removeImage"
              />

              <!-- Name -->
              <h2 class="mt-5 text-2xl font-semibold text-white tracking-tight">
                {{ user.name || "Admin User" }}
              </h2>

              <!-- Email -->
              <p class="mt-1 max-w-full break-all text-sm text-blue-100">
                {{ user.email || "No email set" }}
              </p>

              <!-- Status badges -->
              <div class="mt-5 flex flex-wrap justify-center gap-2">
                <span
                  class="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                >
                  {{ user.role || "admin" }}
                </span>

                <span
                  :class="[
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    user.isSuspended
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-700',
                  ]"
                >
                  {{ user.isSuspended ? "Suspended" : "Active" }}
                </span>
              </div>
            </div>
          </div>

          <!-- Profile information -->
          <div class="space-y-0 px-6 py-5">

            <!-- Verification -->
            <div class="flex items-start justify-between gap-4 py-4">
              <div>
                <p class="text-sm font-medium text-slate-500">
                  Verification
                </p>

                <p class="mt-1 text-sm text-slate-700">
                  {{
                    user.isVerified
                      ? "Your account is verified."
                      : "Your account is under review."
                  }}
                </p>
              </div>

              <span
                class="inline-flex shrink-0 items-center gap-1.5 pt-0.5 text-sm font-semibold"
                :class="
                  user.isVerified
                    ? 'text-emerald-700'
                    : 'text-amber-600'
                "
              >
                <BadgeCheck class="h-4 w-4" />

                {{ user.isVerified ? "Verified" : "Pending" }}
              </span>
            </div>

            <div class="border-t border-slate-200"></div>

            <!-- Last activity -->
            <div class="py-4">
              <p class="text-sm font-medium text-slate-500">
                Last activity
              </p>

              <p class="mt-1 text-sm font-medium text-slate-800">
                {{ lastActivity }}
              </p>
            </div>

            <div class="border-t border-slate-200"></div>

            <!-- Role -->
            <div class="py-4">
              <p class="text-sm font-medium text-slate-500">
                Role
              </p>

              <p class="mt-1 text-sm font-semibold capitalize text-slate-800">
                {{ user.role || "Administrator" }}
              </p>
            </div>

          </div>
        </aside>

        <!-- =========================
             RIGHT: ACCOUNT DETAILS
        ========================== -->
        <div class="min-w-0 p-6 sm:p-8 lg:p-10">

          <!-- Header -->
          <div class="mb-8">
            <div class="flex items-start gap-4">

              <div>
                <h2 class="text-2xl font-semibold tracking-tight text-slate-950">
                  Account details
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                  Update your personal information and profile presentation.
                </p>
              </div>

            </div>
          </div>

          <!-- Form -->
          <form
            class="space-y-7"
            @submit.prevent="saveProfile"
          >

            <!-- Name + Email -->
            <div class="grid gap-5 sm:grid-cols-2">

              <!-- Full name -->
              <div class="space-y-2">
                <label
                  for="full-name"
                  class="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div class="relative">
                  <UserRound
                    class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="full-name"
                    v-model="user.name"
                    required
                    type="text"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label
                  for="email"
                  class="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div class="relative">
                  <Mail
                    class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    v-model="user.email"
                    required
                    type="email"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

            </div>

            <!-- Bio -->
            <div class="space-y-2">
              <label
                for="bio"
                class="text-sm font-semibold text-slate-700"
              >
                Bio
              </label>

              <div class="relative">
                <textarea
                  id="bio"
                  v-model="user.bio"
                  maxlength="100"
                  rows="4"
                  class="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  placeholder="Write a short bio about yourself..."
                ></textarea>
              </div>

              <!-- Character counter -->
              <div class="flex justify-end">
                <span
                  class="text-xs font-medium"
                  :class="
                    (user.bio || '').length >= 90
                      ? 'text-amber-600'
                      : 'text-slate-400'
                  "
                >
                  {{ (user.bio || "").length }} / 100 characters
                </span>
              </div>
            </div>

            <!-- Bottom -->
            <div
              class="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
            >

              <p class="max-w-md text-sm leading-6 text-slate-500">
                Role and account status are managed by the system.
              </p>

              <button
                :disabled="isSaving"
                type="submit"
                class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save class="h-4 w-4" />

                {{
                  isSaving
                    ? "Saving..."
                    : "Save changes"
                }}
              </button>

            </div>

          </form>
        </div>

      </section>
    </div>
  </div>
</template>

