```vue
<script setup>
import rymSavryImage from '../image/rym-savry.png';
import soutSinatImage from '../image/sinat.png';

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
]

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
]
</script>

<template>
<<<<<<< Updated upstream
<<<<<<< HEAD
  <main class="overflow-hidden bg-light pt-28">
    <section class="relative pb-20 pt-0 md:pb-28 md:pt-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.12)_1px,transparent_0)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
      <div class="absolute -right-32 top-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl"></div>
      <div class="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl"></div>

      <div class="container relative mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div class="max-w-xl">
          <span class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <Sparkles class="h-4 w-4" /> About TosRean
          </span>
          <h1 class="font-heading text-4xl font-bold leading-[1.08] text-dark md:text-5xl lg:text-6xl">
            Learn boldly.<br />
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Move forward.</span>
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-dark-lighter md:text-xl">
            TosRean brings useful learning paths, supportive guidance, and flexible study together in one place.
          </p>
        </div>

        <aside class="relative mx-auto w-full max-w-md lg:ml-auto">
          <div class="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/25 blur-2xl"></div>
          <div class="relative overflow-hidden rounded-[2rem] bg-dark p-5 shadow-2xl shadow-dark/25 sm:p-7">
            <div class="absolute -right-10 -top-12 h-44 w-44 rounded-full border-[18px] border-primary/25"></div>
            <div class="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-accent/20 blur-2xl"></div>
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">The TosRean way</p>
                  <h2 class="mt-2 font-heading text-2xl font-bold text-white">A little progress, every day.</h2>
                </div>
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent-light ring-1 ring-white/15">
                  <Compass class="h-5 w-5" />
                </span>
              </div>

              <div class="mt-8 space-y-3">
                <article v-for="step in journeySteps" :key="step.number" class="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:-translate-x-1 hover:bg-white/[0.12]">
                  <span class="font-heading text-lg font-bold text-accent-light">{{ step.number }}</span>
                  <span>
                    <span class="block text-sm font-bold text-white">{{ step.title }}</span>
                    <span class="mt-1 block text-xs leading-relaxed text-white/60">{{ step.detail }}</span>
                  </span>
                </article>
              </div>

              <div class="mt-7 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/70">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"><Layers3 class="h-4 w-4" /></span>
                One platform. Many possible futures.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
    
    <section class="bg-white py-20 md:py-24">
      <div class="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <span class="mb-4 block text-sm font-semibold uppercase tracking-wider text-primary">Our mission</span>
          <h2 class="font-heading text-3xl font-bold leading-tight text-dark md:text-4xl">Make a great education feel possible for everyone.</h2>
          <p class="mt-6 leading-relaxed text-dark-lighter">
            We believe that the next opportunity should not depend on where you live, your schedule, or how you started. TosRean helps learners find a direction, build confidence, and keep moving.
          </p>
          <ul class="mt-8 space-y-4">
            <li v-for="promise in promises" :key="promise" class="flex items-start gap-3 text-dark">
              <CircleCheck class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>{{ promise }}</span>
            </li>
          </ul>
        </div>

        <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <article v-for="value in values" :key="value.title" class="group rounded-2xl border border-gray-100 bg-light p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white hover:shadow-xl">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary group-hover:text-white">
              <component :is="value.icon" class="h-6 w-6 text-primary transition group-hover:text-white" />
            </div>
            <h3 class="font-heading text-lg font-bold text-dark">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-dark-lighter">{{ value.description }}</p>
          </article>
=======
  <main class="bg-white pt-24 text-dark">
    <section class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-light to-accent/10 py-20 md:py-28">
      <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"></div>
      <div class="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl"></div>
      <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
        <div class="max-w-2xl">
          <span class="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">About TosRean</span>
          <h1 class="mt-6 font-heading text-4xl font-bold leading-tight text-dark md:text-6xl">Learn. <span class="text-primary">Grow.</span><br /><span class="text-primary">Succeed.</span></h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-dark-lighter">TosRean is a modern learning platform designed to help you build real-world skills through practical, high-quality online courses.</p>
          <div class="mt-8 flex flex-wrap gap-4">
            <router-link to="/courses" class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark">Explore courses <ArrowRight class="h-4 w-4" /></router-link>
            <router-link to="/contact" class="rounded-xl border border-primary px-6 py-3.5 font-semibold text-primary transition hover:bg-primary/5">Contact us</router-link>
=======
  <main class="min-h-screen bg-white text-slate-800">

  


    <!-- ================= WHO WE ARE ================= -->
    <section class="py-20">
      <div
        class="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2"
      >

        <div
          class="rounded-3xl bg-slate-100 p-12 text-center shadow-sm"
        >
          <div class="text-8xl">
            💻
>>>>>>> Stashed changes
          </div>

          <h3 class="mt-6 text-2xl font-bold text-slate-900">
            Better Skills
          </h3>

          <p class="mt-2 text-blue-600">
            Brighter Future
          </p>
        </div>
<<<<<<< Updated upstream
        <div class="relative mx-auto flex h-80 w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-primary/15">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.14),transparent_36%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,.16),transparent_38%)]"></div>
          <div class="relative text-center"><span class="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/30"><GraduationCap class="h-14 w-14" /></span><p class="mt-6 font-heading text-2xl font-bold text-dark">Start learning today</p><p class="mt-2 text-dark-lighter">Your next skill is waiting.</p></div>
>>>>>>> 0f3188b (update about us)
=======


        <div>
        

          <h2
            class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            We're More Than Just a Course Platform
          </h2>

          <p class="mt-6 leading-8 text-slate-600">
            Online Course is a dedicated learning platform that provides
            high-quality courses in web development, programming, design,
            and modern technologies.
          </p>

          <p class="mt-4 leading-8 text-slate-600">
            We are passionate about helping students and developers gain
            practical skills and create better opportunities for their
            future.
          </p>
>>>>>>> Stashed changes
        </div>

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

          <h2
            class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Make Quality Education Accessible to Everyone
          </h2>

          <p class="mt-6 leading-8 text-slate-600">
            Our mission is to break down barriers to learning by providing
            practical, affordable, and flexible online courses.
          </p>

          <p class="mt-4 leading-8 text-slate-600">
            We want every learner to gain real skills, build projects,
            and grow their confidence for a successful career.
          </p>
        </div>


        <div class="flex justify-center">
          <div
            class="rounded-3xl bg-white p-12 text-center shadow-lg"
          >
            <div class="text-8xl">
              🎯
            </div>

            <h3 class="mt-5 text-2xl font-bold text-blue-600">
              Better Learning
            </h3>

            <p class="mt-2 text-slate-600">
              For a Brighter Future
            </p>
          </div>
        </div>

      </div>
    </section>


    <!-- ================= COURSES ================= -->
    <section class="py-20">
      <div class="mx-auto max-w-7xl px-6">

        <div class="text-center">
          <span
            class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600"
          >
            What We Offer
          </span>

          <h2
            class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Explore Our Courses
          </h2>

          <p
            class="mx-auto mt-4 max-w-2xl text-slate-600"
          >
            Learn practical skills and stay ahead in the technology world.
          </p>
        </div>


        <div
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="course in courses"
            :key="course.title"
            class="group rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >

            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-4xl"
            >
              {{ course.icon }}
            </div>

            <h3 class="mt-5 font-bold text-slate-900">
              {{ course.title }}
            </h3>

            <p
              class="mt-2 text-sm leading-6 text-slate-500"
            >
              {{ course.description }}
            </p>

            <NuxtLink
              to="/courses"
              class="mt-4 inline-block text-sm font-semibold text-blue-600"
            >
              Learn More →
            </NuxtLink>

          </div>
        </div>

      </div>
    </section>


    
    <!-- ================= INSTRUCTORS ================= -->
    <section class="py-20 bg-slate-50">
      <div class="mx-auto max-w-7xl px-6 ">

        <div class="text-center">
          <span
            class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600"
          >
            Our Team
          </span>

          <h2
            class="mt-5 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Meet Our Instructors
          </h2>

          <p class="mt-4 text-slate-600">
            Passionate professionals ready to guide you.
          </p>
        </div>


        <div
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >

          <div
            v-for="instructor in instructors"
            :key="instructor.name"
            class="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >

            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl"
            >
              <img
                v-if="instructor.image"
                :src="instructor.image"
                :alt="`${instructor.name}'s profile picture`"
                class="h-full w-full rounded-full object-cover"
              >
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
