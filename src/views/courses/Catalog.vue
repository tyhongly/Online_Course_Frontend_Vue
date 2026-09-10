<script setup>
import { computed, ref, watch } from 'vue';
import { ChevronDown, Search } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import CatalogCourseCard from '../../components/CatalogCourseCard.vue';
import { isTechnologyCourse } from '../../utils/technologyContent.js';

const searchQuery = ref('');
const selectedType = ref('All Courses');
const selectedCategory = ref('All');
const sortBy = ref('Popular');
const route = useRoute();
const router = useRouter();

const demoCourses = [
  {
    id: 1,
    title: 'Design Systems Essentials for Modern Interfaces',
    category: 'Design',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1840,
    duration: '12h 40m',
    price: 59
  },
  {
    id: 2,
    title: 'Practical Figma Tokens and Components Handbook',
    category: 'Design',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 920,
    duration: '8h 10m',
    price: 0
  },
  {
    id: 3,
    title: 'Motion Design Microinteractions Masterclass',
    category: 'Design',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1330,
    duration: '10h 05m',
    price: 69
  },
  {
    id: 4,
    title: 'Visual Hierarchy and Layout Patterns Guide',
    category: 'Design',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 710,
    duration: '6h 45m',
    price: 0
  },
  {
    id: 5,
    title: 'Modern HTML, CSS, and Responsive Layouts',
    category: 'Development',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 3120,
    duration: '18h 20m',
    price: 79
  },
  {
    id: 6,
    title: 'JavaScript Fundamentals for Real Projects',
    category: 'Development',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1450,
    duration: '9h 30m',
    price: 0
  },
  {
    id: 7,
    title: 'Vue 3 Production Patterns',
    category: 'Development',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 2010,
    duration: '14h 15m',
    price: 89
  },
  {
    id: 8,
    title: 'Front-End Architecture and State Management Guide',
    category: 'Development',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 860,
    duration: '7h 25m',
    price: 0
  },
  {
    id: 9,
    title: 'Cloud Architecture and Scalable Systems',
    category: 'Cloud Computing',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 970,
    duration: '11h 00m',
    price: 89
  },
  {
    id: 10,
    title: 'Software Architecture and Design Patterns',
    category: 'Development',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 640,
    duration: '6h 20m',
    price: 0
  },
  {
    id: 11,
    title: 'API Design and Integration Patterns',
    category: 'Development',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1520,
    duration: '9h 55m',
    price: 65
  },
  {
    id: 12,
    title: 'Linux Administration and Shell Scripting',
    category: 'System Administration',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop',
    rating: 4.6,
    reviews: 530,
    duration: '5h 50m',
    price: 0
  },
  {
    id: 13,
    title: 'Python Data Analysis Essentials',
    category: 'Data Science',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 2680,
    duration: '21h 40m',
    price: 99
  },
  {
    id: 14,
    title: 'Statistics for Data Teams Handbook',
    category: 'Data Science',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1180,
    duration: '8h 15m',
    price: 0
  },
  {
    id: 15,
    title: 'Machine Learning Workflow Masterclass',
    category: 'Data Science',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1960,
    duration: '24h 10m',
    price: 119
  },
  {
    id: 16,
    title: 'Data Storytelling and Dashboard Design Guide',
    category: 'Data Science',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 790,
    duration: '7h 05m',
    price: 0
  },
  {
    id: 17,
    title: 'Technical SEO and Web Performance',
    category: 'Development',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1710,
    duration: '13h 25m',
    price: 59
  },
  {
    id: 18,
    title: 'UX Research and Product Discovery',
    category: 'Design',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 820,
    duration: '6h 30m',
    price: 0
  },
  {
    id: 19,
    title: 'Automated Testing with Playwright',
    category: 'Development',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 980,
    duration: '10h 50m',
    price: 89
  },
  {
    id: 20,
    title: 'Network Monitoring and Observability',
    category: 'Networking',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop',
    rating: 4.6,
    reviews: 560,
    duration: '5h 40m',
    price: 0
  },
  {
    id: 21,
    title: 'AI Product Thinking and Use-Case Design',
    category: 'AI',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 2230,
    duration: '15h 35m',
    price: 129
  },
  {
    id: 22,
    title: 'Prompt Engineering for Teams Handbook',
    category: 'AI',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1090,
    duration: '7h 15m',
    price: 0
  },
  {
    id: 23,
    title: 'Applied Generative AI Workflows',
    category: 'AI',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1470,
    duration: '16h 20m',
    price: 149
  },
  {
    id: 24,
    title: 'Responsible AI and Governance Guide',
    category: 'AI',
    type: 'document',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 740,
    duration: '6h 55m',
    price: 0
  }
];

