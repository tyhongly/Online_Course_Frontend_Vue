<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Search, X, ChevronRight, Star, Clock, Users } from 'lucide-vue-next';
import { categories, findCategory } from '../data/categories.js';

const route = useRoute();

const slug = computed(() => route.params.slug);
const category = computed(() => findCategory(slug.value));

// --- Replace this with your real API / store call -------------------
// e.g. const courses = ref([]); watch(slug, async s => courses.value = await api.getCourses(s), { immediate: true })
const allCourses = [
  { id: 1,  slug: 'web-development', title: 'Modern Web Development with Vue 3', instructor: 'Sok Dara',    price: 39.99, oldPrice: 89.99, rating: 4.8, reviews: 1240, hours: 22, students: 5300, level: 'Beginner' },
  { id: 2,  slug: 'web-development', title: 'Tailwind CSS from Zero to Pro',      instructor: 'Chan Nita',   price: 24.99, oldPrice: 59.99, rating: 4.7, reviews: 860,  hours: 14, students: 3100, level: 'Beginner' },
  { id: 3,  slug: 'web-development', title: 'Full-Stack Laravel + Vue',           instructor: 'Vireak Pich', price: 49.99, oldPrice: 119.99, rating: 4.9, reviews: 2010, hours: 38, students: 7800, level: 'Intermediate' },
  { id: 4,  slug: 'mobile-development', title: 'Flutter Complete Course',         instructor: 'Sreyneang L.', price: 44.99, oldPrice: 99.99, rating: 4.6, reviews: 990,  hours: 30, students: 4200, level: 'Beginner' },
  { id: 5,  slug: 'artificial-intelligence', title: 'Machine Learning Foundations', instructor: 'Dr. Kimsan', price: 59.99, oldPrice: 149.99, rating: 4.9, reviews: 3100, hours: 45, students: 11200, level: 'Intermediate' },
  { id: 6,  slug: 'artificial-intelligence', title: 'Building Apps with LLMs',    instructor: 'Rathana S.',  price: 34.99, oldPrice: 79.99, rating: 4.7, reviews: 540,  hours: 12, students: 1900, level: 'Advanced' },
  { id: 7,  slug: 'cybersecurity', title: 'Ethical Hacking Bootcamp',             instructor: 'Panha Chea',  price: 54.99, oldPrice: 129.99, rating: 4.8, reviews: 1780, hours: 36, students: 6400, level: 'Intermediate' },
  { id: 8,  slug: 'database', title: 'SQL Mastery for Developers',               instructor: 'Bopha Yun',   price: 29.99, oldPrice: 69.99, rating: 4.7, reviews: 1120, hours: 18, students: 4900, level: 'Beginner' },
  { id: 9,  slug: 'mobile-development', title: 'React Native Mobile Apps',        instructor: 'Sok Lina',    price: 39.99, oldPrice: 89.99, rating: 4.8, reviews: 760,  hours: 24, students: 3600, level: 'Intermediate' },
  { id: 10, slug: 'programming-languages', title: 'Python Programming Masterclass', instructor: 'Dara Vann',  price: 34.99, oldPrice: 79.99, rating: 4.8, reviews: 1530, hours: 26, students: 6900, level: 'Beginner' },
  { id: 11, slug: 'programming-languages', title: 'Java Fundamentals and OOP',    instructor: 'Kim Sopheak', price: 44.99, oldPrice: 99.99, rating: 4.7, reviews: 880,  hours: 28, students: 4100, level: 'Intermediate' },
  { id: 12, slug: 'database', title: 'MongoDB and NoSQL Essentials',             instructor: 'Nita Chhay',  price: 32.99, oldPrice: 74.99, rating: 4.6, reviews: 640,  hours: 16, students: 2800, level: 'Beginner' },
  { id: 13, slug: 'cybersecurity', title: 'Network Security Fundamentals',        instructor: 'Vuthy Sok',   price: 42.99, oldPrice: 94.99, rating: 4.7, reviews: 920,  hours: 20, students: 3900, level: 'Beginner' },
  { id: 14, slug: 'cloud-computing', title: 'AWS Cloud Practitioner Guide',       instructor: 'Chenda Ly',   price: 37.99, oldPrice: 84.99, rating: 4.8, reviews: 1100, hours: 21, students: 5100, level: 'Beginner' },
  { id: 15, slug: 'cloud-computing', title: 'Kubernetes on Cloud',                instructor: 'Rithy Meas',  price: 52.99, oldPrice: 119.99, rating: 4.7, reviews: 690,  hours: 30, students: 2700, level: 'Advanced' },
  { id: 16, slug: 'ui-ux-graphic-design', title: 'UI/UX Design with Figma',       instructor: 'Sreypov Chan', price: 35.99, oldPrice: 82.99, rating: 4.8, reviews: 1380, hours: 19, students: 6100, level: 'Beginner' },
  { id: 17, slug: 'ui-ux-graphic-design', title: 'Design Systems for Products',   instructor: 'Malis Touch', price: 45.99, oldPrice: 104.99, rating: 4.7, reviews: 570,  hours: 17, students: 2300, level: 'Intermediate' },
  { id: 18, slug: 'data-science-analytics', title: 'Data Analysis with Python',   instructor: 'Sokha Phan',  price: 41.99, oldPrice: 92.99, rating: 4.8, reviews: 1260, hours: 25, students: 5400, level: 'Beginner' },
  { id: 19, slug: 'data-science-analytics', title: 'Power BI Dashboard Design',   instructor: 'Borey Lim',   price: 36.99, oldPrice: 85.99, rating: 4.6, reviews: 730,  hours: 15, students: 3200, level: 'Intermediate' },
  { id: 20, slug: 'networking-sysadmin', title: 'Linux System Administration',    instructor: 'Sovan Khem',  price: 43.99, oldPrice: 98.99, rating: 4.7, reviews: 810,  hours: 27, students: 3500, level: 'Beginner' },
  { id: 21, slug: 'networking-sysadmin', title: 'Computer Networking Basics',     instructor: 'Vanna Tep',   price: 31.99, oldPrice: 72.99, rating: 4.6, reviews: 940,  hours: 18, students: 4300, level: 'Beginner' },
  { id: 22, slug: 'game-development', title: 'Unity Game Development',            instructor: 'Kosal Oum',   price: 49.99, oldPrice: 112.99, rating: 4.8, reviews: 1020, hours: 32, students: 4600, level: 'Beginner' },
  { id: 23, slug: 'game-development', title: 'Unreal Engine Level Design',        instructor: 'Serey Noun',  price: 54.99, oldPrice: 124.99, rating: 4.7, reviews: 480,  hours: 29, students: 1900, level: 'Intermediate' },
  { id: 24, slug: 'devops-software-engineering', title: 'Docker and CI/CD Pipelines', instructor: 'Rotha San', price: 46.99, oldPrice: 106.99, rating: 4.8, reviews: 870,  hours: 23, students: 3700, level: 'Intermediate' },
  { id: 25, slug: 'devops-software-engineering', title: 'Software Testing Essentials', instructor: 'Sokhom Chea', price: 33.99, oldPrice: 76.99, rating: 4.6, reviews: 650, hours: 16, students: 2900, level: 'Beginner' },
];

const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
const sorts = [
  { value: 'popular', label: 'Most popular' },
  { value: 'rating',  label: 'Highest rated' },
  { value: 'low',     label: 'Price: low to high' },
  { value: 'high',    label: 'Price: high to low' },
];

const query = ref('');
const level = ref('All levels');
const sort = ref('popular');

// reset filters when navigating between categories
watch(slug, () => {
  query.value = '';
  level.value = 'All levels';
  sort.value = 'popular';
});

const courses = computed(() => {
  const q = query.value.trim().toLowerCase();
  let list = allCourses.filter((c) => c.slug === slug.value);

  if (q) {
    list = list.filter(
      (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
    );
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
  categories.filter((c) => c.slug !== slug.value).slice(0, 6)
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
            <div class="h-40 bg-primary/10 flex items-center justify-center text-5xl">
              {{ category.icon }}
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
                <span class="font-heading font-bold text-lg text-dark">${{ course.price }}</span>
                <span class="text-sm text-dark-light line-through">${{ course.oldPrice }}</span>
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
