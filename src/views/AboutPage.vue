<script setup>
import { ArrowRight, Award, BookOpen, Code2, Database, GraduationCap, Laptop, Lightbulb, Palette, Rocket, Target, Users } from 'lucide-vue-next';

const courses = [
  { icon: Code2, title: 'HTML, CSS & JavaScript', description: 'Build modern websites from scratch.' },
  { icon: Laptop, title: 'React JS', description: 'Create powerful interactive interfaces.' },
  { icon: BookOpen, title: 'Web Development', description: 'Learn full web development skills.' },
  { icon: Palette, title: 'UI/UX Design', description: 'Design beautiful user experiences.' },
  { icon: Lightbulb, title: 'Programming Fundamentals', description: 'Understand core programming concepts.' },
  { icon: Database, title: 'Database & Backend', description: 'Learn how applications store data.' },
  { icon: Rocket, title: 'Real-world Projects', description: 'Build projects for your portfolio.' },
];

const benefits = [
  { icon: Users, title: 'Expert Instructors', description: 'Learn from experienced professionals in the industry.' },
  { icon: Code2, title: 'Practical Learning', description: 'Build real projects instead of learning only theory.' },
  { icon: BookOpen, title: 'Learn at Your Pace', description: 'Study whenever and wherever you want.' },
  { icon: Award, title: 'Certificates', description: 'Showcase your skills and achievements.' },
];

const instructors = [
  { initials: 'SD', name: 'Sokha Dara', role: 'Web Development' },
  { initials: 'CR', name: 'Chanvibol Rith', role: 'React Developer' },
  { initials: 'SP', name: 'Sothea Peng', role: 'UI/UX Designer' },
  { initials: 'SL', name: 'Srey Leak', role: 'Database Expert' },
];
</script>

<template>
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
          </div>
        </div>
        <div class="relative mx-auto flex h-80 w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-primary/15">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.14),transparent_36%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,.16),transparent_38%)]"></div>
          <div class="relative text-center"><span class="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/30"><GraduationCap class="h-14 w-14" /></span><p class="mt-6 font-heading text-2xl font-bold text-dark">Start learning today</p><p class="mt-2 text-dark-lighter">Your next skill is waiting.</p></div>
>>>>>>> 0f3188b (update about us)
        </div>
      </div>
    </section>

    <section class="py-20 md:py-24"><div class="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20"><div class="flex min-h-80 items-center justify-center rounded-3xl bg-light p-10 text-center"><div><Laptop class="mx-auto h-20 w-20 text-primary" /><h2 class="mt-6 font-heading text-3xl font-bold">Better skills</h2><p class="mt-2 text-lg text-accent">Brighter future</p></div></div><div><span class="text-sm font-bold uppercase tracking-wider text-primary">Who we are</span><h2 class="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">We’re more than just a course platform.</h2><p class="mt-6 leading-8 text-dark-lighter">TosRean provides quality learning in web development, programming, design, and modern technologies.</p><p class="mt-4 leading-8 text-dark-lighter">We are passionate about helping learners gain practical skills and create better opportunities for their future.</p></div></div></section>

    <section class="bg-primary/5 py-20 md:py-24"><div class="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20"><div><span class="text-sm font-bold uppercase tracking-wider text-primary">Our mission</span><h2 class="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Make quality education accessible to everyone.</h2><p class="mt-6 leading-8 text-dark-lighter">We break down barriers to learning with practical, affordable, and flexible online courses.</p><p class="mt-4 leading-8 text-dark-lighter">Every learner deserves the confidence to build projects, develop real skills, and pursue a successful career.</p></div><div class="mx-auto rounded-3xl bg-white p-12 text-center shadow-xl shadow-primary/10"><Target class="mx-auto h-20 w-20 text-primary" /><h3 class="mt-6 font-heading text-2xl font-bold text-primary">Better learning</h3><p class="mt-2 text-dark-lighter">For a brighter future</p></div></div></section>

    <section class="py-20 md:py-24"><div class="mx-auto max-w-7xl px-4 md:px-6"><div class="mx-auto max-w-2xl text-center"><span class="text-sm font-bold uppercase tracking-wider text-primary">What we offer</span><h2 class="mt-4 font-heading text-3xl font-bold md:text-4xl">Explore our courses</h2><p class="mt-4 text-dark-lighter">Learn practical skills and stay ahead in the technology world.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><article v-for="course in courses" :key="course.title" class="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"><component :is="course.icon" class="h-7 w-7" /></span><h3 class="mt-5 font-heading font-bold">{{ course.title }}</h3><p class="mt-2 text-sm leading-6 text-dark-lighter">{{ course.description }}</p><router-link to="/courses" class="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">Learn more <ArrowRight class="h-4 w-4" /></router-link></article></div></div></section>

    <section class="bg-light py-20 md:py-24"><div class="mx-auto max-w-7xl px-4 md:px-6"><div class="text-center"><span class="text-sm font-bold uppercase tracking-wider text-primary">Why choose us</span><h2 class="mt-4 font-heading text-3xl font-bold md:text-4xl">Your success is our priority.</h2></div><div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"><article v-for="benefit in benefits" :key="benefit.title" class="rounded-2xl bg-white p-7 shadow-sm"><component :is="benefit.icon" class="h-9 w-9 text-primary" /><h3 class="mt-5 font-heading font-bold">{{ benefit.title }}</h3><p class="mt-2 text-sm leading-6 text-dark-lighter">{{ benefit.description }}</p></article></div></div></section>

    <section class="py-20 md:py-24"><div class="mx-auto max-w-7xl px-4 md:px-6"><div class="text-center"><span class="text-sm font-bold uppercase tracking-wider text-primary">Our team</span><h2 class="mt-4 font-heading text-3xl font-bold md:text-4xl">Meet our instructors</h2><p class="mt-4 text-dark-lighter">Passionate professionals ready to guide you.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><article v-for="instructor in instructors" :key="instructor.name" class="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 font-heading text-2xl font-bold text-primary">{{ instructor.initials }}</span><h3 class="mt-5 font-heading font-bold">{{ instructor.name }}</h3><p class="mt-2 text-sm text-primary">{{ instructor.role }}</p></article></div></div></section>

    <section class="bg-gradient-to-r from-primary-dark to-accent py-20 text-center text-white"><div class="mx-auto max-w-2xl px-4"><h2 class="font-heading text-3xl font-bold md:text-4xl">Start your learning journey.</h2><p class="mt-4 text-lg text-white/80">Ready to improve your skills and build something amazing?</p><router-link to="/courses" class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-light">View courses <ArrowRight class="h-4 w-4" /></router-link></div></section>
  </main>
</template>
