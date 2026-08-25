import { reactive } from 'vue';

const storedUsers = localStorage.getItem('users_data');

const defaultUsers = storedUsers
  ? JSON.parse(storedUsers)
  : [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin',
        role: 'admin',
        createdAt: '2026-08-01T08:00:00.000Z',
        lastActivityAt: '2026-08-24T09:00:00.000Z',
      },
      {
        id: 2,
        name: 'Student User',
        email: 'student@example.com',
        password: 'student',
        role: 'student',
        avatar: '',
        createdAt: '2026-08-10T10:00:00.000Z',
        lastActivityAt: '2026-08-24T08:30:00.000Z',
      },
      {
        id: 3,
        name: 'Ava Martin',
        email: 'ava.martin@example.com',
        password: 'student',
        role: 'student',
        avatar: '',
        createdAt: '2026-08-14T12:30:00.000Z',
        lastActivityAt: '2026-08-23T17:45:00.000Z',
      },
    ];

export const usersStore = reactive({
  users: defaultUsers,

  save() {
    localStorage.setItem('users_data', JSON.stringify(this.users));
  },

  findByEmail(email) {
    return this.users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
  },

  findByCredentials(email, password) {
    return this.users.find(
      (user) => user.email.toLowerCase() === String(email).toLowerCase() && user.password === password,
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
