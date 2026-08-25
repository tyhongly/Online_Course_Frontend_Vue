<script setup>
import { useAdminDashboard } from '../../composables/useAdminDashboard.js';
import StatCard from '../../components/admin/StatCard.vue';
import DataTable from '../../components/admin/DataTable.vue';

const { metrics, recentStudents, recentCourses, recentEnrollments, quickActions } = useAdminDashboard();
</script>

<template>
  <div class="min-h-full bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-4 text-slate-900 sm:p-6 lg:p-8">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] sm:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Overview</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Admin dashboard
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Monitor students, courses, lessons, and enrollments from one protected control panel.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <router-link
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {{ action.label }}
            </router-link>
          </div>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" :value="metrics.totalStudents" hint="Students with active accounts" tone="from-indigo-500 to-sky-500" />
        <StatCard label="Total Courses" :value="metrics.totalCourses" hint="All course records" tone="from-sky-500 to-cyan-400" />
        <StatCard label="Total Lessons" :value="metrics.totalLessons" hint="Published lessons across courses" tone="from-indigo-600 to-violet-500" />
        <StatCard label="Total Enrollments" :value="metrics.totalEnrollments" hint="All course enrollments" tone="from-cyan-500 to-indigo-500" />
      </section>

      <div class="grid gap-6 xl:grid-cols-2">
        <DataTable title="Recent Students" subtitle="Latest student accounts and their engagement">
          <template #table>
            <thead class="bg-indigo-50 text-left text-sm text-slate-500">
              <tr>
                <th class="px-5 py-4 font-medium">Student</th>
                <th class="px-5 py-4 font-medium">Email</th>
                <th class="px-5 py-4 font-medium">Enrolled Courses</th>
                <th class="px-5 py-4 font-medium">Last Activity</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-sm">
              <tr v-for="student in recentStudents" :key="student.id" class="hover:bg-slate-50">
                <td class="px-5 py-4 font-medium text-slate-950">{{ student.name }}</td>
                <td class="px-5 py-4 text-slate-600">{{ student.email }}</td>
                <td class="px-5 py-4 text-slate-600">{{ student.enrolledCourseCount }}</td>
                <td class="px-5 py-4 text-slate-600">{{ student.lastActivityLabel }}</td>
              </tr>
              <tr v-if="recentStudents.length === 0">
                <td colspan="4" class="px-5 py-10 text-center text-slate-500">No student activity yet.</td>
              </tr>
            </tbody>
          </template>
        </DataTable>

        <DataTable title="Recent Courses" subtitle="Newest courses with lesson and enrollment counts">
          <template #table>
            <thead class="bg-indigo-50 text-left text-sm text-slate-500">
              <tr>
                <th class="px-5 py-4 font-medium">Course</th>
                <th class="px-5 py-4 font-medium">Category</th>
                <th class="px-5 py-4 font-medium">Lessons</th>
                <th class="px-5 py-4 font-medium">Enrollments</th>
                <th class="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-sm">
              <tr v-for="course in recentCourses" :key="course.id" class="hover:bg-slate-50">
                <td class="px-5 py-4 font-medium text-slate-950">{{ course.title }}</td>
                <td class="px-5 py-4 text-slate-600">{{ course.categoryName }}</td>
                <td class="px-5 py-4 text-slate-600">{{ course.lessonCount }}</td>
                <td class="px-5 py-4 text-slate-600">{{ course.enrollmentCount }}</td>
                <td class="px-5 py-4">
                  <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-semibold', course.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700']">
                    {{ course.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
              </tr>
              <tr v-if="recentCourses.length === 0">
                <td colspan="5" class="px-5 py-10 text-center text-slate-500">No courses available.</td>
              </tr>
            </tbody>
          </template>
        </DataTable>
      </div>

      <DataTable title="Recent Enrollments" subtitle="Most recent student enrollments">
        <template #table>
          <thead class="bg-indigo-50 text-left text-sm text-slate-500">
            <tr>
              <th class="px-5 py-4 font-medium">Student</th>
              <th class="px-5 py-4 font-medium">Course</th>
              <th class="px-5 py-4 font-medium">Enrolled At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-sm">
            <tr v-for="enrollment in recentEnrollments" :key="enrollment.id" class="hover:bg-slate-50">
              <td class="px-5 py-4">
                <div class="font-medium text-slate-950">{{ enrollment.studentName }}</div>
                <div class="text-xs text-slate-500">{{ enrollment.studentEmail }}</div>
              </td>
              <td class="px-5 py-4 text-slate-600">{{ enrollment.courseTitle }}</td>
              <td class="px-5 py-4 text-slate-600">{{ enrollment.enrolledAtLabel }}</td>
            </tr>
            <tr v-if="recentEnrollments.length === 0">
              <td colspan="3" class="px-5 py-10 text-center text-slate-500">No enrollments yet.</td>
            </tr>
          </tbody>
        </template>
      </DataTable>
    </div>
  </div>
</template>
