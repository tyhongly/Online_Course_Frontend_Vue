<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-vue-next";
import { authStore } from "../../store/authStore.js";
import { useStudentDashboard } from "../../composables/useStudentDashboard.js";
import DashboardCourseCard from "../../components/dashboard/DashboardCourseCard.vue";

const router = useRouter();
const {
  currentUser,
  courses,
  stats: dashboardStats,
  hasEnrollments,
} = useStudentDashboard();

const stats = computed(() => [
  {
    label: "Enrolled Courses",
    value: dashboardStats.value?.enrolledCourses ?? 0,
    icon: BookOpen,
  },
  {
    label: "Active Courses",
    value: courses.value.filter((course) => !course.isCompleted).length,
    icon: GraduationCap,
  },
  {
    label: "Completed Courses",
    value: dashboardStats.value?.completedCourses ?? 0,
    icon: Award,
  },
]);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="space-y-6">
    <!-- =====================================================
         STUDENT OVERVIEW - ONE MAIN CONTAINER
    ====================================================== -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <!-- ===================================================
           WELCOME
      ==================================================== -->
      <section class="relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10">
        <div class="relative z-10 max-w-2xl">
          <p class="text-sm font-medium text-blue-600">Welcome back,</p>

          <h1
            class="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            {{ currentUser?.name || "Student" }} 👋
          </h1>

          <p class="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Keep learning, keep growing, and make progress toward your goals.
          </p>

          <router-link
            to="/courses"
            class="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Browse Courses
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </section>

      <!-- ===================================================
           LEARNING JOURNEY
      ==================================================== -->
      <section class="border-t border-slate-200 px-6 py-6 sm:px-8">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center">
          <!-- Title -->
          <div class="shrink-0 lg:w-[250px]">
            <h2 class="text-lg font-bold text-slate-950">
              Your Learning Journey
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Here's a quick overview of your progress.
            </p>
          </div>

          <!-- Statistics -->
          <div
            class="grid flex-1 grid-cols-2 border-t border-slate-200 pt-5 sm:grid-cols-4 sm:border-t-0 sm:pt-0"
          >
            <article
              v-for="(card, index) in stats"
              :key="card.label"
              class="flex items-center gap-3 py-2 sm:px-5"
              :class="[index !== 0 ? 'border-l border-slate-200' : 'sm:pl-0']"
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"
              >
                <component :is="card.icon" class="h-5 w-5" />
              </div>

              <div class="min-w-0">
                <p class="text-xl font-bold text-slate-950">
                  {{ card.value }}
                </p>

                <p class="truncate text-xs text-slate-500">
                  {{ card.label }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ===================================================
           CONTINUE LEARNING
      ==================================================== -->
      <section class="border-t border-slate-200 px-6 py-7 sm:px-8">
        <!-- Heading -->
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-950">Continue Learning</h2>

            <p class="mt-1 text-sm text-slate-500">
              Pick up where you left off and keep going!
            </p>
          </div>

          <router-link
            to="/student/my-courses"
            class="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all
            <ArrowRight class="ml-1 inline h-4 w-4" />
          </router-link>
        </div>

        <!-- Course -->
        <div
          v-if="hasEnrollments && courses.length"
          class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
        >
          <div
            class="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)_130px] lg:items-center"
          >
            <!-- Course image -->
            <div
              class="relative aspect-video overflow-hidden rounded-xl bg-slate-200"
            >
              <img
                v-if="courses[0]?.image"
                :src="courses[0].image"
                :alt="courses[0]?.title || 'Course'"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center text-blue-600"
              >
                <BookOpenText class="h-10 w-10" />
              </div>

              <span
                class="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
              >
                In Progress
              </span>
            </div>

            <!-- Course information -->
            <div class="min-w-0">
              <div class="flex flex-wrap gap-2">
                <span
                  class="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700"
                >
                  Development
                </span>

                <span
                  class="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700"
                >
                  Video
                </span>
              </div>

              <h3 class="mt-3 truncate text-lg font-bold text-slate-950">
                {{ courses[0]?.title || "Continue your course" }}
              </h3>

              <p class="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                {{
                  courses[0]?.description ||
                  "Continue learning from where you left off."
                }}
              </p>

              <!-- Progress -->
              <div class="mt-4 flex items-center gap-3">
                <div
                  class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
                >
                  <div
                    class="h-full rounded-full bg-blue-600"
                    style="width: 62%"
                  ></div>
                </div>

                <span class="shrink-0 text-xs font-semibold text-slate-600">
                  62%
                </span>
              </div>

              <!-- Course information -->
              <div
                class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"
              >
                <span class="inline-flex items-center gap-1.5">
                  <BookOpenText class="h-4 w-4" />
                  11 / 18 lessons
                </span>

                <span class="inline-flex items-center gap-1.5">
                  <Clock3 class="h-4 w-4" />
                  16h 20m
                </span>
              </div>
            </div>

            <!-- Continue -->
            <div class="flex lg:justify-end">
              <router-link
                :to="`/courses/${courses[0]?.id}`"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Continue
                <ArrowRight class="h-4 w-4" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-9 text-center"
        >
          <div
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
          >
            <BookOpenText class="h-6 w-6" />
          </div>

          <h3 class="mt-4 text-lg font-bold text-slate-950">
            Nothing to continue yet
          </h3>

          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Start a course and your learning progress will appear here.
          </p>

          <router-link
            to="/courses"
            class="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Courses
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </section>

      <!-- ===================================================
           RECOMMENDED FOR YOU
      ==================================================== -->
      <section class="border-t border-slate-200 px-6 py-7 sm:px-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-950">
              Recommended for You
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Explore courses and build your skills.
            </p>
          </div>

          <router-link
            to="/courses"
            class="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all
            <ArrowRight class="ml-1 inline h-4 w-4" />
          </router-link>
        </div>

        <!-- Course cards -->
        <div
          v-if="courses.length"
          class="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          <DashboardCourseCard
            v-for="course in courses.slice(0, 4)"
            :key="course.id"
            :course="course"
          />
        </div>

        <!-- No recommendations -->
        <div v-else class="mt-5 py-8 text-center">
          <BookOpenText class="mx-auto h-8 w-8 text-blue-500" />

          <h3 class="mt-3 font-semibold text-slate-950">Explore our courses</h3>

          <p class="mt-1 text-sm text-slate-500">
            Find a course that matches your learning goals.
          </p>

          <router-link
            to="/courses"
            class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            Browse Courses
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- <template>
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
</template> -->
