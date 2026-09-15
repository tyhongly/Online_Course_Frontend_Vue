import { reactive } from 'vue';
import { getAllUsers, deleteUser, getUserById } from '../services/userApi.js';

export const usersStore = reactive({
  users: [],

  save() {
    localStorage.setItem('users_data', JSON.stringify(this.users));
  },

  async fetchUsers() {
    const response = await getAllUsers();
    const payload = response?.data?.data || response?.data || [];
    const userList = Array.isArray(payload) ? payload : payload.users || [];

    this.users = userList.map((user) => ({
      ...user,
      id: user.id ?? user.userId,
      name: user.name ?? user.fullName ?? user.username,
      email: user.email,
      role: user.role ?? 'student',
      createdAt: user.createdAt ?? user.created_at,
      lastActivityAt: user.lastActivityAt ?? user.lastActivity,
      status: user.status ?? (user.lastActivityAt ? 'Active' : 'Suspended'),
    }));

    this.save();
    return this.users;
  },

  async fetchUserById(id) {
    const response = await getUserById(id);
    const payload = response?.data?.data || response?.data || {};
    return payload?.user || payload;
  },

  async deleteUser(id) {
    await deleteUser(id);
    this.users = this.users.filter((user) => String(user.id) !== String(id));
    this.save();
  },

  findByEmail(email) {
    return this.users.find((user) => String(user.email || '').toLowerCase() === String(email).toLowerCase());
  },

  findByCredentials(email, password) {
    return this.users.find(
      (user) => String(user.email || '').toLowerCase() === String(email).toLowerCase() && user.password === password,
    );
  },

  addStudent({ name, email, password }) {
    if (this.findByEmail(email)) {
      return null;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'student',
      avatar: '',
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      status: 'Active',
    };

    this.users.push(user);
    this.save();
    return user;
  },

  updateUser(id, data) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...data,
    };
    this.save();
    return this.users[index];
  },

  touchUser(id) {
    return this.updateUser(id, { lastActivityAt: new Date().toISOString() });
  },

  getStudents() {
    return this.users.filter((user) => user.role === 'student');
  },
});
