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
<<<<<<< Updated upstream
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
=======
      class="absolute inset-0 -z-10
      bg-gradient-to-r
      from-[#061a3d]/90
      via-[#0b2d66]/65
      to-[#123f83]/45"
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 mx-auto max-w-7xl
      w-full px-4 md:px-6"
    >
      <div class="max-w-4xl">

        <!-- Heading -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl
          font-bold font-heading
          leading-tight
          mb-8
          text-white"
        >
          Learning is What You
          <br class="hidden lg:block" />

          <span
            class="text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-violet-400
            to-purple-500"
          >
            Make of It
          </span>.

          <br />

          Make it
          <span
            class="text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-violet-400
            to-purple-500"
          >
            Yours
          </span>
          at TosRean.
        </h1>

        <!-- Description -->
        <p
          class="text-lg md:text-xl
          text-white/80
          mb-10
          max-w-2xl
          leading-relaxed"
        >
          Unlock your potential with free document courses and expert video
          masterclasses. Build skills for today, tomorrow, and beyond.
        </p>

        <!-- Buttons -->
        <div
          class="flex flex-col sm:flex-row
          items-center
          lg:justify-start
          gap-4"
        >
          <button
            class="px-7 py-3.5
            rounded-xl
            bg-white
            text-[#0b2d66]
            font-semibold
            shadow-lg
            hover:bg-white/90
            transition-all duration-300"
          >
            Explore Courses
          </button>

          <button
            class="px-7 py-3.5
            rounded-xl
            border border-white/40
            bg-white/10
            backdrop-blur-sm
            text-white
            font-semibold
            hover:bg-white/20
            transition-all duration-300"
          >
            Start Learning
          </button>
        </div>

>>>>>>> Stashed changes
      </div>
    </div>
  </section>
</main>
</template>