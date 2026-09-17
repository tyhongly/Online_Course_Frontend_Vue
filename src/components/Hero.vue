<script setup>
import { ArrowRight, Play, Star } from "lucide-vue-next";
</script>

<template>
  <section class="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
    <!-- Background Elements -->
    <div
      class="absolute top-0 right-0 -z-10 w-[800px] h-[900px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
    ></div>
    <div
      class="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"
    ></div>

    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <!-- Left Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-8 text-dark"
          >
            Learning is What You <br class="hidden lg:block" />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
              >Make of It</span
            >.
            <br class="block" />
            Make it
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
              >Yours</span
            >
            at TosRean.
          </h1>

          <p
            class="text-lg md:text-xl text-dark-lighter mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Unlock your potential with free document courses and expert video
            masterclasses. Build skills for today, tomorrow, and beyond.
          </p>

          <div
            class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          ></div>
        </div>

        <!-- Right Image/Illustration -->
        <div
          class="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto mt-10 lg:mt-0"
        >
          <!-- <div
            class="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <img
              src="/src/image/Group_Study.jpg"
              alt="Students learning"
              class="w-full h-auto object-cover"
            />
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
