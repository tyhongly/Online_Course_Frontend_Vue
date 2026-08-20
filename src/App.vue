<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import About from './components/About.vue';
import Courses from './components/Courses.vue';
import WorkshopBanner from './components/WorkshopBanner.vue';
import Instructors from './components/Instructors.vue';
import Newsletter from './components/Newsletter.vue';
import Events from './components/Events.vue';
import Blog from './components/Blog.vue';
import DualCta from './components/DualCta.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen font-sans text-dark bg-white flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <Features />
      <About />
      <Courses />
      <WorkshopBanner />
      <Instructors />
      <Newsletter />
      <Events />
      <Blog />
      <DualCta />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Import custom fonts in index.html, handled globally via Tailwind */
</style>
