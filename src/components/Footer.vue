<script setup>
import BrandLogo from './BrandLogo.vue';
</script>

<template>
  <footer class="bg-dark text-white">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid gap-9 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-10 md:py-12">
        <div class="sm:col-span-2 md:col-auto">
          <router-link to="/" class="inline-flex items-center gap-2" aria-label="TosRean home">
            <BrandLogo size="lg" />
            <span class="font-heading text-xl font-bold tracking-tight text-white">TosRean</span>
          </router-link>
          <p class="mt-4 max-w-xs text-sm leading-6 text-white/60">
            Learn IT skills at your own pace.
          </p>
        </div>

        <div>
          <h2 class="font-heading text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
          <nav class="mt-4 flex flex-col items-start gap-2.5 text-sm" aria-label="Explore">
            <router-link to="/" class="text-white/60 transition-colors duration-200 hover:text-primary">Home</router-link>
            <router-link to="/courses" class="text-white/60 transition-colors duration-200 hover:text-primary">Courses</router-link>
            <router-link to="/categories" class="text-white/60 transition-colors duration-200 hover:text-primary">Categories</router-link>
            <router-link to="/about" class="text-white/60 transition-colors duration-200 hover:text-primary">About</router-link>
          </nav>
        </div>

        <div>
          <h2 class="font-heading text-sm font-semibold uppercase tracking-wider text-white">Support</h2>
          <nav class="mt-4 flex flex-col items-start gap-2.5 text-sm text-white/60" aria-label="Support">
            <router-link to="/contact" class="transition-colors duration-200 hover:text-primary">Contact</router-link>
            <span>Help Center</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </nav>
        </div>
      </div>

      <div class="flex flex-col gap-3 border-t border-white/10 py-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 TosRean. All rights reserved.</p>
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Privacy Policy</span>
          <span aria-hidden="true">&middot;</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
</template>
