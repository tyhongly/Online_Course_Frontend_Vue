<script setup>
import { Award, BookOpen, Clock3, Star } from 'lucide-vue-next';
import ProgressBar from './ProgressBar.vue';

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <article class="group overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
    <div class="relative aspect-[1.55] overflow-hidden bg-slate-100">
        <img
          v-if="course.thumbnailUrl"
          :src="course.thumbnailUrl"
          :alt="course.title"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          v-else
          class="flex h-full w-full items-end bg-gradient-to-br from-indigo-600 to-slate-900 p-5"
        >
          <div class="space-y-2 text-white">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Course preview</p>
            <h4 class="text-lg font-semibold leading-tight">{{ course.title }}</h4>
          </div>
        </div>
        <span class="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {{ course.category || 'Course' }}
        </span>
      </div>

      <div class="flex flex-col p-5">
        <h3 class="min-h-[3.5rem] text-lg font-bold leading-6 text-slate-950">{{ course.title }}</h3>
        <div class="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <span 
            :class="[
              'px-2.5 py-0.5 rounded text-xs font-semibold',
              (course.type === 'document' || course.price === 0) ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
            ]"
          >
            {{ (course.type === 'document' || course.price === 0) ? 'Document' : 'Video' }}
          </span>
          <span class="text-xs text-slate-400">•</span>
          <span class="text-xs text-slate-500">{{ course.category || 'General' }}</span>
          <Star class="ml-auto h-4 w-4 fill-[#fbbd24] text-[#fbbd24]" />
          <span>{{ course.rating || '4.8' }}</span>
        </div>

        <ProgressBar :value="course.progress" label="Complete" />

        <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">
          <span class="inline-flex items-center gap-1"><BookOpen class="h-4 w-4 text-slate-400" />{{ course.totalLessons }}</span>
          <span class="text-slate-300">•</span>
          <span class="inline-flex items-center gap-1"><Clock3 class="h-4 w-4 text-slate-400" />{{ course.duration || 'Self paced' }}</span>
          <span class="text-slate-300">•</span>
          <router-link :to="course.continuePath" :aria-label="`${course.isCompleted ? 'Review' : 'Continue'} ${course.title}`" class="font-semibold text-[#5b4ce1] hover:underline">{{ course.isCompleted ? 'Review' : 'Continue' }}</router-link>
        </div>
      </div>
  </article>
</template>
