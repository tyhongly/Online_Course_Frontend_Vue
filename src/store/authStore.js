import { reactive } from 'vue';

// Read from localStorage if available
const storedUser = localStorage.getItem('auth_user');

export const authStore = reactive({
  user: storedUser ? JSON.parse(storedUser) : null,
  
  login(email, password) {
    // Mock login logic
    if (email === 'admin@example.com' && password === 'admin') {
      this.user = { id: 1, name: 'Admin User', email, role: 'admin' };
    } else {
      this.user = { id: 2, name: 'Student User', email, role: 'student', avatar: '' };
    }
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
      localStorage.setItem('auth_user', JSON.stringify(this.user));
    }
  }
});
