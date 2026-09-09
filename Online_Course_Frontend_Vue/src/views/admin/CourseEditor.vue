<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStore } from '../../store/courseStore.js';
import { categoryStore } from '../../store/categoryStore.js';

const route = useRoute();
const router = useRouter();

const isNew = computed(() => route.path.includes('/new'));
const courseId = computed(() => isNew.value ? null : Number(route.params.id));

const courseData = ref({
  title: '',
  description: '',
  category: categoryStore.categories[0]?.name || 'Development',
  type: 'document',
  price: 0,
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80',
  thumbnailUrl: '',
  status: 'draft',
  published: false,
  lessons: []
});

const onTypeChange = () => {
  if (courseData.value.type === 'document') {
    courseData.value.price = 0;
  }
};

onMounted(() => {
  if (!isNew.value) {
    const existing = courseStore.courses.find(c => c.id === courseId.value);
    if (existing) {
      courseData.value = JSON.parse(JSON.stringify(existing)); // Deep copy to edit
    } else {
      router.push('/admin/courses');
    }
  }
});

const saveCourse = async () => {
  try {
    if (isNew.value) {
      const created = await courseStore.addCourse(courseData.value);
      router.push(`/admin/courses/${created.id}/edit`);
    } else {
      await courseStore.updateCourse(courseId.value, courseData.value);
      alert('Course saved successfully!');
    }
  } catch (requestError) {
    alert(requestError.response?.data?.message || requestError.response?.data?.massage || 'Unable to save course.');
  }
};

// Lesson Management logic embedded for simplicity in frontend
const showLessonModal = ref(false);
const editingLessonIndex = ref(-1);
const lessonForm = ref({ title: '', type: 'video', content: '' });

const isDocumentCourse = computed(() => courseData.value.type === 'document');

const openLessonModal = (index = -1) => {
  editingLessonIndex.value = index;
  if (index >= 0) {
    // Editing existing lesson
    const l = courseData.value.lessons[index];
    lessonForm.value = { ...l, content: l.type === 'quiz' ? JSON.stringify(l.content, null, 2) : l.content };
  } else {
    // New lesson — default type based on course format
    lessonForm.value = { title: '', type: isDocumentCourse.value ? 'text' : 'video', content: '' };
  }
  showLessonModal.value = true;
};

const saveLesson = () => {
  // For document courses, always force lesson type to 'text'
  const resolvedType = isDocumentCourse.value ? 'text' : lessonForm.value.type;
  let content = lessonForm.value.content;
  if (resolvedType === 'quiz') {
    try {
      content = JSON.parse(content);
    } catch(e) {
      alert("Invalid JSON format for Quiz content.");
      return;
    }
  }

  const lessonToSave = { ...lessonForm.value, type: resolvedType, content };
  
  if (editingLessonIndex.value >= 0) {
    courseData.value.lessons[editingLessonIndex.value] = { ...courseData.value.lessons[editingLessonIndex.value], ...lessonToSave };
  } else {
    courseData.value.lessons.push({ ...lessonToSave, id: Date.now() });
  }
  
  showLessonModal.value = false;
  // Automatically save course when modifying lessons
  if (!isNew.value) saveCourse();
};

const deleteLesson = (index) => {
  if(confirm('Delete this lesson?')) {
    courseData.value.lessons.splice(index, 1);
    if (!isNew.value) saveCourse();
  }
};
</script>

