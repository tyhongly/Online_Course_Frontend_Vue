import { reactive } from 'vue';

const storedEnrollments = localStorage.getItem('enrollment_data');
const defaultEnrollments = storedEnrollments ? JSON.parse(storedEnrollments) : [];
// enrollment schema: { userId, courseId, progress: { lessonId: boolean }, quizScores: { lessonId: score } }

export const enrollmentStore = reactive({
  enrollments: defaultEnrollments,

  save() {
    localStorage.setItem('enrollment_data', JSON.stringify(this.enrollments));
  },

  enroll(userId, courseId) {
    if (!this.getEnrollment(userId, courseId)) {
      this.enrollments.push({
        userId,
        courseId,
        progress: {},
        quizScores: {}
      });
      this.save();
    }
  },
  
  unenroll(userId, courseId) {
    this.enrollments = this.enrollments.filter(e => !(e.userId === userId && e.courseId === courseId));
    this.save();
  },

  getEnrollment(userId, courseId) {
    return this.enrollments.find(e => e.userId === userId && e.courseId === courseId);
  },

  getUserEnrollments(userId) {
    return this.enrollments.filter(e => e.userId === userId);
  },

  markLessonComplete(userId, courseId, lessonId) {
    const en = this.getEnrollment(userId, courseId);
    if (en) {
      en.progress[lessonId] = true;
      this.save();
    }
  },

  saveQuizScore(userId, courseId, lessonId, score) {
    const en = this.getEnrollment(userId, courseId);
    if (en) {
      en.quizScores[lessonId] = score;
      // marking the quiz lesson as complete
      en.progress[lessonId] = true; 
      this.save();
    }
  },
  
  getCourseProgress(userId, courseId, totalLessons) {
    const en = this.getEnrollment(userId, courseId);
    if (!en || totalLessons === 0) return 0;
    const completedCount = Object.values(en.progress).filter(v => v).length;
    return Math.round((completedCount / totalLessons) * 100);
  }
});
