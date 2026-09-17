<script setup>
import { computed, reactive, ref } from "vue";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Settings,
  ShieldCheck,
} from "lucide-vue-next";
import { changeCurrentPassword } from "../../services/userApi.js";

const form = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const visible = reactive({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
});
const isSaving = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const passwordChecks = computed(() => [
  { label: "8 characters minimum", valid: form.newPassword.length >= 8 },
  { label: "Contains a number", valid: /\d/.test(form.newPassword) },
  {
    label: "Passwords match",
    valid:
      form.newPassword.length > 0 &&
      form.newPassword === form.confirmPassword,
  },
]);

const togglePassword = (field) => {
  visible[field] = !visible[field];
};

const clearForm = () => {
  form.currentPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
};

const errorText = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  "We could not change your password. Check your current password and try again.";

const changePassword = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    errorMessage.value = "Please complete all password fields.";
    return;
  }
  if (passwordChecks.value.some((check) => !check.valid)) {
    errorMessage.value = "Choose a stronger password and make sure both new passwords match.";
    return;
  }

  isSaving.value = true;
  try {
    await changeCurrentPassword({ ...form });
    clearForm();
    successMessage.value = "Your password was changed successfully.";
  } catch (error) {
    errorMessage.value = errorText(error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-6">
    <section
      class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)]"
    >
      <div class="bg-gradient-to-br bg-primary px-6 py-8 text-white sm:px-8 sm:py-10">
        <div class="flex items-start justify-between gap-5">
          <div>
            <h1 class="mt-4 text-3xl font-semibold text-white tracking-tight sm:text-4xl">
              Keep your account secure
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-indigo-100">
              Manage your sign-in security and protect your learning account with a password you use nowhere else.
            </p>
          </div>
          <div class="hidden rounded-2xl bg-white/10 p-3 sm:block">
            <ShieldCheck class="h-7 w-7 text-indigo-100" />
          </div>
        </div>
      </div>

      <div class="grid gap-4 border-b border-slate-100 bg-slate-50 p-5 sm:grid-cols-3 sm:p-6">
        <div class="flex items-center gap-3">
          <div class="rounded-xl bg-indigo-100 p-2.5 text-indigo-700">
            <LockKeyhole class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Private</p>
            <p class="text-xs text-slate-500">Your password is encrypted</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
            <CheckCircle2 class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Easy to update</p>
            <p class="text-xs text-slate-500">Change it whenever needed</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="rounded-xl bg-sky-100 p-2.5 text-sky-700">
            <KeyRound class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Account access</p>
            <p class="text-xs text-slate-500">Keep your courses protected</p>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)] sm:p-8">
      <div class="mb-7 flex items-start gap-4">
        <div class="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
          <KeyRound class="h-6 w-6" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold tracking-tight text-slate-950">Change password</h2>
          <p class="mt-1 text-sm leading-6 text-slate-500">
            Enter your current password, then choose and confirm a new one.
          </p>
        </div>
      </div>

      <div
        v-if="successMessage || errorMessage"
        :class="successMessage ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'"
        class="mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium"
      >
        <Check v-if="successMessage" class="mt-0.5 h-4 w-4 shrink-0" />
        <AlertCircle v-else class="mt-0.5 h-4 w-4 shrink-0" />
        {{ successMessage || errorMessage }}
      </div>

      <form class="space-y-7" @submit.prevent="changePassword">
        <div class="grid gap-5 lg:grid-cols-3">
          <div
            v-for="field in [
              { key: 'currentPassword', label: 'Current password', autocomplete: 'current-password' },
              { key: 'newPassword', label: 'New password', autocomplete: 'new-password' },
              { key: 'confirmPassword', label: 'Confirm new password', autocomplete: 'new-password' },
            ]"
            :key="field.key"
            class="space-y-2"
          >
            <label :for="field.key" class="text-sm font-semibold text-slate-700">{{ field.label }}</label>
            <div class="relative">
              <LockKeyhole class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                :id="field.key"
                v-model="form[field.key]"
                :type="visible[field.key] ? 'text' : 'password'"
                :autocomplete="field.autocomplete"
                :placeholder="field.label"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                :aria-label="visible[field.key] ? 'Hide password' : 'Show password'"
                @click="togglePassword(field.key)"
              >
                <EyeOff v-if="visible[field.key]" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-slate-700">Password checklist</p>
            <div class="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span v-for="check in passwordChecks" :key="check.label" class="inline-flex items-center gap-1.5">
                <Check :class="check.valid ? 'text-emerald-500' : 'text-slate-300'" class="h-4 w-4" />
                {{ check.label }}
              </span>
            </div>
          </div>
          <button
            type="submit"
            :disabled="isSaving"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5b4ce1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4c3dcc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound class="h-4 w-4" />
            {{ isSaving ? "Updating..." : "Update password" }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>