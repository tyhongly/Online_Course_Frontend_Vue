<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';

const router = useRouter();

const lessons = computed(() =>
  courseStore.courses.flatMap((course) =>
    (course.lessons || []).map((lesson) => ({
      ...lesson,
      courseId: course.id,
      courseTitle: course.title,
      published: lesson.published !== false,
    })),
  ).sort((a, b) => (a.courseTitle || '').localeCompare(b.courseTitle || '') || (a.order || 0) - (b.order || 0)),
);

const removeLesson = (courseId, lessonId) => {
  if (confirm('Delete this lesson?')) {
    courseStore.deleteLesson(courseId, lessonId);
  }
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Lessons</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Manage Lessons</h1>
        <p class="mt-2 text-sm text-slate-600">Create and organize lesson content across courses.</p>
      </div>
      <router-link
        to="/admin/lessons/new"
        class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Create Lesson
      </router-link>
    </header>

    <section class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)]">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50 text-left text-sm text-slate-500">
          <tr>
            <th class="px-5 py-4 font-medium">Lesson</th>
            <th class="px-5 py-4 font-medium">Course</th>
            <th class="px-5 py-4 font-medium">Order</th>
            <th class="px-5 py-4 font-medium">Status</th>
            <th class="px-5 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-sm">
          <tr v-for="lesson in lessons" :key="`${lesson.courseId}-${lesson.id}`" class="hover:bg-slate-50">
            <td class="px-5 py-4 font-medium text-slate-950">{{ lesson.title }}</td>
            <td class="px-5 py-4 text-slate-600">{{ lesson.courseTitle }}</td>
            <td class="px-5 py-4 text-slate-600">{{ lesson.order || 0 }}</td>
            <td class="px-5 py-4">
              <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-semibold', lesson.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700']">
                {{ lesson.published ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="inline-flex items-center gap-2">
                <button class="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1" @click="removeLesson(lesson.courseId, lesson.id)">Delete</button>
                <button class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1" @click="router.push(`/admin/lessons/${lesson.id}/edit?courseId=${lesson.courseId}`)">Edit</button>
              </div>
            </td>
          </tr>
          <tr v-if="lessons.length === 0">
            <td colspan="5" class="px-5 py-10 text-center text-slate-500">No lessons yet.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
