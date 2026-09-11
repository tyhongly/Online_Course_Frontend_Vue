<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MoreHorizontal, Plus, Search } from 'lucide-vue-next';
import { courseStore } from '../../store/courseStore.js';

const searchQuery = ref('');
const error = ref('');
const selectedCourse = ref(null);
const router = useRouter();

const fallbackCourses = [
  { id: 1, title: 'React from First Principles', category: 'Web Development', sections: 12, students: 3480, status: 'Published', updated: '2 days ago' },
  { id: 2, title: 'SQL for Data Analysis', category: 'Data & Analytics', sections: 9, students: 5120, status: 'Published', updated: '1 week ago' },
  { id: 3, title: 'Intro to UX Research', category: 'Design', sections: 6, students: 1890, status: 'Draft', updated: '4 days ago' },
  { id: 4, title: 'Product Sense for PMs', category: 'Product & Business', sections: 8, students: 940, status: 'Published', updated: '3 weeks ago' },
  { id: 5, title: 'Advanced TypeScript', category: 'Web Development', sections: 11, students: 2210, status: 'Review', updated: 'yesterday' },
  { id: 6, title: 'Statistics for ML', category: 'Data & Analytics', sections: 14, students: 4010, status: 'Published', updated: '5 days ago' },
];

const courses = computed(() => {
  const source = courseStore.courses && courseStore.courses.length ? courseStore.courses : fallbackCourses;

  return source.slice(0, 6).map((course) => ({
    ...course,
    title: course.title || course.name || 'Untitled course',
    category: course.category || course.categoryName || 'Uncategorized',
    sections: course.sections ?? course.lessons?.length ?? 0,
    students: course.students ?? course.enrollmentCount ?? 0,
    status: course.status || (course.published ? 'Published' : 'Draft'),
    updated: course.updated ?? 'Recently',
  }));
});

const filteredCourses = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return courses.value;

  return courses.value.filter((course) =>
    [course.title, course.category, course.status].some((value) => String(value).toLowerCase().includes(q)),
  );
});

const categoryCount = computed(() => new Set(filteredCourses.value.map((course) => course.category)).size);

onMounted(async () => {
  try {
    await courseStore.fetchCourses();
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to load courses.';
  }
});

const statusClasses = {
  Published: 'bg-emerald-100 text-emerald-700',
  Draft: 'bg-slate-100 text-slate-700',
  Review: 'bg-amber-100 text-amber-700',
};

const openCourseMenu = (course) => {
  selectedCourse.value = course;
};

const closeCourseMenu = () => {
  selectedCourse.value = null;
};

const removeCourse = async (id) => {
  if (confirm('Are you sure you want to delete this course?')) {
    try {
      error.value = '';
      await courseStore.deleteCourse(id);
      closeCourseMenu();
    } catch (requestError) {
      error.value = requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to delete course.';
    }
  }
};

const editCourse = (id) => {
  closeCourseMenu();
  router.push(`/admin/courses/${id}/edit`);
};
</script>

<template>
  <div class="min-h-full bg-grey-300 p-5 sm:p-8">
    <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{{ error }}</div>

    <div class="mx-auto max-w-6xl">
      <div class="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-[2.1rem] font-semibold tracking-[-0.03em] text-slate-800">Courses</h1>
          <p class="mt-2 text-sm text-slate-500">{{ filteredCourses.length }} courses across {{ categoryCount }} categories</p>
        </div>

        <router-link
          to="/admin/courses/new"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(46,94,189,0.8)] transition hover:bg-[#254ea6]"
        >
          <Plus class="h-4 w-4" />
          New course
        </router-link>
      </div>

      <div class="mb-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_22px_-20px_rgba(15,23,42,0.3)]">
        <Search class="h-4 w-4 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search courses"
          class="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_-24px_rgba(15,23,42,0.2)]">
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-left">
            <thead>
              <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th class="px-4 py-3.5 font-medium">Title</th>
                <th class="px-4 py-3.5 font-medium">Category</th>
                <th class="px-4 py-3.5 font-medium">Sections</th>
                <th class="px-4 py-3.5 font-medium">Students</th>
                <th class="px-4 py-3.5 font-medium">Status</th>
                <th class="px-4 py-3.5 font-medium">Updated</th>
                <th class="px-4 py-3.5 text-right">&nbsp;</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200 text-sm text-slate-700">
              <tr v-for="course in filteredCourses" :key="course.id" class="align-middle hover:bg-slate-50">
                <td class="px-4 py-4 font-medium text-slate-800">{{ course.title }}</td>
                <td class="px-4 py-4 text-slate-600">{{ course.category }}</td>
                <td class="px-4 py-4 text-slate-600">{{ course.sections }}</td>
                <td class="px-4 py-4 text-slate-600">{{ course.students.toLocaleString() }}</td>
                <td class="px-4 py-4">
                  <span :class="['inline-flex rounded-full px-2.5 py-1 text-xs font-medium', statusClasses[course.status] || 'bg-slate-100 text-slate-700']">
                    {{ course.status }}
                  </span>
                </td>
                <td class="px-4 py-4 text-slate-600">{{ course.updated }}</td>
                <td class="px-4 py-4 text-right">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                    aria-label="More actions"
                    @click="openCourseMenu(course)"
                  >
                    <MoreHorizontal class="h-4 w-4" />
                  </button>
                </td>
              </tr>

              <tr v-if="filteredCourses.length === 0">
                <td colspan="7" class="px-4 py-10 text-center text-slate-500">No courses found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="selectedCourse" class="fixed inset-0 z-40 bg-[#7d7d7d]/70">
      <div class="ml-auto h-full w-full max-w-[520px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{{ selectedCourse.category }}</div>
          <button type="button" class="text-2xl leading-none text-slate-500 hover:text-slate-700" @click="closeCourseMenu">×</button>
        </div>

        <div class="px-5 py-5">
          <h2 class="text-[2.2rem] font-semibold tracking-[-0.05em] text-slate-900">{{ selectedCourse.title }}</h2>

          <div class="mt-5 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {{ selectedCourse.status }}
          </div>

          <div class="mt-6 grid grid-cols-2 gap-6 text-slate-600">
            <div>
              <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Sections</div>
              <div class="mt-2 text-[2rem] font-semibold tracking-[-0.06em] text-slate-900">{{ selectedCourse.sections }}</div>
            </div>
            <div>
              <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Students</div>
              <div class="mt-2 text-[2rem] font-semibold tracking-[-0.06em] text-slate-900">{{ selectedCourse.students.toLocaleString() }}</div>
            </div>
          </div>

          <div class="mt-6 text-sm text-slate-500">Last updated {{ selectedCourse.updated }} ago</div>

          <div class="mt-8 space-y-2">
            <button
              type="button"
              class="w-full rounded-md bg-[#2d5cac] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254ea6]"
              @click="editCourse(selectedCourse.id)"
            >
              Edit course
            </button>

            <button
              type="button"
              class="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              @click="router.push(`/admin/courses/${selectedCourse.id}/sections`); closeCourseMenu()"
            >
              View sections
            </button>

            <button
              type="button"
              class="w-full rounded-md border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              @click="removeCourse(selectedCourse.id)"
            >
              Delete course
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
