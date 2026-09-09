<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
  router.replace('/courses');
});
</script>

<template>
  <div class="py-20 text-center text-gray-500">Redirecting to courses...</div>
</template>