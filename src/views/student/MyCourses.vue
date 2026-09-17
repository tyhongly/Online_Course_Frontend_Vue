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
  <div class="space-y-6">
    
    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      
      <section class="px-6 py-7 sm:px-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600"
            >
              Learning list
            </p>

            <h2
              class="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
            >
              Your enrolled courses
            </h2>
          </div>

          <p class="hidden text-sm text-slate-500 sm:block">
            {{
              hasEnrollments
                ? `${sortedCourses.length} active course${
                    sortedCourses.length === 1 ? "" : "s"
                  }`
                : "Nothing enrolled yet"
            }}
          </p>
        </div>

        
        <div
          v-if="!hasEnrollments"
          class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-10"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700"
          >
            <BookOpen class="h-6 w-6" />
          </div>

          <h3
            class="mt-5 text-2xl font-semibold tracking-tight text-slate-950"
          >
            No courses yet
          </h3>

          <p
            class="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600"
          >
            Enroll in a course and it will appear here with progress, lesson
            count, and a direct continue button.
          </p>

          <router-link
            to="/courses"
            class="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Browse courses
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>

        <!-- Enrolled Course Cards -->
        <div v-else class="mt-8 space-y-5">
          <DashboardCourseCard
            v-for="course in sortedCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </section>

  
      <section class="border-t border-slate-200 px-6 py-6 sm:px-8">
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            Quick stats
          </p>

          <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="card in summaryCards"
              :key="card.label"
              class="flex items-start justify-between rounded-2xl bg-slate-50 p-4"
            >
              <div>
                <p class="text-sm font-medium text-slate-500">
                  {{ card.label }}
                </p>

                <p
                  class="mt-1 text-2xl font-semibold tracking-tight text-slate-950"
                >
                  {{ card.value }}
                </p>

                <p class="mt-1 text-sm text-slate-500">
                  {{ card.note }}
                </p>
              </div>

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm"
              >
                <component :is="card.icon" class="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>