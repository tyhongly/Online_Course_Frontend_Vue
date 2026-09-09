<script setup>
import { computed } from 'vue';
import { courseStore } from '../../store/courseStore.js';
import { enrollmentStore } from '../../store/enrollmentStore.js';

const courseStats = computed(() => {
  return courseStore.courses.map(course => {
    // Get all enrollments for this course
    const enrollments = enrollmentStore.enrollments.filter(e => e.courseId === course.id);
    const totalEnrolled = enrollments.length;
    
    // Calculate completion rate
    let totalCompleted = 0;
    let totalQuizScores = 0;
    let quizTakers = 0;
    
    enrollments.forEach(en => {
      const progress = enrollmentStore.getCourseProgress(en.userId, course.id, course.lessons?.length || 0);
      if (progress === 100) totalCompleted++;
      
      // Average quiz scores for this user in this course
      const scores = Object.values(en.quizScores || {});
      if (scores.length > 0) {
        const avgUserScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        totalQuizScores += avgUserScore;
        quizTakers++;
      }
    });
    
    const completionRate = totalEnrolled > 0 ? Math.round((totalCompleted / totalEnrolled) * 100) : 0;
    const avgQuizScore = quizTakers > 0 ? Math.round(totalQuizScores / quizTakers) : 0;
    
    return {
      id: course.id,
      title: course.title,
      category: course.category,
      totalEnrolled,
      completionRate,
      avgQuizScore
    };
  });
});

</script>

<template>
  <div class="p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Course Analytics</h1>
      <p class="text-gray-500 mt-2">Track performance metrics across all your courses.</p>
    </header>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
            <th class="p-4 font-medium">Course Title</th>
            <th class="p-4 font-medium text-center">Enrollments</th>
            <th class="p-4 font-medium text-center">Completion Rate</th>
            <th class="p-4 font-medium text-center">Avg. Quiz Score</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="stat in courseStats" :key="stat.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4">
              <div class="font-bold text-gray-800 line-clamp-1">{{ stat.title }}</div>
              <div class="text-xs text-gray-500">{{ stat.category }}</div>
            </td>
            <td class="p-4 text-center font-bold text-gray-800">{{ stat.totalEnrolled }}</td>
            <td class="p-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <div class="w-16 bg-gray-200 rounded-full h-1.5">
                  <div class="bg-primary h-1.5 rounded-full" :style="{ width: stat.completionRate + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-700">{{ stat.completionRate }}%</span>
              </div>
            </td>
            <td class="p-4 text-center">
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', stat.avgQuizScore >= 80 ? 'bg-green-100 text-green-700' : (stat.avgQuizScore > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500')]">
                {{ stat.avgQuizScore > 0 ? stat.avgQuizScore + '%' : 'N/A' }}
              </span>
            </td>
          </tr>
          <tr v-if="courseStats.length === 0">
            <td colspan="4" class="p-8 text-center text-gray-500">No course data available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
