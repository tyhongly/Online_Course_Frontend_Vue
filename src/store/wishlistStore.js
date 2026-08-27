import { computed, reactive } from 'vue';
import { authStore } from './authStore.js';

const storedWishlists = localStorage.getItem('student_wishlists');

const parseWishlists = () => {
  try {
    const parsed = storedWishlists ? JSON.parse(storedWishlists) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const getUserKey = () => String(authStore.user?.id || authStore.user?.email || 'guest');

export const wishlistStore = reactive({
  wishlists: parseWishlists(),

  get courseIds() {
    return this.wishlists[getUserKey()] || [];
  },

  isWishlisted(courseId) {
    return this.courseIds.some((id) => String(id) === String(courseId));
  },

  toggle(courseId) {
    const userKey = getUserKey();
    const ids = [...this.courseIds];
    const index = ids.findIndex((id) => String(id) === String(courseId));

    if (index === -1) ids.push(courseId);
    else ids.splice(index, 1);

    this.wishlists[userKey] = ids;
    localStorage.setItem('student_wishlists', JSON.stringify(this.wishlists));
  },

  remove(courseId) {
    const userKey = getUserKey();
    this.wishlists[userKey] = this.courseIds.filter((id) => String(id) !== String(courseId));
    localStorage.setItem('student_wishlists', JSON.stringify(this.wishlists));
  }
});

export const wishlistCount = computed(() => wishlistStore.courseIds.length);