<script setup>
import { BarChart3, BookOpen, CheckCircle2 } from 'lucide-vue-next';

defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const statCards = [
  {
    key: 'enrolledCourses',
    label: 'Courses enrolled',
    icon: BookOpen,
    tone: 'from-indigo-500 to-violet-500',
  },
  {
    key: 'completedCourses',
    label: 'Courses completed',
    icon: CheckCircle2,
    tone: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'lessonsCompleted',
    label: 'Lessons completed',
    icon: BarChart3,
    tone: 'from-amber-500 to-orange-500',
  },
];
</script>

<template>
  <section class="grid gap-4 sm:grid-cols-3" aria-label="Student progress summary">
    <article
      v-for="card in statCards"
      :key="card.key"
      class="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] backdrop-blur"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-slate-500">{{ card.label }}</p>
          <p class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{{ stats?.[card.key] ?? 0 }}</p>
        </div>
        <div :class="['flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', card.tone]">
          <component :is="card.icon" class="h-5 w-5" />
        </div>
      </div>
    </article>
  </section>
</template>
