<script setup>
import { computed, onMounted, ref } from 'vue';
import { ArrowLeft, BookOpen, FilePlus2, Pencil, Trash2 } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';

const route = useRoute();
const router = useRouter();
const error = ref('');
const isLoading = ref(true);

const courseId = computed(() => route.params.id);
const course = computed(() => courseStore.courses.find((item) => String(item.id) === String(courseId.value)));
const sections = computed(() => [...(course.value?.lessons || [])].sort((a, b) => (a.order || 0) - (b.order || 0)));
const publishedCount = computed(() => sections.value.filter((section) => section.published !== false).length);

const loadCourse = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    if (!course.value) {
      await courseStore.fetchCourses();
    }

    if (!course.value) {
      router.replace('/admin/courses');
    }
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to load course sections.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadCourse);

const editSection = (sectionId) => {
  router.push({
    name: 'AdminLessonEdit',
    params: { id: sectionId },
    query: { courseId: courseId.value },
  });
};

const deleteSection = (sectionId) => {
  if (!course.value || !confirm('Delete this section?')) return;

  try {
    courseStore.deleteLesson(course.value.id, sectionId);
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to delete section.';
  }
};
</script>

<template>
  <div class="min-h-full bg-[#f5f3ef] p-5 sm:p-8">
    <div class="mx-auto max-w-5xl">
      <div v-if="error" class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

      <div v-if="isLoading" class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Loading sections...
      </div>

      <template v-else-if="course">
        <header class="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button type="button" class="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900" @click="router.push('/admin/courses')">
              <ArrowLeft class="h-4 w-4" />
              Back to courses
            </button>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Course sections</p>
            <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ course.title }}</h1>
            <p class="mt-2 text-sm text-slate-600">Organize the learning path and manage each lesson.</p>
          </div>
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" @click="router.push(`/admin/lessons/new?courseId=${course.id}`)">
            <FilePlus2 class="h-4 w-4" />
            Add section
          </button>
        </header>

        <section class="mb-6 grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-slate-200 bg-white p-5">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Total sections</div>
            <div class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ sections.length }}</div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Published</div>
            <div class="mt-2 text-3xl font-semibold tracking-tight text-emerald-700">{{ publishedCount }}</div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5">
            <div class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Course format</div>
            <div class="mt-2 text-lg font-semibold capitalize text-slate-950">{{ course.type || 'Course' }}</div>
          </div>
        </section>

        <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)]">
          <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 class="font-semibold text-slate-950">Curriculum</h2>
              <p class="mt-1 text-sm text-slate-500">{{ sections.length }} learning {{ sections.length === 1 ? 'section' : 'sections' }}</p>
            </div>
            <BookOpen class="h-5 w-5 text-indigo-500" />
          </div>

          <div v-if="sections.length" class="divide-y divide-slate-200">
            <div v-for="(section, index) in sections" :key="section.id" class="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div class="flex min-w-0 items-start gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{{ index + 1 }}</div>
                <div class="min-w-0">
                  <h3 class="truncate font-semibold text-slate-950">{{ section.title || 'Untitled section' }}</h3>
                  <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span class="rounded-full bg-slate-100 px-2.5 py-1 capitalize">{{ section.type || 'text' }}</span>
                    <span>{{ section.published === false ? 'Draft' : 'Published' }}</span>
                  </div>
                </div>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50" @click="editSection(section.id)">
                  <Pencil class="h-3.5 w-3.5" />
                  Edit lesson
                </button>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50" @click="deleteSection(section.id)">
                  <Trash2 class="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div v-else class="px-6 py-14 text-center">
            <BookOpen class="mx-auto h-10 w-10 text-slate-300" />
            <h3 class="mt-4 font-semibold text-slate-900">No sections yet</h3>
            <p class="mt-1 text-sm text-slate-500">Add the first section to start building this course.</p>
            <button type="button" class="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800" @click="router.push(`/admin/lessons/new?courseId=${course.id}`)">
              Add first section
            </button>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
