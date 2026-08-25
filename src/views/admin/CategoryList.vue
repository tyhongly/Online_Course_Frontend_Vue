<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { categoryStore } from '../../store/categoryStore.js';

const router = useRouter();
const categories = computed(() => [...categoryStore.categories].sort((a, b) => a.name.localeCompare(b.name)));

const removeCategory = (id) => {
  if (confirm('Delete this category?')) {
    categoryStore.deleteCategory(id);
  }
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Categories</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Manage Categories</h1>
        <p class="mt-2 text-sm text-slate-600">Create, rename, and clean up the course taxonomy.</p>
      </div>
      <router-link
        to="/admin/categories/new"
        class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Create Category
      </router-link>
    </header>

    <section class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)]">
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
          <tr v-for="category in categories" :key="category.id" class="hover:bg-slate-50">
            <td class="px-5 py-4 font-medium text-slate-950">{{ category.name }}</td>
            <td class="px-5 py-4 text-slate-600">{{ category.slug }}</td>
            <td class="px-5 py-4 text-slate-600">{{ new Date(category.createdAt).toLocaleDateString() }}</td>
            <td class="px-5 py-4 text-right">
              <div class="inline-flex gap-3">
                <button class="text-sm font-medium text-red-600 hover:underline" @click="removeCategory(category.id)">Delete</button>
                <button class="text-sm font-medium text-slate-700 hover:underline" @click="router.push(`/admin/categories/${category.id}/edit`)">Edit</button>
              </div>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="4" class="px-5 py-10 text-center text-slate-500">No categories yet.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