<template>
  <div class="p-8 pb-24">
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ isNew ? 'Create New Course' : 'Edit Course' }}</h1>
        <p class="text-gray-500 mt-2">Manage course details and curriculum.</p>
      </div>
      <div class="space-x-4">
        <router-link to="/admin/courses" class="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</router-link>
        <button @click="saveCourse" class="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md">
          Save Course
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Course Details -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 class="text-xl font-bold border-b pb-4">Basic Information</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input v-model="courseData.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="courseData.description" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="courseData.category" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary">
                <option v-for="category in categoryStore.categories" :key="category.id" :value="category.name">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Course Format / Type</label>
              <select v-model="courseData.type" @change="onTypeChange" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary">
                <option value="document">Document (100% Free)</option>
                <option value="video">Video Course (Paid / Admin Access)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
                <span v-if="courseData.type === 'document'" class="text-xs text-emerald-600 font-bold ml-1">(Free)</span>
              </label>
              <input 
                v-model="courseData.price" 
                type="number" 
                :disabled="courseData.type === 'document'"
                :class="[
                  'w-full px-4 py-2 border rounded-lg outline-none transition',
                  courseData.type === 'document' 
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'border-gray-300 focus:border-primary'
                ]" 
                placeholder="0"
              />
            </div>
          </div>
          <p v-if="courseData.type === 'document'" class="text-xs text-emerald-600">
            * All document courses are free for all students.
          </p>
          <p v-else class="text-xs text-primary">
            * For video courses, students contact the admin on Telegram to purchase and unlock access.
          </p>
          
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
          <input v-model="courseData.thumbnailUrl" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" />
        </div>
        </div>

        <!-- Curriculum / Lessons -->
        <div v-if="!isNew" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-center border-b pb-4 mb-4">
            <h2 class="text-xl font-bold">Curriculum</h2>
            <button @click="openLessonModal(-1)" class="text-sm font-bold text-primary hover:underline">+ Add Lesson</button>
          </div>
          
          <div class="space-y-3">
            <div v-for="(lesson, idx) in courseData.lessons" :key="lesson.id" class="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div>
                <span class="font-bold text-gray-800 mr-2">{{ idx + 1 }}.</span>
                <span class="font-medium text-gray-800">{{ lesson.title }}</span>
                <span class="ml-2 text-xs uppercase bg-gray-200 text-gray-600 px-2 py-0.5 rounded">{{ lesson.type }}</span>
              </div>
              <div class="space-x-3">
                <button @click="openLessonModal(idx)" class="text-sm text-primary hover:underline">Edit</button>
                <button @click="deleteLesson(idx)" class="text-sm text-red-500 hover:underline">Delete</button>
              </div>
            </div>
            <div v-if="courseData.lessons.length === 0" class="text-center py-6 text-gray-500">
              No lessons added yet.
            </div>
          </div>
        </div>
        <div v-else class="bg-amber-50 p-6 rounded-xl border border-amber-200 text-amber-700">
          Save the course first to start adding lessons.
        </div>
      </div>
      
      <!-- Sidebar Settings -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold border-b pb-4 mb-4">Publishing</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="courseData.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary">
              <option value="draft">Draft</option>
              <option value="live">Live (Published)</option>
            </select>
          </div>
          <p class="text-xs text-gray-500 mt-2">Draft courses are hidden from students.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold border-b pb-4 mb-4">Thumbnail Preview</h2>
          <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img :src="courseData.thumbnailUrl || courseData.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <!-- Lesson Modal -->
    <div v-if="showLessonModal" class="fixed inset-0 bg-dark/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6">{{ editingLessonIndex >= 0 ? 'Edit Lesson' : 'Add Lesson' }}</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
            <input v-model="lessonForm.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
            <!-- Document courses: locked to text only -->
            <div v-if="isDocumentCourse" class="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 font-medium">
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Document / Text — Free courses only support text-based lessons
            </div>
            <!-- Video courses: full type selector -->
            <select v-else v-model="lessonForm.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary">
              <option value="video">Video (URL)</option>
              <option value="text">Text (HTML)</option>
              <option value="quiz">Quiz (JSON)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ isDocumentCourse ? 'Document Content (HTML)' : (lessonForm.type === 'video' ? 'Video URL' : (lessonForm.type === 'quiz' ? 'Quiz JSON' : 'HTML Content')) }}
            </label>
            <textarea v-model="lessonForm.content" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary font-mono text-sm" :placeholder="isDocumentCourse ? '<h2>Lesson Title</h2><p>Your document content here...</p>' : 'Enter content here...'"></textarea>
            <p v-if="!isDocumentCourse && lessonForm.type === 'quiz'" class="text-xs text-gray-500 mt-2">
              Example format: <br>
              <code>[{"q": "Question?", "options": ["A", "B"], "answer": "A"}]</code>
            </p>
          </div>
        </div>
        
        <div class="mt-8 flex justify-end gap-3">
          <button @click="showLessonModal = false" class="px-6 py-2 text-gray-600 font-bold rounded-lg hover:bg-gray-100">Cancel</button>
          <button @click="saveLesson" class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-sm">Save Lesson</button>
        </div>
      </div>
    </div>
  </div>
</template>
