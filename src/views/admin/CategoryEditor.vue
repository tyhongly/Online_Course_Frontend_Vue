<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Check, FolderTree } from 'lucide-vue-next';
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
const slugPreview = computed(() => form.value.slug || form.value.name.toLowerCase().trim().replace(/\s+/g, '-'));

onMounted(() => {
  if (!isNew.value) {
    const existing = categoryStore.categories.find((category) => String(category.id) === String(categoryId.value));
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
  <div class="min-h-full bg-[#f5f3ef] p-5 sm:p-8">
    <div class="mx-auto max-w-2xl">
      <button type="button" class="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900" @click="router.push('/admin/categories')">
        <ArrowLeft class="h-4 w-4" />
        Back to categories
      </button>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)]">
      <div class="border-b border-slate-100 bg-slate-50 px-6 py-6 sm:px-8">
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><FolderTree class="h-5 w-5" /></div>
        <p class="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Course taxonomy</p>
        <h1 class="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{{ isNew ? 'Add category' : 'Edit category' }}</h1>
        <p class="mt-2 text-sm text-slate-600">Use a clear name so students can find the right courses quickly.</p>
      </div>

      <div class="space-y-5 p-6 sm:p-8">
        <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ error }}</div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Category name</label>
          <input v-model="form.name" type="text" required class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" placeholder="Web Design" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Slug</label>
          <input v-model="form.slug" type="text" class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" placeholder="web-design" />
          <p class="mt-2 text-xs text-slate-500">Public URL key: <span class="font-medium text-slate-700">{{ slugPreview || 'category-slug' }}</span></p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-5">
        <button type="button" class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100" @click="router.push('/admin/categories')">Cancel</button>
        <button :disabled="isSubmitting || !form.name.trim()" class="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50" @click="saveCategory">
          <Check class="h-4 w-4" />
          {{ isSubmitting ? 'Saving...' : (isNew ? 'Create category' : 'Save changes') }}
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
