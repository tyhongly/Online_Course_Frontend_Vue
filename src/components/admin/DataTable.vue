<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <section class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.18)]">
    <div class="border-b border-slate-200 px-5 py-4 sm:px-6">
      <h3 class="text-lg font-semibold tracking-tight text-slate-950">{{ title }}</h3>
      <p v-if="subtitle" class="mt-1 text-sm text-slate-500">{{ subtitle }}</p>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <slot name="table" />
      </table>
    </div>
  </section>
</template>
