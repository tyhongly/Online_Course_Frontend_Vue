import { reactive } from 'vue';
import { usersStore } from './usersStore.js';

// Read from localStorage if available
const storedUser = localStorage.getItem('auth_user');

export const authStore = reactive({
  user: storedUser ? JSON.parse(storedUser) : null,
  
  login(email, password) {
    const user = usersStore.findByCredentials(email, password);

    if (!user) {
      return false;
    }

    this.user = { ...user };
    usersStore.touchUser(user.id);
    localStorage.setItem('auth_user', JSON.stringify(this.user));
    return true;
  },

  signup({ name, email, password }) {
    const user = usersStore.addStudent({ name, email, password });
    if (!user) {
      return false;
    }

    this.user = { ...user };
    localStorage.setItem('auth_user', JSON.stringify(this.user));
    return true;
  },
  
  logout() {
    this.user = null;
    localStorage.removeItem('auth_user');
  },
  
  updateProfile(data) {
    if (this.user) {
      this.user = { ...this.user, ...data };
      usersStore.updateUser(this.user.id, data);
      localStorage.setItem('auth_user', JSON.stringify(this.user));
    }
  }
});
