<script setup>
import { ArrowRight, Clock3, Heart } from 'lucide-vue-next';
import { wishlistStore } from '../store/wishlistStore.js';

defineProps({
  course: {
    type: Object,
    required: true
  }
});

const isFree = (course) => course.type === 'document' || Number(course.price) === 0;
const descriptionFor = (course) => course.description
  || course.shortDescription
  || `Learn the fundamentals of ${String(course.title || 'this course').toLowerCase()} through guided lessons and practical projects.`;
const toggleFavorite = (courseId) => wishlistStore.toggle(courseId);
</script>

<template>
  <router-link
    :to="`/course/${course.id}`"
    class="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] "
  >
    <div class="relative h-48 shrink-0 overflow-hidden">
      <img
        v-if="course.image"
        :src="course.image"
        :alt="course.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="h-full w-full bg-sky-100"></div>
      <div class="absolute inset-0 bg-slate-950/10"></div>

      <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 backdrop-blur">
          {{ course.category }}
        </span>
        <span
          class="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm"
          :class="course.type === 'document' ? 'bg-violet-600' : 'bg-sky-600'"
        >
          {{ course.type === 'document' ? 'Document' : 'Video' }}
        </span>
      </div>

      <button
        type="button"
        class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-rose-500 shadow-sm transition duration-200 hover:scale-105 hover:bg-rose-50"
        :aria-label="wishlistStore.isWishlisted(course.id) ? 'Remove from favorites' : 'Add to favorites'"
        @click.stop.prevent="toggleFavorite(course.id)"
      >
        <Heart
          class="h-5 w-5 transition-transform duration-200"
          :class="wishlistStore.isWishlisted(course.id) ? 'fill-current scale-110' : ''"
        />
      </button>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="line-clamp-2 text-[1.02rem] font-semibold leading-6 text-slate-950 transition group-hover:text-sky-700">
        {{ course.title }}
      </h3>

      <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
        {{ descriptionFor(course) }}
      </p>

      <div class="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
        <Clock3 class="h-4 w-4 text-slate-400" />
        <span>{{ course.duration }}</span>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <span
          v-if="isFree(course)"
          class="text-base font-semibold text-emerald-700"
        >
          Free
        </span>
        <span v-else class="text-lg font-semibold text-slate-950">
          ${{ course.price }}
        </span>

        <span class="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 transition group-hover:gap-2 group-hover:text-sky-500">
          View course
          <ArrowRight class="h-4 w-4" />
        </span>
      </div>
    </div>
  </router-link>
</template>
