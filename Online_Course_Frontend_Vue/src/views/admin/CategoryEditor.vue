<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { categoryStore } from '../../store/categoryStore.js';

const route = useRoute();
const router = useRouter();
const isNew = computed(() => route.path.includes('/new'));
const categoryId = computed(() => Number(route.params.id));

const form = ref({
  name: '',
  slug: '',
});
const error = ref('');
const isSubmitting = ref(false);

onMounted(() => {
  if (!isNew.value) {
    const existing = categoryStore.categories.find((category) => category.id === categoryId.value);
    if (!existing) {
      router.push('/admin/categories');
      return;
    }

    form.value = { name: existing.name, slug: existing.slug };
  }
});

const saveCategory = async () => {
  error.value = '';
  isSubmitting.value = true;

  try {
    if (isNew.value) {
      const created = await categoryStore.addCategory(form.value);
      router.push(`/admin/categories/${created.id}/edit`);
      return;
    }

    await categoryStore.updateCategory(categoryId.value, form.value);
    router.push('/admin/categories');
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to create category.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950/30 p-4 sm:p-8">
    <div class="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <h1 class="text-lg font-semibold text-slate-950">{{ isNew ? 'Add Category' : 'Edit Category' }}</h1>
        <button type="button" aria-label="Close" class="text-2xl leading-none text-slate-400 hover:text-slate-950" @click="router.push('/admin/categories')">&times;</button>
      </div>

      <div class="space-y-5 p-6">
        <div v-if="error" class="rounded-lg bg-red-50 p-3 text-sm text-red-600">{{ error }}</div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Name</label>
          <input v-model="form.name" type="text" required class="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" placeholder="Web Design" />
        </div>
        <div v-if="!isNew">
          <label class="mb-2 block text-sm font-medium text-slate-700">Slug</label>
          <input v-model="form.slug" type="text" class="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" placeholder="development" />
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-5">
        <button type="button" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950" @click="router.push('/admin/categories')">Close</button>
        <button :disabled="isSubmitting" class="rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50" @click="saveCategory">
          {{ isSubmitting ? 'Creating...' : (isNew ? 'Create' : 'Save') }}
        </button>
      </div>
    </div>
  </div>
</template>
