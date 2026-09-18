<script setup>
import rymSavryImage from "../image/rym-savry.png";
import soutSinatImage from "../image/sout-sinat.png";

const courses = [
  {
    icon: "🌐",
    title: "HTML, CSS & JavaScript",
    description: "Build modern websites from scratch.",
  },
  {
    icon: "⚛️",
    title: "React JS",
    description: "Create powerful interactive interfaces.",
  },
  {
    icon: "💻",
    title: "Web Development",
    description: "Learn full web development skills.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Design beautiful user experiences.",
  },
];

const instructors = [
  {
    name: "Ty Hongly",
    role: "Leader",
    image: null,
  },
  {
    name: "Rym Savry",
    role: "Member",
    image: rymSavryImage,
  },
  {
    name: "Sout Sinat",
    role: "Member",
    image: soutSinatImage,
  },
];
</script>

<template>
  <main class="min-h-screen bg-white text-slate-800">
    <!-- ================= WHO WE ARE ================= -->
    <section class="w-full pb-20 pt-32">
      <div class="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
          We're More Than Just a Course Platform
        </h2>

        <p class="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
          Online Course is a dedicated learning platform that provides
          high-quality courses in web development, programming, design, and
          modern technologies.
        </p>

        <p class="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
          We are passionate about helping students and developers gain practical
          skills and create better opportunities for their future.
        </p>
      </div>
    </section>

    <!-- ================= MISSION ================= -->
    <section class="bg-blue-50 py-20">
      <div
        class="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2"
      >
        <div>
          <span
            class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600"
          >
            Our Mission
          </span>

          <h2 class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
            Make Quality Education Accessible to Everyone
          </h2>

          <p class="mt-6 leading-8 text-slate-600">
            Our mission is to break down barriers to learning by providing
            practical, affordable, and flexible online courses.
          </p>

          <p class="mt-4 leading-8 text-slate-600">
            We want every learner to gain real skills, build projects, and grow
            their confidence for a successful career.
          </p>
        </div>

        <div class="flex justify-center">
          <div class="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div class="text-8xl">🎯</div>

            <h3 class="mt-5 text-2xl font-bold text-blue-600">
              Better Learning
            </h3>

            <p class="mt-2 text-slate-600">For a Brighter Future</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ================= Team ================= -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center">
          <span
            class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600"
          >
            Our Team
          </span>

          <h2 class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
            Meet Our Team
          </h2>

          <p class="mt-4 text-slate-600">
            Passionate professionals ready to guide you.
          </p>
        </div>

        <!-- Center 3 cards -->
        <div class="mt-12 flex flex-wrap justify-center gap-6">
          <div
            v-for="instructor in instructors"
            :key="instructor.name"
            class="w-full max-w-xs rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-100 text-4xl"
            >
              <img
                v-if="instructor.image"
                :src="instructor.image"
                :alt="`${instructor.name}'s profile picture`"
                class="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <h3 class="mt-5 font-bold text-slate-900">
              {{ instructor.name }}
            </h3>

            <p class="mt-2 text-sm text-blue-600">
              {{ instructor.role }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
