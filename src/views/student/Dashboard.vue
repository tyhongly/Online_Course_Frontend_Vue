<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Award, BookOpen, GraduationCap } from 'lucide-vue-next';
import { authStore } from '../../store/authStore.js';
import { useStudentDashboard } from '../../composables/useStudentDashboard.js';
import DashboardCourseCard from '../../components/dashboard/DashboardCourseCard.vue';

const router = useRouter();
const { currentUser, courses, stats: dashboardStats, hasEnrollments } = useStudentDashboard();

const stats = computed(() => [
  { label: 'Enrolled Courses', value: dashboardStats.value?.enrolledCourses ?? 0, icon: BookOpen },
  { label: 'Active Courses', value: courses.value.filter((course) => !course.isCompleted).length, icon: GraduationCap },
  { label: 'Completed Courses', value: dashboardStats.value?.completedCourses ?? 0, icon: Award },
]);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="space-y-7">
    <section class="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#5142e6] via-[#4d40d8] to-[#30277d] px-6 py-8 text-white shadow-lg sm:px-10 lg:min-h-[250px] lg:px-12">
      <div class="absolute -right-16 -top-28 h-72 w-72 rounded-full border-[34px] border-white/10" />
      <div class="absolute -left-20 -bottom-36 h-72 w-72 rounded-full border-[34px] border-white/10" />
      <div class="relative max-w-xl">
        <p class="text-sm font-medium text-white/75">Looking Forward Build New Skill</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{{ currentUser?.name || 'Student' }}</h1>
        <p class="mt-4 text-sm text-white/80">Keep learning, keep growing, and make progress toward your goals.</p>
        <router-link to="/courses" class="mt-6 inline-flex items-center gap-3 rounded-full bg-[#ffc328] px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition hover:bg-yellow-300">
          Browse Courses <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>
      <GraduationCap class="absolute bottom-8 right-16 hidden h-36 w-36 rotate-12 text-white/20 lg:block" />
    </section>

    <div class="grid gap-4 sm:grid-cols-3">
      <article v-for="card in stats" :key="card.label" class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5b4ce1] text-white"><component :is="card.icon" class="h-7 w-7" /></div>
        <div><p class="text-3xl font-bold text-slate-900">{{ card.value }}</p><p class="text-sm text-slate-600">{{ card.label }}</p></div>
      </article>
    </div>

    <section class="space-y-6">
      <div>
        <div class="flex items-end justify-between gap-4"><h2 class="text-xl font-bold text-slate-950">In Progress Courses</h2><router-link to="/student/my-courses" class="text-sm font-semibold text-[#5b4ce1]">View all</router-link></div>

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

        <div v-else class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCourseCard v-for="course in courses" :key="course.id" :course="course" />
        </div>
      </div>
    </section>
  </div>
</template>
