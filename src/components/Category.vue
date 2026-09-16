<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Search, X, ChevronRight, Star, Clock, Users } from 'lucide-vue-next';
import { categoryStore } from '../store/categoryStore.js';
import { courseStore } from '../store/courseStore.js';
import defaultCourseImage from '../image/Group_Study.jpg';

const route = useRoute();
const slug = computed(() => route.params.slug);
const query = ref('');
const level = ref('All levels');
const sort = ref('popular');

const parseStudents = (students) => {
  const value = String(students || '0').trim().toUpperCase();
  const number = Number.parseFloat(value);
  if (value.endsWith('K')) return Math.round(number * 1000);
  if (value.endsWith('M')) return Math.round(number * 1000000);
  return Number.isFinite(number) ? number : 0;
};

const normalizeSlug = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, '-');

const category = computed(() => {
  const activeSlug = normalizeSlug(slug.value);
  return categoryStore.categories.find((item) => normalizeSlug(item.slug || item.name || item.categoryName) === activeSlug) ?? null;
});

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    await courseStore.fetchCourses();
  } catch (error) {
    console.error('Unable to load category/courses from API:', error);
  }
});

watch(slug, () => {
  query.value = '';
  level.value = 'All levels';
  sort.value = 'popular';
});

const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
const sorts = [
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
];

