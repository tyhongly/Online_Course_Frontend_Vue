import { computed } from 'vue';
import { authStore } from '../store/authStore.js';
import { courseStore } from '../store/courseStore.js';
import { enrollmentStore } from '../store/enrollmentStore.js';

/**
 * Dashboard data is resolved locally from the mock stores in this Vue app.
 * The helpers below mirror the "server-side fetch + transform" flow you would
 * typically put behind an API endpoint in a full backend.
 */
const toSortedLessons = (course) => {
  return [...(course?.lessons || [])]
    .filter((lesson) => lesson?.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

const getCourseSummary = (course) => {
  if (!course) return 'Continue building your skills with this course.';

  const raw = course.description || course.summary;
  if (raw) return raw;

  return `Keep making progress in ${course.title}.`;
};

const getNextLesson = (course, enrollment) => {
  const lessons = toSortedLessons(course);

  if (!lessons.length) {
    return null;
  }

  const nextLesson = lessons.find((lesson) => !enrollment?.progress?.[lesson.id]);
  return nextLesson || lessons[lessons.length - 1];
};

export const useStudentDashboard = () => {
  const currentUser = computed(() => authStore.user);

  const enrollments = computed(() => {
    if (!currentUser.value) return [];
    return enrollmentStore.getUserEnrollments(currentUser.value.id);
  });

  const courses = computed(() => {
    return enrollments.value
      .map((enrollment) => {
        const course = courseStore.courses.find((item) => item.id === enrollment.courseId);
        if (!course || course.published === false) return null;

        const lessons = toSortedLessons(course);
        const totalLessons = lessons.length;
        const completedLessons = lessons.filter((lesson) => enrollment.progress?.[lesson.id]).length;
        const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
        const nextLesson = getNextLesson(course, enrollment);

        return {
          ...course,
          description: getCourseSummary(course),
          thumbnailUrl: course.thumbnailUrl || course.image || '',
          lessons,
          totalLessons,
          completedLessons,
          progress,
          nextLesson,
          continuePath: nextLesson ? `/learn/${course.id}/lesson/${nextLesson.id}` : `/course/${course.id}`,
          isCompleted: totalLessons > 0 && completedLessons === totalLessons,
        };
      })
      .filter(Boolean);
  });

  const stats = computed(() => {
    const completedCourses = courses.value.filter((course) => course.isCompleted).length;
    const lessonsCompleted = courses.value.reduce((total, course) => total + course.completedLessons, 0);

    return {
      enrolledCourses: courses.value.length,
      completedCourses,
      lessonsCompleted,
    };
  });

  return {
    currentUser,
    courses,
    enrollments,
    stats,
    hasEnrollments: computed(() => courses.value.length > 0),
  };
};
