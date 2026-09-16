<script setup>
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  FolderTree,
  GraduationCap,
  Layers3,
  Plus,
  Users,
} from "lucide-vue-next";
import { useAdminDashboard } from "../../composables/useAdminDashboard.js";
import StatCard from "../../components/admin/StatCard.vue";

const {
  metrics,
  recentStudents,
  recentCourses,
  recentEnrollments,
  quickActions,
  currentUser,
} = useAdminDashboard();

const actionIcons = {
  "Create Course": Plus,
  "Manage Categories": FolderTree,
  "Manage Students": Users,
};
</script>

<template>
  <div class="min-h-full bg-grey-300 p-5 text-slate-900 sm:p-8">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section>
        <h1
          class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
        >
          Admin dashboard
        </h1>
      </section>

      <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article
          class="rounded-2xl border border-slate- shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)] bg-white p-5"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >Students</span
            ><span class="rounded-xl bg-indigo-50 p-2 text-indigo-600"
              ><Users class="h-4 w-4"
            /></span>
          </div>
          <div
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {{ metrics.totalStudents }}
          </div>
        </article>
        <article
          class="rounded-2xl border border-slate-200 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)] bg-white p-5"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >Courses</span
            ><span class="rounded-xl bg-sky-50 p-2 text-sky-600"
              ><BookOpen class="h-4 w-4"
            /></span>
          </div>
          <div
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {{ metrics.totalCourses }}
          </div>
        </article>
        <article
          class="rounded-2xl border border-slate-200 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)] bg-white p-5"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >Lessons</span
            ><span class="rounded-xl bg-amber-50 p-2 text-amber-600"
              ><Layers3 class="h-4 w-4"
            /></span>
          </div>
          <div
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {{ metrics.totalLessons }}
          </div>
        </article>
        <article
          class="rounded-2xl border border-slate-200 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)] bg-white p-5"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >Enrollments</span
            ><span class="rounded-xl bg-emerald-50 p-2 text-emerald-600"
              ><GraduationCap class="h-4 w-4"
            /></span>
          </div>
          <div
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {{ metrics.totalEnrollments }}
          </div>
        </article>
      </section>

      <section class="grid gap-3 sm:grid-cols-3">
        <router-link
          v-for="action in quickActions"
          :key="action.label"
          :to="action.to"
          class="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_15px_35px_-25px_rgba(79,70,229,0.35)]"
          ><span
            class="flex items-center gap-3 text-sm font-semibold text-slate-800"
            ><span
              class="rounded-xl bg-slate-100 p-2 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              ><component
                :is="actionIcons[action.label] || ArrowUpRight"
                class="h-4 w-4" /></span
            >{{ action.label }}</span
          ><ArrowUpRight
            class="h-4 w-4 text-slate-400 transition group-hover:text-indigo-600"
        /></router-link>
      </section>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          :value="metrics.totalStudents"
          hint="Students with active accounts"
        />
        <StatCard
          label="Total Courses"
          :value="metrics.totalCourses"
          hint="All course records"
        />
        <StatCard
          label="Total Lessons"
          :value="metrics.totalLessons"
          hint="Published lessons across courses"
        />
        <StatCard
          label="Total Enrollments"
          :value="metrics.totalEnrollments"
          hint="All course enrollments"
        />
      </section>

      <div class="grid gap-6 xl:grid-cols-2">
        <section
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)]"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200 px-5 py-4"
          >
            <div>
              <h2 class="font-semibold text-slate-950">Recent students</h2>
              <p class="mt-1 text-sm text-slate-500">
                Latest accounts and engagement
              </p>
            </div>
            <Users class="h-5 w-5 text-indigo-500" />
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead
                class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100"
              >
                <tr>
                  <th class="px-5 py-3 font-medium">Student</th>
                  <th class="px-5 py-3 font-medium">Courses</th>
                  <th class="px-5 py-3 font-medium">Activity</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr
                  v-for="student in recentStudents.slice(0, 6)"
                  :key="student.id"
                  class="hover:bg-slate-50"
                >
                  <td class="px-5 py-4">
                    <div class="font-semibold text-slate-950">
                      {{ student.name }}
                    </div>
                    <div class="mt-1 text-xs text-slate-500">
                      {{ student.email }}
                    </div>
                  </td>
                  <td class="px-5 py-4 text-slate-600">
                    {{ student.enrolledCourseCount }}
                  </td>
                  <td class="px-5 py-4 text-xs text-slate-500">
                    {{ student.lastActivityLabel }}
                  </td>
                </tr>
                <tr v-if="!recentStudents.length">
                  <td colspan="3" class="px-5 py-10 text-center text-slate-500">
                    No student activity yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)]"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200 px-5 py-4"
          >
            <div>
              <h2 class="font-semibold text-slate-950">Recent courses</h2>
              <p class="mt-1 text-sm text-slate-500">
                Newest content in the library
              </p>
            </div>
            <BookOpen class="h-5 w-5 text-sky-500" />
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead
                class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100"
              >
                <tr>
                  <th class="px-5 py-3 font-medium">Course</th>
                  <th class="px-5 py-3 font-medium">Lessons</th>
                  <th class="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr
                  v-for="course in recentCourses.slice(0, 6)"
                  :key="course.id"
                  class="hover:bg-slate-50"
                >
                  <td class="px-5 py-4">
                    <div class="font-semibold text-slate-950">
                      {{ course.title }}
                    </div>
                    <div class="mt-1 text-xs text-slate-500">
                      {{ course.categoryName }}
                    </div>
                  </td>
                  <td class="px-5 py-4 text-slate-600">
                    {{ course.lessonCount }}
                  </td>
                  <td class="px-5 py-4">
                    <span
                      :class="[
                        'rounded-full px-2.5 py-1 text-xs font-semibold',
                        course.published
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700',
                      ]"
                      >{{ course.published ? "Published" : "Draft" }}</span
                    >
                  </td>
                </tr>
                <tr v-if="!recentCourses.length">
                  <td colspan="3" class="px-5 py-10 text-center text-slate-500">
                    No courses available.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)]"
      >
        <div
          class="flex items-center justify-between border-b border-slate-200 px-5 py-4"
        >
          <div>
            <h2 class="font-semibold text-slate-950">Latest enrollments</h2>
            <p class="mt-1 text-sm text-slate-500">
              The newest student course activity
            </p>
          </div>
          <GraduationCap class="h-5 w-5 text-emerald-500" />
        </div>
        <div class="divide-y divide-slate-200">
          <div
            v-for="enrollment in recentEnrollments.slice(0, 5)"
            :key="enrollment.id"
            class="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div class="font-semibold text-slate-950">
                {{ enrollment.studentName }}
              </div>
              <div class="mt-1 text-xs text-slate-500">
                {{ enrollment.studentEmail }}
              </div>
            </div>
            <div class="text-sm text-slate-600 sm:text-right">
              <div>{{ enrollment.courseTitle }}</div>
              <div class="mt-1 text-xs text-slate-400">
                {{ enrollment.enrolledAtLabel }}
              </div>
            </div>
          </div>
          <div
            v-if="!recentEnrollments.length"
            class="px-5 py-10 text-center text-slate-500"
          >
            No enrollments yet.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
