<script setup>
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Courses from "../components/Courses.vue";
import WorkshopBanner from "../components/WorkshopBanner.vue";
import PopularCategory from "../components/PopularCategory.vue";
import Newsletter from "../components/Newsletter.vue";
import Blog from "../components/Blog.vue";
import DualCta from "../components/DualCta.vue";
</script>

<template>
  <main class="flex-grow">
    <Hero />
    <!-- <About /> -->
    <PopularCategory />
    <Courses />
    <!-- <WorkshopBanner /> -->
    <Newsletter />
    <Blog />
    <DualCta />
  </main>
</template>
