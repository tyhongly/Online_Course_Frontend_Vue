<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, BookOpenText, Compass, Sparkles, Target } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';
import { useStudentDashboard } from '../../composables/useStudentDashboard.js';
import DashboardStatsRow from '../../components/dashboard/DashboardStatsRow.vue';
import DashboardCourseCard from '../../components/dashboard/DashboardCourseCard.vue';

const router = useRouter();
const { currentUser, courses, stats, hasEnrollments } = useStudentDashboard();

const firstName = computed(() => currentUser.value?.name?.split(' ')?.[0] || 'Student');
const totalLessons = computed(() => courses.value.reduce((sum, course) => sum + course.totalLessons, 0));

const featuredCourse = computed(() => {
  if (!courses.value.length) return null;

  return [...courses.value].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
    return b.progress - a.progress;
  })[0];
});

const nextLessonTitle = computed(() => featuredCourse.value?.nextLesson?.title || 'No lesson queued yet');

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="space-y-8">
    <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.22)]">
      <div class="h-1 bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400" />
      <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.5fr)_320px] lg:items-start">
        <div class="space-y-5">
          <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            <BookOpenText class="h-3.5 w-3.5" />
            Student dashboard
          </div>

          <div class="max-w-3xl">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Welcome back, {{ firstName }}</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Keep your learning organized in one clear place.
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              See what you have enrolled in, jump to your next lesson, and stay on top of progress without extra noise.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <router-link
              to="/courses"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Compass class="h-4 w-4" />
              Browse courses
            </router-link>
            <router-link
              to="/student/profile"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <Sparkles class="h-4 w-4" />
              View profile
            </router-link>
          </div>
        </div>

        <div class="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.65)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Today</p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight">
            {{ featuredCourse ? featuredCourse.title : 'Start with a course' }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-white/70">
            {{ hasEnrollments ? 'Your next lesson is ready when you are.' : 'Pick a course from the catalog to begin.' }}
          </p>

          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between text-sm text-white/70">
              <span>Progress</span>
              <span>{{ featuredCourse?.progress ?? 0 }}%</span>
            </div>
            <div class="h-2 rounded-full bg-white/10">
              <div
                class="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400"
                :style="{ width: `${featuredCourse?.progress ?? 0}%` }"
              />
            </div>
          </div>

          <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Target class="h-5 w-5" />
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Up next</p>
                <p class="mt-1 text-sm font-medium text-white">{{ nextLessonTitle }}</p>
                <p class="mt-1 text-sm text-white/65">{{ featuredCourse ? 'Continue from your last saved lesson.' : 'Choose a course to create your first lesson queue.' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <DashboardStatsRow :stats="stats" />

    <section class="space-y-6">
      <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] sm:p-7">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">My courses</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Continue learning</h2>
          </div>
          <p class="hidden text-sm text-slate-500 sm:block">
            {{ hasEnrollments ? 'Your active courses are listed below.' : 'Nothing enrolled yet.' }}
          </p>
        </div>

        <div v-if="!hasEnrollments" class="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-10">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
            <BookOpenText class="h-6 w-6" />
          </div>
          <h3 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">No courses yet</h3>
          <p class="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
            Once you enroll in a course, you'll see progress, the next lesson, and a quick continue button here.
          </p>
          <router-link
            to="/courses"
            class="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Browse courses
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>

        <div v-else class="mt-8 space-y-5">
          <DashboardCourseCard v-for="course in courses" :key="course.id" :course="course" />
        </div>
      </div>
    </section>
  </div>
</template>
