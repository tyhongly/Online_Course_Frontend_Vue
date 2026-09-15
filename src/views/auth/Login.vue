<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../store/authStore.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false);

const forgotMode = ref(false);
const forgotEmail = ref('');
const forgotOtp = ref('');
const forgotPassword = ref('');
const forgotConfirmPassword = ref('');
const forgotError = ref('');
const forgotSubmitting = ref(false);

onMounted(() => {
  if (authStore.user) {
    router.replace('/dashboard');
  }
});

const goToHome = () => {
  router.push('/');
};

const handleLogin = async () => {
  error.value = '';
  isSubmitting.value = true;

  try {
    const user = await authStore.login(email.value, password.value);
    if (user) {
      await router.push(user.role === 'admin' ? '/admin' : '/student/dashboard');
    }
  } catch (requestError) {
    error.value = requestError.response?.data?.message
      || requestError.response?.data?.error
      || requestError.response?.data?.massage
      || requestError.message
      || 'Invalid login credentials';
  } finally {
    isSubmitting.value = false;
  }
};

const openForgotPassword = () => {
  forgotMode.value = true;
  forgotError.value = '';
  forgotEmail.value = '';
  forgotOtp.value = '';
  forgotPassword.value = '';
  forgotConfirmPassword.value = '';
  authStore.resetPhase = 'email';
};

const closeForgotPassword = () => {
  forgotMode.value = false;
  forgotError.value = '';
  forgotEmail.value = '';
  forgotOtp.value = '';
  forgotPassword.value = '';
  forgotConfirmPassword.value = '';
  authStore.resetPhase = 'email';
};

const sendResetOtp = async () => {
  forgotError.value = '';

  if (!forgotEmail.value.trim()) {
    forgotError.value = 'Enter your email address first.';
    return;
  }

  forgotSubmitting.value = true;
  try {
    await authStore.requestPasswordReset(forgotEmail.value.trim());
    forgotError.value = '';
  } catch (requestError) {
    forgotError.value = requestError.response?.data?.message
      || requestError.response?.data?.error
      || requestError.message
      || 'Unable to send reset OTP.';
  } finally {
    forgotSubmitting.value = false;
  }
};

const verifyResetOtp = async () => {
  forgotError.value = '';

  if (!forgotOtp.value.trim()) {
    forgotError.value = 'Enter the OTP sent to your email.';
    return;
  }

  forgotSubmitting.value = true;
  try {
    await authStore.verifyResetOtp(forgotOtp.value.trim());
  } catch (requestError) {
    forgotError.value = requestError.response?.data?.message
      || requestError.response?.data?.error
      || requestError.message
      || 'Unable to verify OTP.';
  } finally {
    forgotSubmitting.value = false;
  }
};

const saveNewPassword = async () => {
  forgotError.value = '';

  if (!forgotPassword.value.trim()) {
    forgotError.value = 'Enter a new password.';
    return;
  }

  if (forgotPassword.value !== forgotConfirmPassword.value) {
    forgotError.value = 'Passwords do not match.';
    return;
  }

  forgotSubmitting.value = true;
  try {
    await authStore.resetPassword(forgotPassword.value);
    forgotMode.value = false;
    error.value = 'Password updated successfully. Please sign in.';
    forgotEmail.value = '';
    forgotOtp.value = '';
    forgotPassword.value = '';
    forgotConfirmPassword.value = '';
    authStore.resetPhase = 'email';
  } catch (requestError) {
    forgotError.value = requestError.response?.data?.message
      || requestError.response?.data?.error
      || requestError.message
      || 'Unable to reset password.';
  } finally {
    forgotSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
      <button
        type="button"
        @click="goToHome"
        class="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-600 transition hover:bg-gray-200 hover:text-gray-800"
        aria-label="Go to home"
      >
        ×
      </button>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p class="text-gray-500 mt-2">Sign in to continue learning</p>
      </div>

      <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
        {{ error }}
      </div>

      <form v-if="!forgotMode" @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input v-model="email" type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="you@example.com" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="••••••••" />
        </div>

        <div class="flex items-center justify-between text-sm">
          <button type="button" @click="openForgotPassword" class="font-medium text-primary hover:text-primary-dark transition-colors">
            Forgot password?
          </button>
        </div>

        <button type="submit" :disabled="isSubmitting" class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <div v-else class="space-y-5">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p class="text-sm text-gray-500 mt-2">
            {{ authStore.resetPhase === 'email' ? 'We will send you an OTP.' : authStore.resetPhase === 'otp' ? 'Enter the verification code.' : 'Create your new password.' }}
          </p>
        </div>

        <div v-if="forgotError" class="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
          {{ forgotError }}
        </div>

        <div v-if="authStore.resetPhase === 'email'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input v-model="forgotEmail" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="you@example.com" />
          </div>

          <div class="flex gap-3">
            <button type="button" @click="closeForgotPassword" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Back
            </button>
            <button type="button" @click="sendResetOtp" :disabled="forgotSubmitting" class="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-colors">
              {{ forgotSubmitting ? 'Sending...' : 'Send OTP' }}
            </button>
          </div>
        </div>

        <div v-else-if="authStore.resetPhase === 'otp'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
            <input v-model="forgotOtp" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter 6-digit OTP" />
          </div>

          <div class="flex gap-3">
            <button type="button" @click="authStore.resetPhase = 'email'" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Try Another Email
            </button>
            <button type="button" @click="verifyResetOtp" :disabled="forgotSubmitting" class="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-colors">
              {{ forgotSubmitting ? 'Verifying...' : 'Verify OTP' }}
            </button>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input v-model="forgotPassword" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Create a strong password" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input v-model="forgotConfirmPassword" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Confirm your password" />
          </div>

          <div class="flex gap-3">
            <button type="button" @click="authStore.resetPhase = 'email'; forgotPassword = ''; forgotConfirmPassword = ''; forgotOtp = ''" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Back
            </button>
            <button type="button" @click="saveNewPassword" :disabled="forgotSubmitting" class="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-colors">
              {{ forgotSubmitting ? 'Saving...' : 'Reset Password' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
