<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ChevronDown, Heart, LogOut, Menu, X } from 'lucide-vue-next';
import { authStore } from '../store/authStore.js';
import { wishlistCount } from '../store/wishlistStore.js';
import BrandLogo from './BrandLogo.vue';

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const authModalOpen = ref(false);
const authMode = ref('login');
const profileMenuOpen = ref(false);
const isSubmitting = ref(false);
const error = ref('');
const form = ref({ username: '', email: '', password: '' });
const links = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' }
];

const isLoggedIn = computed(() => Boolean(authStore.user && authStore.token));
const displayName = computed(() => authStore.user?.username || authStore.user?.name || 'User');
const initials = computed(() => displayName.value.trim().charAt(0).toUpperCase() || 'U');
const profileRoute = computed(() => authStore.user?.role === 'admin' ? '/admin/profile' : '/student/profile');

const openAuth = (mode = 'login') => {
  authMode.value = mode;
  error.value = '';
  form.value = { username: '', email: '', password: '' };
  authModalOpen.value = true;
  mobileMenuOpen.value = false;
  profileMenuOpen.value = false;
};
const closeAuth = () => { if (!isSubmitting.value) authModalOpen.value = false; };
const switchMode = (mode) => { authMode.value = mode; error.value = ''; form.value.password = ''; };
const closeMenu = () => { mobileMenuOpen.value = false; };

// Additional reactive state for OTP and forgot‑password flows
const otp = ref('');
const forgotPasswordMode = ref(false);

const startForgotPassword = () => {
  forgotPasswordMode.value = true;
  authStore.resetPhase = 'email';
  form.value = { email: '', password: '' };
  authMode.value = 'login';
  authModalOpen.value = true;
};

