<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';
import { authStore } from '../../store/authStore.js';
import { FileText, Video, BookOpen, Clock, CheckCircle2, Award } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const courseId = Number(route.params.courseId);
const lessonId = ref(Number(route.params.lessonId));

const course = computed(() => courseStore.courses.find(c => c.id === courseId));
const isDocumentCourse = computed(() => course.value?.type === 'document' || Number(course.value?.price) === 0);

const enrollment = computed(() => authStore.user ? enrollmentStore.getEnrollment(authStore.user.id, courseId) : null);

const currentLessonIndex = computed(() => {
  if (!course.value || !course.value.lessons) return -1;
  return course.value.lessons.findIndex(l => l.id === lessonId.value);
});

const currentLesson = computed(() => {
  if (currentLessonIndex.value === -1) return course.value?.lessons?.[0] || null;
  return course.value.lessons[currentLessonIndex.value];
});

watch(() => route.params.lessonId, (newVal) => {
  if (newVal) lessonId.value = Number(newVal);
});

// If no lessonId in route or invalid, auto select first lesson
watch(course, (newCourse) => {
  if (newCourse?.lessons?.length && (!lessonId.value || currentLessonIndex.value === -1)) {
    lessonId.value = newCourse.lessons[0].id;
  }
}, { immediate: true });

const isComplete = computed(() => {
  if (!enrollment.value || !currentLesson.value) return false;
  return !!enrollment.value.progress[currentLesson.value.id];
});

const markComplete = () => {
  if (authStore.user && currentLesson.value) {
    enrollmentStore.markLessonComplete(authStore.user.id, courseId, currentLesson.value.id);
  }
};

const goToNext = () => {
  markComplete();
  if (currentLessonIndex.value < course.value.lessons.length - 1) {
    const nextLesson = course.value.lessons[currentLessonIndex.value + 1];
    router.push(`/learn/${courseId}/lesson/${nextLesson.id}`);
  } else {
    router.push('/student/dashboard');
  }
};

// Quiz Logic
const selectedAnswers = ref({});
const quizSubmitted = ref(false);
const quizScore = ref(0);

const submitQuiz = () => {
  let correct = 0;
  currentLesson.value.content.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.answer) correct++;
  });
  quizScore.value = Math.round((correct / currentLesson.value.content.length) * 100);
  quizSubmitted.value = true;
  enrollmentStore.saveQuizScore(authStore.user.id, courseId, currentLesson.value.id, quizScore.value);
};
</script>

