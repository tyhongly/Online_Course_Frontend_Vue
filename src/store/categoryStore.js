import { reactive } from 'vue';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
} from '../services/categoryApi.js';
const storedCategories = localStorage.getItem('category_data');

const defaultCategories = storedCategories ? JSON.parse(storedCategories) : [];

const categoryFilesBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  return apiUrl.replace(/\/$/, '') + '/v1/files/categories';
};

const normalizeCategory = (category = {}) => {
  const categoryImage = category.categoryImage || category.image || '';
  const image = /^https?:\/\//.test(categoryImage) || /^(data:|blob:|\/)/.test(categoryImage)
    ? categoryImage
    : categoryImage
      ? `${categoryFilesBaseUrl()}/${categoryImage}`
      : '';

  return {
    ...category,
    id: category.categoryId || category.id,
    name: category.categoryName || category.name,
    image,
    categoryImage: image,
    slug: category.slug || (category.categoryName || category.name || '').toLowerCase().trim().replace(/\s+/g, '-'),
  };
};

export const categoryStore = reactive({
  categories: defaultCategories,

  async fetchCategories() {
    const response = await getAllCategories();
    const payload = response?.data?.data || response?.data || [];
    const categories = Array.isArray(payload) ? payload : payload.categories || [];
    this.categories = categories.map(normalizeCategory);
    this.save();
    return this.categories;
  },

  async fetchCategoryById(id) {
    const response = await getCategoryById(id);
    const payload = response?.data?.data || response?.data || {};
    return payload?.category || payload;
  },

  save() {
    localStorage.setItem('category_data', JSON.stringify(this.categories));
  },

  async addCategory({ name, slug, image }) {
    const formData = new FormData();
    formData.append('categoryName', name);
    if (image) formData.append('categoryImage', image);

    const response = await createCategory(formData);
    const payload = response?.data?.data || response?.data || response;
    const category = normalizeCategory({
      id: payload?.categoryId || payload?.id || Date.now(),
      name: payload?.categoryName || payload?.name || name,
      slug: payload?.slug || slug || name.toLowerCase().trim().replace(/\s+/g, '-'),
      image: payload?.categoryImage || payload?.image || '',
      createdAt: payload?.createdAt || new Date().toISOString(),
    });

    this.categories.push(category);
    this.save();
    return category;
  },

  async updateCategory(id, data) {
    const index = this.categories.findIndex((category) => String(category.id) === String(id));
    if (index === -1) return null;

    const response = await updateCategory(id, { categoryName: data.name });
    const payload = response?.data?.data || response?.data || response;
    const updatedCategory = payload?.category || payload;
    this.categories[index] = normalizeCategory({
      ...this.categories[index],
      ...data,
      ...updatedCategory,
      id: updatedCategory?.categoryId || updatedCategory?.id || id,
      name: updatedCategory?.categoryName || updatedCategory?.name || data.name,
    });
    this.save();
    return this.categories[index];
  },

  async deleteCategory(id) {
    await deleteCategory(id);
    this.categories = this.categories.filter((category) => String(category.id) !== String(id));
    this.save();
  },

  getCategoryName(categoryIdOrName) {
    const match = this.categories.find((category) => category.id === categoryIdOrName);
    if (match) return match.name;
    return String(categoryIdOrName || 'Uncategorized');
  },
});
