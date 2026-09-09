<script setup>
import { computed } from 'vue';
import { enrollmentStore } from '../../store/enrollmentStore.js';
import { courseStore } from '../../store/courseStore.js';

// Aggregate unique students from enrollments
const students = computed(() => {
  const map = new Map();
  enrollmentStore.enrollments.forEach(en => {
    if (!map.has(en.userId)) {
      map.set(en.userId, { id: en.userId, enrollments: [] });
    }
    map.get(en.userId).enrollments.push(en);
  });
  
  return Array.from(map.values()).map(s => {
    // Add mock user details
    return {
      ...s,
      name: s.id === 2 ? 'Student User' : `User #${s.id}`,
      email: s.id === 2 ? 'student@example.com' : `user${s.id}@example.com`,
      coursesCount: s.enrollments.length
    };
  });
});

const resetPassword = (id) => {
  alert(`Password reset link sent to User ID: ${id}`);
};

const viewProgress = (id) => {
  alert(`Viewing detailed progress for User ID: ${id} is not fully implemented in this demo.`);
};
</script>

<template>
  <div class="p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manage Students</h1>
      <p class="text-gray-500 mt-2">View student progress and manage accounts.</p>
    </header>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
            <th class="p-4 font-medium">Student Name</th>
            <th class="p-4 font-medium">Email</th>
            <th class="p-4 font-medium">Enrolled Courses</th>
            <th class="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-4 font-medium text-gray-800">{{ student.name }}</td>
            <td class="p-4 text-gray-600">{{ student.email }}</td>
            <td class="p-4 text-gray-800">
              <span class="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                {{ student.coursesCount }} courses
              </span>
            </td>
            <td class="p-4 text-right space-x-3">
              <button @click="viewProgress(student.id)" class="text-primary hover:underline text-sm font-medium">Progress</button>
              <button @click="resetPassword(student.id)" class="text-amber-500 hover:underline text-sm font-medium">Reset Password</button>
            </td>
          </tr>
          <tr v-if="students.length === 0">
            <td colspan="4" class="p-8 text-center text-gray-500">No students found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
