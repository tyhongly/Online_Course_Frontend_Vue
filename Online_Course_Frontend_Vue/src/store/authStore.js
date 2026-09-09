import { reactive } from 'vue';
import { createAccount, loginAccount } from '../services/authApi.js';

const safeRead = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? value : null;
  } catch {
    return null;
  }
};

const safeReadJson = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;

    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const persistAuth = (user, token) => {
  try {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }

    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  } catch {
    // Ignore storage issues in restricted browsers
  }
};

const extractToken = (payload) => {
  const token = payload?.token
    || payload?.accessToken
    || payload?.access_token
    || payload?.authResponse?.token
    || payload?.authResponse?.accessToken
    || payload?.authResponse?.access_token
    || payload?.data?.token
    || payload?.data?.accessToken
    || payload?.data?.access_token;

  return typeof token === 'string' && token.trim() ? token : null;
};

const extractUser = (payload, fallbackEmail = '') => {
  const user = payload?.user || payload?.account || payload?.authResponse || payload?.data || payload || {};

  return {
    id: user?.id ?? null,
    name: user?.name || user?.username || fallbackEmail || 'User',
    email: user?.email || fallbackEmail,
    role: String(user?.role || payload?.role || 'student').toLowerCase(),
    avatar: user?.avatar || ''
  };
};

const storedUser = safeReadJson('auth_user');
const storedToken = safeRead('access_token');

export const authStore = reactive({
  user: storedUser,
  token: storedToken,

  async signup(account) {
    const response = await createAccount(account);
    const payload = response?.data?.data || response?.data || response;

    if (!payload || typeof payload !== 'object') {
      return response;
    }

    return payload;
  },
  
  async login(email, password) {
    const response = await loginAccount({ email, password });
    const payload = response?.data?.data || response?.data || response;
    const token = extractToken(payload);
    const user = extractUser(payload, email);

    if (!token) {
      throw new Error('Login response is missing an access token');
    }

    this.token = token;
    this.user = user;

    persistAuth(this.user, this.token);
    return this.user;
  },
  
  logout() {
    this.user = null;
    this.token = null;
    persistAuth(null, null);
  },
  
  updateProfile(data) {
    if (this.user) {
      this.user = { ...this.user, ...data };
      persistAuth(this.user, this.token);
    }
  }
});
