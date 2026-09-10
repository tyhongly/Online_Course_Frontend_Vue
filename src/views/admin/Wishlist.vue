<script setup>
import { computed } from 'vue';
import { BarChart3, BookHeart, Heart, Users } from 'lucide-vue-next';
import { courseStore } from '../../store/courseStore.js';
import { usersStore } from '../../store/usersStore.js';
import { wishlistStore } from '../../store/wishlistStore.js';

const studentUsers = computed(() => usersStore.users.filter((user) => user.role === 'student'));

const wishlistRows = computed(() => {
  const counts = new Map();
  const studentsByCourse = new Map();

  studentUsers.value.forEach((student) => {
    const ids = wishlistStore.wishlists[String(student.id)] || wishlistStore.wishlists[student.email] || [];
    ids.forEach((courseId) => {
      const key = String(courseId);
      counts.set(key, (counts.get(key) || 0) + 1);
      if (!studentsByCourse.has(key)) studentsByCourse.set(key, []);
      studentsByCourse.get(key).push(student.name);
    });
  });

  return [...counts.entries()]
    .map(([courseId, count]) => ({
      course: courseStore.courses.find((item) => String(item.id) === courseId),
      count,
      students: studentsByCourse.get(courseId) || [],
    }))
    .filter((item) => item.course)
    .sort((a, b) => b.count - a.count || a.course.title.localeCompare(b.course.title));
});

const totalSaved = computed(() => wishlistRows.value.reduce((sum, row) => sum + row.count, 0));
const studentsWithWishlist = computed(() => new Set(wishlistRows.value.flatMap((row) => row.students)).size);
const mostWanted = computed(() => wishlistRows.value[0]);
</script>

<template>
  <div class="min-h-full bg-[#f5f3ef] p-5 sm:p-8">
    <div class="mx-auto max-w-6xl space-y-6">
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-[0_24px_60px_-38px_rgba(15,23,42,0.75)]">
        <div class="flex flex-col gap-6 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-rose-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200"><Heart class="h-3.5 w-3.5 fill-current" /> Student interest</div>
            <h1 class="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Wishlist analytics</h1>
            <p class="mt-2 max-w-xl text-sm leading-6 text-slate-300">See which courses students are saving so you can plan promotions, content, and follow-up.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm"><span class="text-slate-400">Saved items</span><div class="mt-1 text-2xl font-semibold text-white">{{ totalSaved }}</div></div>
        </div>
      </section>

      <section class="grid gap-3 sm:grid-cols-3">
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_35px_-28px_rgba(15,23,42,0.35)]"><div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Total saves <Heart class="h-4 w-4 text-rose-500" /></div><div class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{{ totalSaved }}</div><p class="mt-2 text-sm text-slate-500">Across all student wishlists</p></article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_35px_-28px_rgba(15,23,42,0.35)]"><div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Interested students <Users class="h-4 w-4 text-indigo-500" /></div><div class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{{ studentsWithWishlist }}</div><p class="mt-2 text-sm text-slate-500">Students with saved courses</p></article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_35px_-28px_rgba(15,23,42,0.35)]"><div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Top course <BarChart3 class="h-4 w-4 text-emerald-500" /></div><div class="mt-3 truncate text-lg font-semibold text-slate-950">{{ mostWanted?.course.title || 'No data yet' }}</div><p class="mt-2 text-sm text-slate-500">{{ mostWanted ? `${mostWanted.count} student saves` : 'Students have not saved courses yet' }}</p></article>
      </section>

      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.3)]">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6"><div><h2 class="font-semibold text-slate-950">Most wanted courses</h2><p class="mt-1 text-sm text-slate-500">Courses ranked by student wishlist saves</p></div><BookHeart class="h-5 w-5 text-rose-500" /></div>
        <div v-if="wishlistRows.length" class="divide-y divide-slate-200">
          <div v-for="(row, index) in wishlistRows" :key="row.course.id" class="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div class="flex min-w-0 flex-1 items-center gap-4"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-sm font-bold text-rose-700">{{ index + 1 }}</div><img :src="row.course.image || row.course.thumbnailUrl" :alt="row.course.title" class="h-12 w-20 shrink-0 rounded-lg object-cover" /><div class="min-w-0"><h3 class="truncate font-semibold text-slate-950">{{ row.course.title }}</h3><p class="mt-1 text-xs text-slate-500">{{ row.course.category || 'Uncategorized' }}</p></div></div>
            <div class="flex items-center gap-5 sm:w-64 sm:justify-end"><div class="min-w-28"><div class="mb-1 flex justify-between text-xs text-slate-500"><span>Interest</span><span>{{ row.count }}</span></div><div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-rose-500" :style="{ width: `${Math.min((row.count / Math.max(totalSaved, 1)) * 100 * 2, 100)}%` }" /></div></div><div class="text-right text-sm font-semibold text-slate-700">{{ row.count }} {{ row.count === 1 ? 'save' : 'saves' }}</div></div>
          </div>
        </div>
        <div v-else class="px-6 py-14 text-center"><BookHeart class="mx-auto h-10 w-10 text-slate-300" /><h3 class="mt-4 font-semibold text-slate-950">No wishlist activity yet</h3><p class="mt-2 text-sm text-slate-500">Student course saves will appear here when they add courses to their wishlists.</p></div>
      </section>
    </div>
  </div>
</template>