const courses = computed(() => courseStore.courses
  .filter((course) => course.published !== false && course.status !== 'draft' && isTechnologyCourse(course))
  .map((course) => {
    const type = course.type || (Number(course.price) === 0 ? 'document' : 'video');

    return {
      ...course,
      category: course.category || course.categoryName || 'General',
      type,
      price: type === 'document' ? 0 : Number(course.price) || 0,
      image: course.thumbnailUrl || course.image || '',
      rating: Number(course.rating) || 0,
      reviews: Number(course.reviews) || 0,
      duration: course.duration || 'Self paced'
    };
  }));

const categories = computed(() => ['All', ...new Set(courses.value.map((course) => course.category))]);

const courseTypeOptions = ['All Courses', 'Documents', 'Videos'];
const sortOptions = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

watch(
  () => route.query.type,
  (type) => {
    selectedType.value = type === 'document'
      ? 'Documents'
      : type === 'video'
        ? 'Videos'
        : 'All Courses';
  },
  { immediate: true }
);

const setCourseType = (type) => {
  router.push({
    path: '/courses',
    query: type === 'Documents' ? { type: 'document' } : type === 'Videos' ? { type: 'video' } : {}
  });
};

const filteredCourses = computed(() => {
  let result = courses.value.filter((course) => {
    const matchesSearch = !searchQuery.value
      || course.title.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
      || course.category.toLowerCase().includes(searchQuery.value.toLowerCase().trim());

    const matchesType = selectedType.value === 'All Courses'
      || (selectedType.value === 'Documents' && course.type === 'document')
      || (selectedType.value === 'Videos' && course.type === 'video');

    const matchesCategory = selectedCategory.value === 'All' || course.category === selectedCategory.value;
    return matchesSearch && matchesType && matchesCategory;
  });

  if (sortBy.value === 'Newest') {
    result = [...result].sort((a, b) => b.id - a.id);
  } else if (sortBy.value === 'Price: Low to High') {
    result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy.value === 'Price: High to Low') {
    result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
  } else {
    result = [...result].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }

  return result;
});
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[#f7f9fd] text-slate-900">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[-8rem] top-[-7rem] h-[26rem] w-[26rem] rounded-full bg-sky-200/35 blur-3xl"></div>
      <div class="absolute right-[-9rem] top-[6rem] h-[28rem] w-[28rem] rounded-full bg-violet-200/30 blur-3xl"></div>
      <div class="absolute bottom-[-10rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl"></div>
    </div>

    <main class="relative mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <section class="max-w-3xl">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
          TosRean Course Catalog
        </p>
        <h1 class="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          Course Catalog
        </h1>
        <p class="mt-3 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
          Find the right course for your learning journey.
        </p>
      </section>

      <section class="mt-7">
        <div class="relative max-w-4xl">
          <Search class="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses..."
            class="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-base text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div class="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div class="flex flex-wrap gap-3">
            <button
              v-for="type in courseTypeOptions"
              :key="type"
              type="button"
              @click="setCourseType(type)"
              class="rounded-full border px-4 py-2.5 text-sm font-medium transition"
              :class="selectedType === type
                ? 'border-sky-200 bg-sky-600 text-white shadow-sm shadow-sky-200/70'
                : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700'"
            >
              {{ type }}
            </button>

          </div>

          <div class="flex flex-wrap gap-3">
            <label class="relative min-w-[180px]">
              <select
                v-model="selectedCategory"
                class="h-11 w-full appearance-none rounded-full border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              >
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>

            <label class="relative min-w-[210px]">
              <select
                v-model="sortBy"
                class="h-11 w-full appearance-none rounded-full border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              >
                <option v-for="option in sortOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>
          </div>
        </div>

        <p class="mt-5 text-sm font-medium text-slate-500">
          Showing {{ filteredCourses.length }} courses
        </p>
      </section>

      <section class="mt-6">
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <CatalogCourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
        </div>

        <div
          v-if="filteredCourses.length === 0"
          class="mt-12 rounded-3xl border border-dashed border-slate-200 bg-white/70 px-6 py-14 text-center text-sm text-slate-500 shadow-sm"
        >
          No courses found matching your filters.
        </div>
      </section>
    </main>
  </div>
</template>
