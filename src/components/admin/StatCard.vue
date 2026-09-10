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
    default: "",
  },
});
</script>

<template>
  <article
    class="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.18)]"
  >
    <p class="text-sm font-medium text-slate-500">{{ label }}</p>
    <div class="mt-4 flex justify-start">
      <div
        class="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-primary px-3 text-2xl font-bold tracking-tight text-white shadow-sm"
      >
        {{ value }}
      </div>
    </div>
    <p v-if="hint" class="mt-3 text-sm text-slate-500">{{ hint }}</p>
  </article>
</template>
