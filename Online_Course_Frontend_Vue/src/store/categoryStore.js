import { reactive } from 'vue';
import { courses as seedCourses } from '../data/index.js';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../services/categoryApi.js';

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

  async fetchCategories() {
    const response = await getAllCategories();
    const payload = response?.data?.data || response?.data || [];
    const categories = Array.isArray(payload) ? payload : payload.categories || [];
    this.categories = categories.map((category) => ({
      ...category,
      id: category.categoryId || category.id,
      name: category.categoryName || category.name,
      slug: category.slug || (category.categoryName || category.name || '').toLowerCase().trim().replace(/\s+/g, '-'),
    }));
    this.save();
    return this.categories;
  },

  save() {
    localStorage.setItem('category_data', JSON.stringify(this.categories));
  },

  async addCategory({ name, slug }) {
    const response = await createCategory({ categoryName: name });
    const payload = response?.data?.data || response?.data || response;
    const category = {
      id: payload?.categoryId || payload?.id || Date.now(),
      name: payload?.categoryName || payload?.name || name,
      slug: payload?.slug || slug || name.toLowerCase().trim().replace(/\s+/g, '-'),
      createdAt: payload?.createdAt || new Date().toISOString(),
    };

    this.categories.push(category);
    this.save();
    return category;
  },

  async updateCategory(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;

    const response = await updateCategory(id, { categoryName: data.name });
    const payload = response?.data?.data || response?.data || response;
    const updatedCategory = payload?.category || payload;
    this.categories[index] = {
      ...this.categories[index],
      ...data,
      ...updatedCategory,
      id: updatedCategory?.categoryId || updatedCategory?.id || id,
      name: updatedCategory?.categoryName || updatedCategory?.name || data.name,
    };
    this.save();
    return this.categories[index];
  },

  async deleteCategory(id) {
    await deleteCategory(id);
    this.categories = this.categories.filter((category) => category.id !== id);
    this.save();
  },

  getCategoryName(categoryIdOrName) {
    const match = this.categories.find((category) => category.id === categoryIdOrName);
    if (match) return match.name;
    return String(categoryIdOrName || 'Uncategorized');
  },
});
