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

const saveCategory = () => {
  if (isNew.value) {
    const created = categoryStore.addCategory(form.value);
    router.push(`/admin/categories/${created.id}/edit`);
    return;
  }

  categoryStore.updateCategory(categoryId.value, form.value);
  router.push('/admin/categories');
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-2xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)] sm:p-8">
      <div class="mb-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Categories</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ isNew ? 'Create Category' : 'Edit Category' }}</h1>
      </div>

      <div class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Name</label>
          <input v-model="form.name" type="text" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" placeholder="Development" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Slug</label>
          <input v-model="form.slug" type="text" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" placeholder="development" />
        </div>
      </div>

      <div class="mt-8 flex items-center justify-end gap-3">
        <router-link to="/admin/categories" class="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</router-link>
        <button @click="saveCategory" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Save</button>
      </div>
    </div>
  </div>
</template>
