<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { FolderTree, Plus, Search, Tag, Trash2, Pencil } from 'lucide-vue-next';
import { categoryStore } from '../../store/categoryStore.js';

const router = useRouter();
const searchQuery = ref('');
const isLoading = ref(true);
const categories = computed(() => [...categoryStore.categories].sort((a, b) => a.name.localeCompare(b.name)));
const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return categories.value;
  return categories.value.filter((category) => [category.name, category.slug].some((value) => String(value || '').toLowerCase().includes(query)));
});
const error = ref('');

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to load categories.';
  } finally {
    isLoading.value = false;
  }
});

const removeCategory = async (id) => {
  if (confirm('Delete this category?')) {
    try {
      error.value = '';
      await categoryStore.deleteCategory(id);
    } catch (requestError) {
      error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to delete category.';
    }
  }
};
</script>

<template>
  <div class="min-h-full bg-[#f5f3ef] p-5 sm:p-8">
    <div class="mx-auto max-w-6xl">
      <div v-if="error" class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>
    <header class="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Course taxonomy</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Categories</h1>
        <p class="mt-2 text-sm text-slate-600">Keep your course library easy to browse and consistent to manage.</p>
      </div>
      <router-link
        to="/admin/categories/new"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <Plus class="h-4 w-4" />
        Add category
      </router-link>
    </header>

    <section class="mb-6 grid gap-3 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><span>Total categories</span><FolderTree class="h-4 w-4 text-indigo-500" /></div>
        <div class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ categories.length }}</div>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><span>Visible results</span><Search class="h-4 w-4 text-indigo-500" /></div>
        <div class="mt-2 text-3xl font-semibold tracking-tight text-indigo-700">{{ filteredCategories.length }}</div>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><span>Organization</span><Tag class="h-4 w-4 text-indigo-500" /></div>
        <div class="mt-2 text-lg font-semibold text-slate-950">Ready to browse</div>
      </div>
    </section>

    <div class="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_22px_-20px_rgba(15,23,42,0.3)]">
      <Search class="h-4 w-4 text-slate-400" />
      <input v-model="searchQuery" type="search" placeholder="Search by name or slug" class="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
    </div>

    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)]">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50 text-left text-sm text-slate-500">
          <tr>
            <th class="px-5 py-4 font-medium">Name</th>
            <th class="px-5 py-4 font-medium">Slug</th>
            <th class="px-5 py-4 font-medium">Created</th>
            <th class="px-5 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-sm">
          <tr v-for="category in filteredCategories" :key="category.id" class="hover:bg-slate-50">
            <td class="px-5 py-4 font-medium text-slate-950">{{ category.name }}</td>
            <td class="px-5 py-4"><span class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{{ category.slug }}</span></td>
            <td class="px-5 py-4 text-slate-600">{{ category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'Recently' }}</td>
            <td class="px-5 py-4 text-right">
              <div class="inline-flex items-center gap-2">
                <button :aria-label="`Delete ${category.name}`" class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-700 transition-colors hover:bg-red-50" @click="removeCategory(category.id)"><Trash2 class="h-3.5 w-3.5" /></button>
                <button class="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50" @click="router.push(`/admin/categories/${category.id}/edit`)"><Pencil class="h-3.5 w-3.5" />Edit</button>
              </div>
            </td>
          </tr>
          <tr v-if="isLoading || filteredCategories.length === 0">
            <td colspan="4" class="px-5 py-10 text-center text-slate-500">{{ isLoading ? 'Loading categories...' : 'No matching categories.' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    </div>
  </div>
</template>
