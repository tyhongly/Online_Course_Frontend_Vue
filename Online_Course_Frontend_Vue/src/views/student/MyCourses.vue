<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  PlayCircle,
  Sparkles,
  Target,
} from 'lucide-vue-next';
import { useStudentDashboard } from '../../composables/useStudentDashboard.js';
import DashboardCourseCard from '../../components/dashboard/DashboardCourseCard.vue';
import DashboardStatsRow from '../../components/dashboard/DashboardStatsRow.vue';

const router = useRouter();
const { currentUser, courses, stats, hasEnrollments } = useStudentDashboard();

const firstName = computed(() => currentUser.value?.name?.split(' ')?.[0] || 'Student');
const sortedCourses = computed(() => {
  return [...courses.value].sort((a, b) => b.progress - a.progress);
});

const inProgressCourses = computed(() => sortedCourses.value.filter((course) => course.progress > 0 && !course.isCompleted));
const completedCourses = computed(() => sortedCourses.value.filter((course) => course.isCompleted));
const totalProgress = computed(() => {
  if (!courses.value.length) return 0;
  return Math.round(courses.value.reduce((sum, course) => sum + course.progress, 0) / courses.value.length);
});

const featuredCourse = computed(() => {
  return sortedCourses.value[0] || null;
});

const summaryCards = computed(() => [
  {
    label: 'Enrolled courses',
    value: stats.value.enrolledCourses,
    note: hasEnrollments.value ? 'Active learning paths' : 'No courses yet',
    icon: BookOpen,
  },
  {
    label: 'In progress',
    value: inProgressCourses.value.length,
    note: 'Currently being studied',
    icon: PlayCircle,
  },
  {
    label: 'Completed',
    value: completedCourses.value.length,
    note: 'Finished courses',
    icon: CheckCircle2,
  },
  {
    label: 'Average progress',
    value: `${totalProgress.value}%`,
    note: 'Across all enrolled courses',
    icon: Flame,
  },
]);

const continueCourse = (course) => {
  if (!course) return;
  router.push(course.continuePath);
};
</script>

<template>
  <div class="space-y-8">
    <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)]">
      <div class="h-1 bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400" />
      <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
        <div class="space-y-5">
          <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            <Sparkles class="h-3.5 w-3.5" />
            My learning
          </div>

          <div class="max-w-3xl">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Welcome back, {{ firstName }}</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Your courses, progress, and next steps in one clear place.
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Continue where you left off, review completed lessons, and quickly jump into the next course that matters most.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <button
              v-if="featuredCourse"
              @click="continueCourse(featuredCourse)"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <ArrowRight class="h-4 w-4" />
              Continue learning
            </button>
            <router-link
              to="/courses"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              Browse more courses
            </router-link>
          </div>
        </div>

        <div class="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.65)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Today</p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight">
            {{ featuredCourse ? featuredCourse.title : 'Ready for your next course?' }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-white/70">
            {{ featuredCourse ? featuredCourse.nextLesson?.title || 'No lesson queued yet' : 'Enroll in a course to start a learning path.' }}
          </p>

          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between text-sm text-white/70">
              <span>Average progress</span>
              <span>{{ totalProgress }}%</span>
            </div>
            <div class="h-2 rounded-full bg-white/10">
              <div
                class="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400"
                :style="{ width: `${totalProgress}%` }"
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
                <p class="mt-1 text-sm font-medium text-white">{{ featuredCourse?.title || 'No active courses' }}</p>
                <p class="mt-1 text-sm text-white/65">
                  {{ featuredCourse ? 'Open the most active course first to stay in flow.' : 'Start with the catalog and enroll in a course.' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <DashboardStatsRow :stats="stats" />

    <section class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div class="space-y-5">
        <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)] sm:p-7">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Learning list</p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Your enrolled courses</h2>
            </div>
            <p class="hidden text-sm text-slate-500 sm:block">
              {{ hasEnrollments ? `${sortedCourses.length} active course${sortedCourses.length === 1 ? '' : 's'}` : 'Nothing enrolled yet' }}
            </p>
          </div>

          <div v-if="!hasEnrollments" class="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-10">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <BookOpen class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">No courses yet</h3>
            <p class="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
              Enroll in a course and it will appear here with progress, lesson count, and a direct continue button.
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
            <DashboardCourseCard v-for="course in sortedCourses" :key="course.id" :course="course" />
          </div>
        </div>
      </div>

      <aside class="space-y-5">
        <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)]">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Quick stats</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="card in summaryCards"
              :key="card.label"
              class="flex items-start justify-between rounded-2xl bg-slate-50 p-4"
            >
              <div>
                <p class="text-sm font-medium text-slate-500">{{ card.label }}</p>
                <p class="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{{ card.value }}</p>
                <p class="mt-1 text-sm text-slate-500">{{ card.note }}</p>
              </div>
              <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                <component :is="card.icon" class="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.14)]">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Learning focus</p>
          <div class="mt-5 space-y-4">
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-semibold text-slate-950">Best next action</p>
              <p class="mt-1 text-sm text-slate-600">
                Reopen the course with the highest progress and finish your next lesson.
              </p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-semibold text-slate-950">Study rhythm</p>
              <p class="mt-1 text-sm text-slate-600">
                Short daily sessions usually keep momentum better than waiting for a long block.
              </p>
            </div>
          </div>
        </div> -->
      </aside>
    </section>
  </div>
</template>
