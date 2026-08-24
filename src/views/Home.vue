<script setup>
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Courses from '../components/Courses.vue';
import WorkshopBanner from '../components/WorkshopBanner.vue';
import Instructors from '../components/Instructors.vue';
import Newsletter from '../components/Newsletter.vue';
import Events from '../components/Events.vue';
import Blog from '../components/Blog.vue';
import DualCta from '../components/DualCta.vue';
</script>

<template>
  <main class="flex-grow">
    <Hero />
    <About />
    <Courses />
    <WorkshopBanner />
    <Instructors />
    <Newsletter />
    <Events />
    <Blog />
    <DualCta />
  </main>
</template>
