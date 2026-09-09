<script setup>
import { ArrowRight, BookOpen, CircleCheck, Compass, Layers3, Sparkles, Target, Users } from 'lucide-vue-next';

const values = [
  {
    icon: BookOpen,
    title: 'Learning without limits',
    description: 'Clear, practical courses that help every learner make progress at their own pace.',
  },
  {
    icon: Users,
    title: 'Built for real people',
    description: 'A friendly learning space for curious beginners and professionals growing their skills.',
  },
  {
    icon: Sparkles,
    title: 'Skills that matter',
    description: 'Focused learning paths for the tools, ideas, and careers shaping tomorrow.',
  },
];

const promises = [
  'Learn from structured, easy-to-follow lessons.',
  'Build skills through practical, career-focused topics.',
  'Study on your schedule from any device.',
];

const stats = [
  { value: '120+', label: 'Curated courses' },
  { value: '15K+', label: 'Active learners' },
  { value: '4.8/5', label: 'Learner rating' },
];

const journeySteps = [
  { number: '01', title: 'Find your direction', detail: 'Explore a skill that sparks your curiosity.' },
  { number: '02', title: 'Build your rhythm', detail: 'Learn in focused steps that fit your life.' },
  { number: '03', title: 'Make it real', detail: 'Turn knowledge into confident next moves.' },
];
</script>

<template>
  <main class="overflow-hidden bg-light pt-28">
    <section class="relative pb-20 pt-10 md:pb-28 md:pt-16">
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
          <!-- <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link to="/courses" class="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark">
              Explore courses <ArrowRight class="h-5 w-5" />
            </router-link>
            <router-link to="/categories" class="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3.5 font-semibold text-dark transition hover:border-primary hover:text-primary">
              Browse categories
            </router-link>
          </div> -->
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

        <!-- <div class="relative mx-auto w-full max-w-xl pb-10 pr-0 md:pr-12 lg:mx-0">
          <div class="absolute inset-x-4 inset-y-8 rounded-[2.5rem] bg-primary/15 -rotate-3"></div>
          <img src="/src/image/Group_Study.jpg" alt="Learners studying together" class="relative h-[360px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[460px]" />
          <div class="absolute -bottom-1 left-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur md:left-8 md:p-5">
            <p class="font-heading text-2xl font-bold text-primary">15K+</p>
            <p class="text-sm font-medium text-dark-lighter">Learners growing together</p>
          </div>
          <div class="absolute -right-2 top-10 hidden w-40 rounded-2xl border-4 border-white bg-dark p-2 shadow-2xl md:block">
            <img src="/src/image/Group_Meeting.jpg" alt="TosRean learning community" class="h-28 w-full rounded-xl object-cover" />
            <p class="px-2 pb-1 pt-2 text-xs font-semibold text-white">Learn together</p>
          </div>
        </div> -->
      </div>
    </section>
<!-- 
    <section class="relative z-10 -mt-8 pb-12 md:-mt-12 md:pb-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-dark/5 sm:grid-cols-3">
          <div v-for="(stat, index) in stats" :key="stat.label" :class="['px-6 py-6 text-center md:py-7', index !== stats.length - 1 ? 'border-b border-gray-100 sm:border-b-0 sm:border-r' : '']">
            <p class="font-heading text-2xl font-bold text-primary md:text-3xl">{{ stat.value }}</p>
            <p class="mt-1 text-sm font-medium text-dark-lighter">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <section class="bg-white py-20 md:py-24">
      <div class="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
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
        </div>
      </div>
    </section>

    <section class="py-20 md:py-24">
      <div class="container mx-auto px-4 md:px-6">
        <div class="relative overflow-hidden rounded-3xl bg-dark px-6 py-12 text-center shadow-xl md:px-12 md:py-16">
          <div class="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-2xl"></div>
          <div class="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-2xl"></div>
          <div class="relative mx-auto max-w-2xl">
            <Target class="mx-auto h-9 w-9 text-accent-light" />
            <h2 class="mt-5 font-heading text-3xl font-bold text-white md:text-4xl">Start building your next skill today.</h2>
            <p class="mt-4 text-lg text-white/75">Choose a topic, learn at a comfortable pace, and turn curiosity into progress.</p>
            <router-link to="/courses" class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-light">
              Find your course <ArrowRight class="h-5 w-5" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