<template>
  <div v-if="course" class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col h-screen sticky top-0">
      <div class="p-4 border-b border-gray-200">
        <router-link to="/student/dashboard" class="text-sm text-gray-500 hover:text-primary mb-2 inline-flex items-center gap-1">
          &larr; Back to Dashboard
        </router-link>
        <div class="mt-2 flex items-center gap-2">
          <span 
            :class="[
              'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
              isDocumentCourse ? 'bg-emerald-100 text-emerald-800' : 'bg-primary/10 text-primary'
            ]"
          >
            {{ isDocumentCourse ? 'Free Document Course' : 'Video Course' }}
          </span>
        </div>
        <h2 class="text-base font-bold text-gray-800 line-clamp-2 mt-1">{{ course.title }}</h2>
      </div>

      <div class="flex-grow overflow-y-auto">
        <div class="divide-y divide-gray-100">
          <router-link 
            v-for="(lesson, idx) in course.lessons" 
            :key="lesson.id"
            :to="`/learn/${courseId}/lesson/${lesson.id}`"
            :class="['p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors', lesson.id === currentLesson?.id ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent']"
          >
            <div class="mt-1">
              <!-- Check icon if complete -->
              <svg v-if="enrollment?.progress[lesson.id]" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <!-- Number if not -->
              <div v-else class="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">
                {{ idx + 1 }}
              </div>
            </div>
            <div class="flex-grow min-w-0">
              <p :class="['text-sm font-medium line-clamp-2', lesson.id === currentLesson?.id ? 'text-primary font-bold' : 'text-gray-700']">
                {{ lesson.title }}
              </p>
              <div class="flex items-center gap-1.5 mt-1">
                <span 
                  :class="[
                    'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded',
                    (isDocumentCourse || lesson.type === 'text') ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                  ]"
                >
                  {{ (isDocumentCourse || lesson.type === 'text') ? 'Document' : lesson.type }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col h-screen overflow-y-auto bg-gray-50/50">
      <div v-if="currentLesson" class="max-w-4xl mx-auto w-full p-6 md:p-10 flex-grow flex flex-col">
        
        <!-- Document Lesson Reader View (For Free Document Courses & Text Lessons) -->
        <div v-if="isDocumentCourse || currentLesson.type === 'text'" class="flex-grow flex flex-col">
          <!-- Document Header -->
          <header class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                <FileText class="w-3.5 h-3.5" /> Document Module {{ currentLessonIndex + 1 }} of {{ course.lessons.length }}
              </span>
              <span class="text-xs text-gray-400 font-medium flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" /> Self-paced Reading
              </span>
            </div>
            <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">{{ currentLesson.title }}</h1>
          </header>

          <!-- Document Body -->
          <article class="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 flex-grow mb-8">
            <div class="prose max-w-none text-gray-800 leading-relaxed text-base space-y-4" v-html="currentLesson.content"></div>
          </article>
          
          <!-- Bottom Navigation Bar -->
          <div class="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <button 
              @click="markComplete" 
              :disabled="isComplete" 
              :class="[
                'px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2',
                isComplete ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <CheckCircle2 class="w-5 h-5" />
              {{ isComplete ? 'Read & Completed' : 'Mark as Read' }}
            </button>
            <button 
              @click="goToNext" 
              class="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
            >
              {{ currentLessonIndex < course.lessons.length - 1 ? 'Next Document →' : 'Finish Course' }}
            </button>
          </div>
        </div>

        <!-- Video Lesson (For Paid Video Courses Only) -->
        <div v-else-if="currentLesson.type === 'video'" class="flex-grow flex flex-col">
          <header class="mb-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                <Video class="w-3.5 h-3.5" /> Video Lesson {{ currentLessonIndex + 1 }}
              </span>
            </div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ currentLesson.title }}</h1>
          </header>

          <div class="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-lg mb-8">
            <iframe 
              v-if="currentLesson.content?.includes('youtube.com') || currentLesson.content?.includes('vimeo.com')"
              :src="currentLesson.content" 
              class="w-full h-full" 
              frameborder="0" 
              allowfullscreen
            ></iframe>
            <div v-else class="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center bg-slate-900">
              <Video class="h-16 w-16 mb-4 text-gray-500" />
              <p class="font-bold text-lg">Video Lesson Content</p>
              <p class="text-sm text-gray-400 mt-1">{{ currentLesson.content }}</p>
            </div>
          </div>
          
          <div class="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <button @click="markComplete" :disabled="isComplete" :class="['px-6 py-3 rounded-xl font-bold transition-colors', isComplete ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
              {{ isComplete ? 'Completed' : 'Mark as Complete' }}
            </button>
            <button @click="goToNext" class="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-md">
              {{ currentLessonIndex < course.lessons.length - 1 ? 'Next Lesson →' : 'Finish Course' }}
            </button>
          </div>
        </div>

        <!-- Quiz Lesson -->
        <div v-else-if="currentLesson.type === 'quiz'" class="flex-grow flex flex-col">
          <header class="mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ currentLesson.title }}</h1>
          </header>

          <div v-if="!quizSubmitted && !isComplete" class="space-y-6 mb-12">
            <div v-for="(q, idx) in currentLesson.content" :key="idx" class="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 class="font-bold text-lg mb-4">{{ idx + 1 }}. {{ q.q }}</h3>
              <div class="space-y-3">
                <label v-for="(opt, oIdx) in q.options" :key="oIdx" class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{'border-primary bg-primary/5': selectedAnswers[idx] === opt}">
                  <input type="radio" :name="'q_'+idx" :value="opt" v-model="selectedAnswers[idx]" class="w-4 h-4 text-primary" />
                  <span>{{ opt }}</span>
                </label>
              </div>
            </div>
            
            <button @click="submitQuiz" class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md hover:bg-primary-dark transition-colors">
              Submit Quiz
            </button>
          </div>
          
          <div v-else class="text-center py-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div class="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" :class="quizScore >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-500'">
              <span class="text-3xl font-bold">{{ quizScore || enrollment?.quizScores?.[currentLesson.id] || 100 }}%</span>
            </div>
            <h2 class="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p class="text-gray-500 mb-8">You have successfully completed this assessment.</p>
            
            <button @click="goToNext" class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-md">
              {{ currentLessonIndex < course.lessons.length - 1 ? 'Continue to Next Lesson' : 'Finish Course' }}
            </button>
          </div>
        </div>

      </div>
      <div v-else class="flex items-center justify-center h-full">
        <p class="text-gray-500 text-lg">Select a lesson from the sidebar to begin.</p>
      </div>
    </main>
  </div>
</template>
