<script setup>
import { ArrowRight, CheckCircle2, Clock3, PlayCircle, Sparkles } from 'lucide-vue-next';
import ProgressBar from './ProgressBar.vue';

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const truncate = (text, limit = 132) => {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
};
</script>

<template>
  <article class="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_36px_-24px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-0.5">
    <div class="grid gap-0 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div class="relative min-h-56 overflow-hidden bg-slate-100">
        <img
          v-if="course.thumbnailUrl"
          :src="course.thumbnailUrl"
          :alt="course.title"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          v-else
          class="flex h-full min-h-56 w-full items-end bg-gradient-to-br from-indigo-600 to-slate-900 p-5"
        >
          <div class="max-w-40 space-y-2 text-white">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Course preview</p>
            <h4 class="text-xl font-semibold leading-tight">{{ course.title }}</h4>
          </div>
        </div>
        <div class="absolute left-4 top-4 flex items-center gap-2">
          <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
            {{ course.category || 'Course' }}
          </span>
          <span
            v-if="course.isCompleted"
            class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm"
          >
            <CheckCircle2 class="h-3.5 w-3.5" />
            Completed
          </span>
        </div>
        <div class="absolute bottom-4 left-4">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
            <PlayCircle class="h-4 w-4" />
            Continue where you left off
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-5 p-6 sm:p-7">
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-2xl font-semibold tracking-tight text-slate-950">{{ course.title }}</h3>
              <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                {{ truncate(course.description) }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
              <Clock3 class="h-4 w-4 text-slate-400" />
              {{ course.completedLessons }} / {{ course.totalLessons }} lessons
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sky-700">
              <Sparkles class="h-4 w-4" />
              {{ course.isCompleted ? 'All lessons finished' : 'In progress' }}
            </span>
          </div>
        </div>

        <ProgressBar
          :value="course.progress"
          :label="course.isCompleted ? 'Course complete' : 'Course progress'"
        />

        <div class="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-slate-500">
            <span class="font-semibold text-slate-900">{{ course.nextLesson?.title || 'No lessons yet' }}</span>
            <span v-if="course.nextLesson"> is up next</span>
          </p>

          <router-link
            :to="course.continuePath"
            :aria-label="`${course.isCompleted ? 'Review' : 'Continue'} ${course.title}`"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {{ course.isCompleted ? 'Review Course' : 'Continue' }}
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>
