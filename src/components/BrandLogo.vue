<script setup>
import { BookOpen } from 'lucide-vue-next';

defineProps({
  size: {
    type: String,
    default: 'md'
  }
});
</script>

<template>
  <span
    class="brand-logo inline-flex shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#2d9bea] via-[#3d79ee] to-[#743ce9] text-white shadow-[0_8px_18px_rgba(62,105,235,0.28)]"
    :class="size === 'sm' ? 'h-9 w-9 rounded-xl' : size === 'lg' ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10'"
    aria-hidden="true"
  >
    <BookOpen :class="size === 'sm' ? 'h-[17px] w-[17px]' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'" :stroke-width="1.8" />
  </span>
</template>