const submitAuth = async () => {
  error.value = '';
  isSubmitting.value = true;
  try {
    if (forgotPasswordMode.value) {
      // Forgot password flow
      if (authStore.resetPhase === 'email') {
        await authStore.requestPasswordReset(form.value.email);
        // UI will switch to OTP input based on resetPhase
      } else if (authStore.resetPhase === 'otp') {
        await authStore.verifyResetOtp(otp.value);
        // UI will now show new password fields
      } else if (authStore.resetPhase === 'newPassword') {
        await authStore.resetPassword(form.value.password);
        // After reset, return to login screen
        forgotPasswordMode.value = false;
        authMode.value = 'login';
        authModalOpen.value = false;
      }
    } else if (authMode.value === 'signup') {
      await authStore.signup({ username: form.value.username, name: form.value.username, email: form.value.email, password: form.value.password });
      authModalOpen.value = false;
    } else {
      if (authStore.requiresOtp) {
        // OTP verification step
        await authStore.verifyLoginOtp(otp.value);
        authModalOpen.value = false;
        authStore.requiresOtp = false;
        otp.value = '';
      } else {
        await authStore.login(form.value.email, form.value.password);
        // If backend now requires OTP, authStore.requiresOtp will become true and UI will stay open
        if (!authStore.requiresOtp) {
          authModalOpen.value = false;
        }
      }
    }
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.error || requestError.message || 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
const logout = () => { authStore.logout(); profileMenuOpen.value = false; mobileMenuOpen.value = false; };
const handleScroll = () => { isScrolled.value = window.scrollY > 20; };
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header :class="['fixed top-0 z-50 w-full transition-all duration-300', isScrolled ? 'bg-white/95 py-3 shadow-md backdrop-blur' : 'bg-transparent py-5']">
    <div class="container mx-auto flex items-center justify-between px-4 md:px-6">
      <router-link to="/" class="flex items-center gap-2" @click="profileMenuOpen = false"><BrandLogo /><span class="font-heading text-2xl font-bold text-dark">TosRean</span></router-link>
      <nav class="hidden items-center gap-10 lg:flex"><router-link v-for="link in links" :key="link.to" :to="link.to" class="font-medium text-dark-light transition hover:text-primary" active-class="text-primary">{{ link.label }}</router-link></nav>

      <div class="hidden items-center lg:flex">
        <router-link to="/favorites" aria-label="Favorite courses" class="relative mr-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-dark-light transition hover:bg-rose-50 hover:text-rose-500">
          <Heart class="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          <span v-if="wishlistCount" class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white">{{ wishlistCount }}</span>
        </router-link>
        <button v-if="!isLoggedIn" type="button" class="rounded-full bg-primary px-6 py-2.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg" @click="openAuth('login')">Get Started</button>
        <div v-else class="relative">
          <button type="button" class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition hover:shadow-md" :aria-expanded="profileMenuOpen" @click="profileMenuOpen = !profileMenuOpen">
            <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-white"><img v-if="authStore.user?.avatar" :src="authStore.user.avatar" :alt="`${displayName} avatar`" class="h-full w-full object-cover"><span v-else>{{ initials }}</span></span><span class="max-w-[130px] truncate font-semibold text-dark">{{ displayName }}</span><ChevronDown class="h-4 w-4 text-slate-400" />
          </button>
          <div v-if="profileMenuOpen" class="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
            <router-link :to="profileRoute" class="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" @click="profileMenuOpen = false">View profile</router-link>
            <router-link to="/dashboard" class="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" @click="profileMenuOpen = false">Dashboard</router-link>
            <button type="button" class="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50" @click="logout"><LogOut class="h-4 w-4" /> Log out</button>
          </div>
        </div>
      </div>
      <button type="button" class="p-2 text-dark lg:hidden" aria-label="Open menu" @click="mobileMenuOpen = true"><Menu class="h-6 w-6" /></button>
    </div>

    <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 flex lg:hidden">
      <button type="button" class="fixed inset-0 bg-dark/50" aria-label="Close menu" @click="closeMenu"></button>
      <aside class="relative h-full w-4/5 max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
        <div class="flex items-center justify-between border-b pb-5"><router-link to="/" class="flex items-center gap-2" @click="closeMenu"><BrandLogo size="sm" /><span class="font-heading text-xl font-bold">TosRean</span></router-link><button type="button" class="rounded-full p-2 hover:bg-light" aria-label="Close menu" @click="closeMenu"><X class="h-6 w-6" /></button></div>
        <nav class="flex flex-col gap-1 py-5"><router-link v-for="link in links" :key="link.to" :to="link.to" class="border-b py-3 font-medium text-dark" @click="closeMenu">{{ link.label }}</router-link><router-link to="/favorites" class="flex items-center justify-between border-b py-3 font-medium text-dark" @click="closeMenu"><span class="flex items-center gap-2"><Heart class="h-4 w-4 text-rose-500" /> Favorite Courses</span><span v-if="wishlistCount" class="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600">{{ wishlistCount }}</span></router-link></nav>
        <div v-if="isLoggedIn" class="rounded-2xl bg-slate-50 p-4"><div class="flex items-center gap-3"><span class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary font-bold text-white"><img v-if="authStore.user?.avatar" :src="authStore.user.avatar" :alt="`${displayName} avatar`" class="h-full w-full object-cover"><span v-else>{{ initials }}</span></span><div class="min-w-0"><p class="text-xs uppercase tracking-widest text-slate-500">Signed in as</p><p class="truncate font-semibold text-dark">{{ displayName }}</p></div></div><router-link :to="profileRoute" class="mt-4 block rounded-xl bg-primary px-4 py-3 text-center font-medium text-white" @click="closeMenu">Open profile</router-link><button type="button" class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-red-600 hover:bg-red-50" @click="logout"><LogOut class="h-4 w-4" /> Log out</button></div>
        <button v-else type="button" class="mt-4 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white" @click="openAuth('login')">Get Started</button>
      </aside>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="authModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" @click.self="closeAuth">
      <section class="relative my-8 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button type="button" class="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close authentication dialog" @click="closeAuth"><X class="h-5 w-5" /></button>
        <div class="mb-6 pr-8">
            <p class="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">TosRean</p>
            <h2 id="auth-title" class="font-heading text-3xl font-bold text-slate-950">{{ authMode === 'login' ? 'Welcome back' : 'Start learning today' }}</h2>
            <p class="mt-2 text-slate-500">{{ authMode === 'login' ? 'Sign in to continue your learning journey.' : 'Create your account and learn at your own pace.' }}</p>
        </div>
        <div class="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button type="button" :class="['rounded-lg px-4 py-2.5 text-sm font-semibold transition', authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-slate-500']" @click="switchMode('login')">Login</button>
            <button type="button" :class="['rounded-lg px-4 py-2.5 text-sm font-semibold transition', authMode === 'signup' ? 'bg-white text-primary shadow-sm' : 'text-slate-500']" @click="switchMode('signup')">Sign Up</button>
        </div>
        <form class="space-y-4" @submit.prevent="submitAuth">
          <div v-if="authMode === 'signup'"><label for="auth-username" class="mb-1.5 block text-sm font-semibold text-slate-700">Username</label><input id="auth-username" v-model="form.username" type="text" autocomplete="username" required placeholder="Enter your name" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"></div>
          <div v-if="!(forgotPasswordMode && authStore.resetPhase === 'newPassword')"><label for="auth-email" class="mb-1.5 block text-sm font-semibold text-slate-700">Email</label><input id="auth-email" v-model="form.email" type="email" autocomplete="email" required placeholder="Enter your email" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"></div>
          <div v-if="!forgotPasswordMode || authStore.resetPhase !== 'email'"><label for="auth-password" class="mb-1.5 block text-sm font-semibold text-slate-700">{{ authStore.resetPhase === 'newPassword' ? 'New Password' : 'Password' }}</label><input id="auth-password" v-model="form.password" type="password" :autocomplete="authMode === 'signup' ? 'new-password' : 'current-password'" required placeholder="Enter password" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"></div>
          <div v-if="authStore.requiresOtp || (forgotPasswordMode && authStore.resetPhase === 'otp')">
              <label for="auth-otp" class="mb-1.5 block text-sm font-semibold text-slate-700">OTP</label>
              <input id="auth-otp" v-model="otp" type="text" required placeholder="Enter the OTP" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
          </div>
          <p v-if="error" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{{ error }}</p>
          <button type="submit" :disabled="isSubmitting" class="w-full rounded-xl bg-primary px-4 py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">{{ isSubmitting ? 'Please wait...' : authMode === 'login' ? (authStore.requiresOtp || (forgotPasswordMode && authStore.resetPhase === 'otp') ? 'Verify OTP' : 'Login') : 'Create account' }}</button>
          <div v-if="authMode === 'login' && !authStore.requiresOtp && !forgotPasswordMode" class="text-center mt-2"><button type="button" class="text-sm text-primary underline" @click="startForgotPassword">Forgot password?</button></div>
        </form>
      </section>
    </div>
  </Teleport>
</template>
