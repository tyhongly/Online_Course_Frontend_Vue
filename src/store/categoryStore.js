import { reactive } from 'vue';
import { courses as seedCourses } from '../data/index.js';

const storedCategories = localStorage.getItem('category_data');

const defaultCategories = storedCategories
  ? JSON.parse(storedCategories)
  : Array.from(new Set(seedCourses.map((course) => course.category)))
      .filter(Boolean)
      .map((name, index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
      }));

export const categoryStore = reactive({
  categories: defaultCategories,

  save() {
    localStorage.setItem('category_data', JSON.stringify(this.categories));
  },

  addCategory({ name, slug }) {
    const category = {
      id: Date.now(),
      name,
      slug: slug || name.toLowerCase().trim().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
    };

    this.categories.push(category);
    this.save();
    return category;
  },

  updateCategory(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;

    this.categories[index] = {
      ...this.categories[index],
      ...data,
    };
    this.save();
    return this.categories[index];
  },

  deleteCategory(id) {
    this.categories = this.categories.filter((category) => category.id !== id);
    this.save();
  },

  getCategoryName(categoryIdOrName) {
    const match = this.categories.find((category) => category.id === categoryIdOrName);
    if (match) return match.name;
    return String(categoryIdOrName || 'Uncategorized');
  },
});
