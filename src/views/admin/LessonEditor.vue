<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';

const route = useRoute();
const router = useRouter();
const isNew = computed(() => route.path.includes('/new'));
const lessonId = computed(() => Number(route.params.id));

const courses = computed(() => courseStore.courses);
const selectedCourseId = ref(courses.value[0]?.id || null);

const selectedCourse = computed(() => courseStore.courses.find((course) => course.id === Number(selectedCourseId.value)));
const isDocumentCourse = computed(() => selectedCourse.value?.type === 'document' || Number(selectedCourse.value?.price) === 0);

const form = ref({
  title: '',
  type: 'text',
  order: 1,
  content: '',
  published: true,
});

onMounted(() => {
  if (!courses.value.length) {
    router.push('/admin/lessons');
    return;
  }

  if (!selectedCourseId.value) {
    selectedCourseId.value = courses.value[0].id;
  }

  if (!isNew.value) {
    const courseIdFromQuery = Number(route.query.courseId);
    const course = courseStore.courses.find((item) => item.id === courseIdFromQuery) || courseStore.courses.find((item) => (item.lessons || []).some((lesson) => lesson.id === lessonId.value));
    const lesson = course?.lessons?.find((item) => item.id === lessonId.value);

    if (!course || !lesson) {
      router.push('/admin/lessons');
      return;
    }

    selectedCourseId.value = course.id;
    form.value = {
      title: lesson.title || '',
      type: lesson.type || 'text',
      order: lesson.order || 1,
      content: lesson.content || '',
      published: lesson.published !== false,
    };
  }
});

const saveLesson = () => {
  const courseId = Number(selectedCourseId.value);
  // Document courses always use text type
  const resolvedType = isDocumentCourse.value ? 'text' : (form.value.type || 'text');

  if (isNew.value) {
    courseStore.addLesson(courseId, {
      title: form.value.title,
      type: resolvedType,
      order: Number(form.value.order) || 1,
      content: form.value.content,
      published: form.value.published,
    });
    router.push('/admin/lessons');
    return;
  }

  const course = courseStore.courses.find((item) => item.id === courseId);
  const lesson = course?.lessons?.find((item) => item.id === lessonId.value);

  if (!course || !lesson) {
    router.push('/admin/lessons');
    return;
  }

  courseStore.updateLesson(courseId, lessonId.value, {
    title: form.value.title,
    type: resolvedType,
    order: Number(form.value.order) || 1,
    content: form.value.content,
    published: form.value.published,
  });
  router.push('/admin/lessons');
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)] sm:p-8">
      <div class="mb-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Lessons</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ isNew ? 'Create Lesson' : 'Edit Lesson' }}</h1>
      </div>

      <div class="grid gap-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Course</label>
          <select v-model="selectedCourseId" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950">
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
          <!-- Course type indicator -->
          <div v-if="isDocumentCourse" class="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Free Document Course — lessons are text-based only
          </div>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Lesson Title</label>
          <input v-model="form.title" type="text" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" placeholder="Introduction" />
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Order</label>
            <input v-model="form.order" type="number" min="1" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Published</label>
            <select v-model="form.published" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950">
              <option :value="true">Published</option>
              <option :value="false">Draft</option>
            </select>
          </div>
        </div>
        <!-- Lesson type selector: only for video courses -->
        <div v-if="!isDocumentCourse">
          <label class="mb-2 block text-sm font-medium text-slate-700">Content Type</label>
          <select v-model="form.type" class="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950">
            <option value="video">Video (URL)</option>
            <option value="text">Text (HTML)</option>
            <option value="quiz">Quiz (JSON)</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            {{ isDocumentCourse ? 'Document Content (HTML)' : (form.type === 'video' ? 'Video URL' : (form.type === 'quiz' ? 'Quiz JSON' : 'HTML Content')) }}
          </label>
          <textarea v-model="form.content" rows="8" class="w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-slate-950" :placeholder="isDocumentCourse ? '<h2>Lesson Title</h2><p>Your document content here...</p>' : 'Lesson content or URL'"></textarea>
          <p v-if="!isDocumentCourse && form.type === 'quiz'" class="mt-2 text-xs text-slate-500">
            Example: <code>[{"q": "Question?", "options": ["A", "B"], "answer": "A"}]</code>
          </p>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-end gap-3">
        <router-link to="/admin/lessons" class="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</router-link>
        <button @click="saveLesson" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Save</button>
      </div>
    </div>
  </div>
</template>
