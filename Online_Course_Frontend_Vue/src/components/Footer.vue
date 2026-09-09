<script setup>
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-vue-next';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="relative overflow-hidden bg-dark text-white">
    <div class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl"></div>
    <div class="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl"></div>

    <div class="container relative mx-auto px-2 md:px-4">
      <div class="grid gap-10 py-10 md:grid-cols-3 md:gap-8 xl:gap-16 xl:py-20">
        <div class="min-w-0">
          <router-link to="/" class="inline-flex items-center gap-2">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-xl font-bold text-white shadow-lg shadow-primary/30">T</span>
            <span class="font-heading text-2xl font-bold text-white">TosRean</span>
          </router-link>
          <p class="mt-5 max-w-sm leading-relaxed text-white/70">
            A welcoming place to explore new skills, keep your momentum, and learn on your own terms.
          </p>
          <div class="mt-7 flex items-center gap-3">
            <a href="#" aria-label="Follow TosRean on Facebook" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white">
              <Facebook class="h-4 w-4" />
            </a>
            <a href="#" aria-label="Follow TosRean on Twitter" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white">
              <Twitter class="h-4 w-4" />
            </a>
            <a href="#" aria-label="Follow TosRean on LinkedIn" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white">
              <Linkedin class="h-4 w-4" />
            </a>
            <a href="#" aria-label="Follow TosRean on Instagram" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white">
              <Instagram class="h-4 w-4" />
            </a>
          </div>
        </div>

      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Our Latest Articles</span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading text-white">Stay Updated With Latest News</h2>
      </div>

        <div class="min-w-0">
          <h2 class="font-heading text-base font-bold text-white">Explore</h2>
          <nav class="mt-5 flex flex-col gap-2 text-sm text-white/65" aria-label="Footer navigation">
            <router-link to="/" class="w-fit transition hover:text-white">Home</router-link>
            <router-link to="/courses" class="w-fit transition hover:text-white">Courses</router-link>
            <router-link to="/categories" class="w-fit transition hover:text-white">Categories</router-link>
            <router-link to="/about" class="w-fit transition hover:text-white">About us</router-link>
          </nav>
        </div>
      </div>

      <div class="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ currentYear }} TosRean. All rights reserved.</p>
        <p>Learn at your own pace.</p>
      </div>
    </div>
  </footer>
</template>
