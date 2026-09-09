import { computed } from 'vue';
import { authStore } from '../store/authStore.js';
import { usersStore } from '../store/usersStore.js';
import { courseStore } from '../store/courseStore.js';
import { enrollmentStore } from '../store/enrollmentStore.js';
import { categoryStore } from '../store/categoryStore.js';

const toSortedLessons = (course) => {
  return [...(course?.lessons || [])]
    .filter((lesson) => lesson?.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

const toLabel = (dateValue) => {
  if (!dateValue) return 'N/A';
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateValue));
};

export const useAdminDashboard = () => {
  const currentUser = computed(() => authStore.user);

  const studentUsers = computed(() =>
    usersStore.users.filter((user) => user.role === 'student'),
  );

  const metrics = computed(() => {
    const totalStudents = studentUsers.value.length;
    const totalCourses = courseStore.courses.length;
    const totalLessons = courseStore.courses.reduce(
      (sum, course) => sum + toSortedLessons(course).length,
      0,
    );
    const totalEnrollments = enrollmentStore.enrollments.length;

    return {
      totalStudents,
      totalCourses,
      totalLessons,
      totalEnrollments,
    };
  });

  const courseIndex = computed(() =>
    new Map(courseStore.courses.map((course) => [course.id, course])),
  );

  const categoryIndex = computed(() =>
    new Map(categoryStore.categories.map((category) => [category.id, category])),
  );

  const recentStudents = computed(() => {
    return [...studentUsers.value]
      .sort((a, b) => new Date(b.lastActivityAt || b.createdAt || 0) - new Date(a.lastActivityAt || a.createdAt || 0))
      .slice(0, 10)
      .map((student) => {
        const studentEnrollments = enrollmentStore.enrollments.filter((enrollment) => enrollment.userId === student.id);
        const enrolledCourseCount = new Set(studentEnrollments.map((enrollment) => enrollment.courseId)).size;

        return {
          ...student,
          enrolledCourseCount,
          lastActivityLabel: toLabel(student.lastActivityAt || student.createdAt),
        };
      });
  });

  const recentCourses = computed(() => {
    return [...courseStore.courses]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 10)
      .map((course) => {
        const courseEnrollments = enrollmentStore.enrollments.filter((enrollment) => enrollment.courseId === course.id);
        const lessonCount = toSortedLessons(course).length;
        const categoryName = categoryIndex.value.get(course.categoryId)?.name || course.category || 'Uncategorized';

        return {
          id: course.id,
          title: course.title,
          categoryName,
          lessonCount,
          enrollmentCount: courseEnrollments.length,
          published: course.published !== false,
          createdAtLabel: toLabel(course.createdAt),
        };
      });
  });

  const recentEnrollments = computed(() => {
    return [...enrollmentStore.enrollments]
      .sort((a, b) => new Date(b.enrolledAt || 0) - new Date(a.enrolledAt || 0))
      .slice(0, 10)
      .map((enrollment) => {
        const student = usersStore.users.find((user) => user.id === enrollment.userId);
        const course = courseIndex.value.get(enrollment.courseId);

        return {
          id: enrollment.id || `${enrollment.userId}-${enrollment.courseId}-${enrollment.enrolledAt}`,
          studentName: student?.name || 'Unknown student',
          studentEmail: student?.email || 'n/a',
          courseTitle: course?.title || 'Unknown course',
          enrolledAtLabel: toLabel(enrollment.enrolledAt),
        };
      });
  });

  const quickActions = computed(() => [
    { label: 'Create Course', to: '/admin/courses/new' },
    { label: 'Create Lesson', to: '/admin/lessons/new' },
    { label: 'Manage Categories', to: '/admin/categories' },
    { label: 'Manage Students', to: '/admin/students' },
  ]);

  return {
    currentUser,
    metrics,
    recentStudents,
    recentCourses,
    recentEnrollments,
    quickActions,
  };
};
