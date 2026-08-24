import { computed, reactive } from 'vue';

const storedCart = localStorage.getItem('cart_items');

export const cartStore = reactive({
  items: storedCart ? JSON.parse(storedCart) : [],

  save() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  },

  add(course) {
    if (this.items.some(item => item.id === course.id)) return false;
    this.items.push(course);
    this.save();
    return true;
  },

  remove(courseId) {
    this.items = this.items.filter(item => item.id !== courseId);
    this.save();
  }
});

export const cartCount = computed(() => cartStore.items.length);
export const cartTotal = computed(() => cartStore.items.reduce((total, item) => total + item.price, 0));