<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
});

const normalizedValue = computed(() => Math.min(100, Math.max(0, props.value)));
</script>

<template>
  <div class="space-y-2" :aria-label="label || 'Progress'">
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm font-medium text-slate-600">{{ label }}</span>
      <span class="text-sm font-semibold text-slate-900">{{ normalizedValue }}%</span>
    </div>
    <div
      class="h-2.5 overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      :aria-valuenow="normalizedValue"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuetext="`${normalizedValue}% complete`"
    >
      <div
        class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 transition-all duration-500"
        :style="{ width: `${normalizedValue}%` }"
      />
    </div>
  </div>
</template>
