<script setup>
import { ArrowRight, Play, Star } from "lucide-vue-next";
</script>

<template>
  <main class="pt-20">
    <section
      class="relative min-h-[650px] md:min-h-[700px] overflow-hidden flex items-center"
    >
      <!-- Background Image -->
      <div class="absolute inset-0 -z-20">
        <img
          src="/src/image/education-bg.png"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 -z-10 bg-[#071d49]/60"></div>

      <!-- Blue Gradient -->
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
              class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-8 text-white"
            >
              Learning is What You <br class="hidden lg:block" />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r bg-purple-300"
                >Make of It</span
              >.
              <br class="block" />
              Make it
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r bg-purple-300"
                >Yours</span
              >
              at TosRean.
            </h1>

            <p
              class="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Unlock your potential with free document courses and expert video
              masterclasses. Build skills for today, tomorrow, and beyond.
            </p>

            <div
              class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