const courses = computed(() => {
  if (!category.value) return [];

  const categoryName = category.value.name ?? category.value.categoryName;
  const q = query.value.trim().toLowerCase();
  let list = courseStore.courses
    .filter((course) => (course.category || course.categoryName || course.category?.name) === categoryName)
    .map((course) => ({
      id: course.id,
      slug: slug.value,
      title: course.title || course.name,
      instructor: course.instructor || 'Course Team',
      price: Number(course.price) || 0,
      oldPrice: Number(course.originalPrice || course.price) || 0,
      rating: Number(course.rating) || 0,
      reviews: Number(course.reviews) || 0,
      hours: Number.parseFloat(String(course.duration || '0')) || 0,
      students: parseStudents(course.students),
      level: course.level || 'Beginner',
      free: Number(course.price) === 0,
      image: course.image || defaultCourseImage,
    }));

  if (q) {
    list = list.filter((c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
  }

  if (level.value !== 'All levels') {
    list = list.filter((c) => c.level === level.value);
  }

  const sorted = [...list];
  if (sort.value === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  else if (sort.value === 'low') sorted.sort((a, b) => a.price - b.price);
  else if (sort.value === 'high') sorted.sort((a, b) => b.price - a.price);
  else sorted.sort((a, b) => b.students - a.students);

  return sorted;
});

const related = computed(() =>
  categoryStore.categories.filter((c) => normalizeSlug(c.slug || c.name || c.categoryName) !== normalizeSlug(slug.value)).slice(0, 6)
);
</script>

<template>
  <main class="pt-28 pb-20 bg-light min-h-screen">
    <div class="container mx-auto px-4 md:px-6">

      <!-- Unknown slug -->
      <div v-if="!category" class="text-center py-20">
        <div class="text-5xl mb-4">🤔</div>
        <h1 class="font-heading font-bold text-2xl text-dark mb-2">Category not found</h1>
        <p class="text-dark-light mb-6">This category doesn't exist or has been moved.</p>
        <router-link to="/categories" class="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium shadow-md">
          Back to categories
        </router-link>
      </div>

      <template v-else>
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-dark-light mb-6" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-primary transition">Home</router-link>
          <ChevronRight class="w-4 h-4 shrink-0" />
          <router-link to="/categories" class="hover:text-primary transition">Categories</router-link>
          <ChevronRight class="w-4 h-4 shrink-0" />
          <span class="text-dark font-medium truncate">{{ category.name }}</span>
        </nav>

        <!-- Category header -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center gap-5">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
              {{ category.icon }}
            </div>
            <div class="min-w-0">
              <h1 class="font-heading font-bold text-2xl md:text-3xl text-dark mb-1">
                {{ category.name }}
              </h1>
              <p class="text-dark-light">{{ category.desc }}</p>
            </div>
            <div class="sm:ml-auto shrink-0">
              <span class="inline-block bg-light text-dark-light text-sm font-medium px-4 py-2 rounded-full">
                {{ courses.length }} {{ courses.length === 1 ? 'course' : 'courses' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Search + filters -->
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <div class="relative flex-1">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-light" />
            <input
              v-model="query"
              type="text"
              :placeholder="`Search in ${category.name}...`"
              aria-label="Search courses in this category"
              class="w-full pl-12 pr-12 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm text-dark placeholder:text-dark-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <button v-if="query" @click="query = ''" aria-label="Clear search"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-dark-light hover:bg-light transition">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="flex gap-3">
            <select v-model="level" aria-label="Filter by level"
              class="px-5 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm text-dark font-medium focus:outline-none focus:border-primary cursor-pointer">
              <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
            </select>
            <select v-model="sort" aria-label="Sort courses"
              class="px-5 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm text-dark font-medium focus:outline-none focus:border-primary cursor-pointer">
              <option v-for="s in sorts" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>
        </div>

        <!-- Course grid -->
        <div v-if="courses.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="course in courses"
            :key="course.id"
            :to="`/course/${course.id}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col"
          >
            <div class="h-40 bg-primary/10 overflow-hidden">
              <img
                :src="course.image"
                :alt="course.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="($event) => ($event.target.src = defaultCourseImage)"
              />
            </div>
            <div class="p-5 flex flex-col flex-1">
              <span class="inline-block self-start text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                {{ course.level }}
              </span>
              <h2 class="font-heading font-bold text-base text-dark mb-1 leading-snug group-hover:text-primary transition-colors">
                {{ course.title }}
              </h2>
              <p class="text-sm text-dark-light mb-3">{{ course.instructor }}</p>

              <div class="flex items-center gap-1.5 mb-3">
                <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span class="text-sm font-bold text-dark">{{ course.rating }}</span>
                <span class="text-xs text-dark-light">({{ course.reviews.toLocaleString() }})</span>
              </div>

              <div class="flex items-center gap-4 text-xs text-dark-light mb-4">
                <span class="flex items-center gap-1"><Clock class="w-3.5 h-3.5" />{{ course.hours }}h</span>
                <span class="flex items-center gap-1"><Users class="w-3.5 h-3.5" />{{ course.students.toLocaleString() }}</span>
              </div>

              <div class="mt-auto flex items-baseline gap-2">
                <span v-if="course.free" class="font-heading font-bold text-lg text-emerald-600">FREE</span>
                <template v-else>
                  <span class="font-heading font-bold text-lg text-dark">${{ course.price }}</span>
                  <span class="text-sm text-dark-light line-through">${{ course.oldPrice }}</span>
                </template>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div class="text-5xl mb-4">📭</div>
          <h2 class="font-heading font-bold text-xl text-dark mb-2">No courses found</h2>
          <p class="text-dark-light mb-6">
            Try clearing your search or picking a different level.
          </p>
          <button @click="query = ''; level = 'All levels'"
            class="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-md">
            Reset filters
          </button>
        </div>

        <!-- Related categories -->
        <section class="mt-16">
          <h2 class="font-heading font-bold text-xl text-dark mb-5">Explore other categories</h2>
          <div class="flex flex-wrap gap-3">
            <router-link
              v-for="c in related"
              :key="c.slug"
              :to="`/categories/${c.slug}`"
              class="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-full text-sm font-medium text-dark hover:border-primary hover:text-primary transition"
            >
              <span>{{ c.icon }}</span>
              <span>{{ c.name }}</span>
            </router-link>
          </div>
        </section>
      </template>

    </div>
  </main>
</template>
