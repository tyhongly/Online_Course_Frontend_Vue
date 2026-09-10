<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import { createSection } from '../../services/sectionApi.js';

const route = useRoute();
const router = useRouter();
const isNew = computed(() => route.path.includes('/new'));
const lessonId = computed(() => Number(route.params.id));
const saveError = ref('');
const isSaving = ref(false);

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
    router.push('/admin/courses');
    return;
  }

  const courseIdFromQuery = Number(route.query.courseId);
  selectedCourseId.value = courses.value.some((course) => course.id === courseIdFromQuery)
    ? courseIdFromQuery
    : (selectedCourseId.value || courses.value[0].id);

  if (!isNew.value) {
    const course = courseStore.courses.find((item) => item.id === courseIdFromQuery) || courseStore.courses.find((item) => (item.lessons || []).some((lesson) => lesson.id === lessonId.value));
    const lesson = course?.lessons?.find((item) => item.id === lessonId.value);

    if (!course || !lesson) {
      router.push('/admin/courses');
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

const saveLesson = async () => {
  saveError.value = '';
  const courseId = Number(selectedCourseId.value);
  // Document courses always use text type
  const resolvedType = isDocumentCourse.value ? 'text' : (form.value.type || 'text');

  if (isNew.value) {
    isSaving.value = true;

    try {
      const position = Number(form.value.order) || 1;
      const response = await createSection({
        courseId,
        title: form.value.title,
        position,
        hasDocument: resolvedType !== 'video',
        body: resolvedType === 'video' ? '' : form.value.content,
        fileUrl: '',
        fileType: '',
        ocrStatus: '',
        hasVideo: resolvedType === 'video',
        videoUrl: resolvedType === 'video' ? form.value.content : '',
        videoDurationSec: 0,
        hasResources: false,
        readingMode: 'scroll',
        isPreview: form.value.published,
      });
      const payload = response?.data?.data || response?.data || response;
      const createdSection = payload?.section || payload;

      courseStore.addLesson(courseId, {
        id: createdSection?.id || Date.now(),
        title: createdSection?.title || form.value.title,
        type: resolvedType,
        order: createdSection?.position || position,
        content: resolvedType === 'video' ? form.value.content : form.value.content,
        published: createdSection?.isPreview ?? form.value.published,
      });
      router.push(`/admin/courses/${courseId}/sections`);
    } catch (requestError) {
      saveError.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to create section.';
    } finally {
      isSaving.value = false;
    }
    return;
  }

  const course = courseStore.courses.find((item) => item.id === courseId);
  const lesson = course?.lessons?.find((item) => item.id === lessonId.value);

  if (!course || !lesson) {
    router.push('/admin/courses');
    return;
  }

  courseStore.updateLesson(courseId, lessonId.value, {
    title: form.value.title,
    type: resolvedType,
    order: Number(form.value.order) || 1,
    content: form.value.content,
    published: form.value.published,
  });
  router.push(`/admin/courses/${courseId}/sections`);
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.35)] sm:p-8">
      <div v-if="saveError" class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ saveError }}</div>
      <div class="mb-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Course sections</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ isNew ? 'Add Section' : 'Edit Section' }}</h1>
        <p class="mt-2 text-sm text-slate-600">Add structured content to the course learning path.</p>
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
          <label class="mb-2 block text-sm font-medium text-slate-700">Section Title</label>
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
        <router-link :to="selectedCourseId ? `/admin/courses/${selectedCourseId}/sections` : '/admin/courses'" class="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</router-link>
        <button :disabled="isSaving" @click="saveLesson" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">{{ isSaving ? 'Saving...' : (isNew ? 'Add Section' : 'Save Changes') }}</button>
      </div>
    </div>
  </div>
</template>
