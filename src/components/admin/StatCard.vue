<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  hint: {
    type: String,
    default: '',
  },
  tone: {
    type: String,
    default: 'from-slate-900 to-slate-700',
  },
});
</script>

<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.18)]">
    <p class="text-sm font-medium text-slate-500">{{ label }}</p>
    <div class="mt-3 flex items-end justify-between gap-4">
      <p class="text-3xl font-semibold tracking-tight text-slate-950">{{ value }}</p>
      <div :class="['h-11 w-11 rounded-2xl bg-gradient-to-br shadow-lg shadow-slate-200/60', tone]" />
    </div>
    <p v-if="hint" class="mt-3 text-sm text-slate-500">{{ hint }}</p>
  </article>
</template>
