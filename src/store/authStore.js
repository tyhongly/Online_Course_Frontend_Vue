import { reactive } from 'vue';
import { createAccount, loginAccount } from '../services/authApi.js';

// Read from localStorage if available
const storedUser = localStorage.getItem('auth_user');
const storedToken = localStorage.getItem('access_token');

export const authStore = reactive({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,

  async signup(account) {
    const response = await createAccount(account);
    const payload = response?.data?.data || response?.data || response;
    const responseUser = payload?.user || payload;
    const token = payload?.accessToken || payload?.access_token || payload?.token;
    this.user = {
      id: responseUser?.id || Date.now(),
      name: responseUser?.name || account.name,
      email: responseUser?.email || account.email,
      role: (responseUser?.role || payload?.role || 'student').toLowerCase(),
      avatar: responseUser?.avatar || ''
    };
    if (token) {
      this.token = token;
      localStorage.setItem('access_token', token);
    }
    localStorage.setItem('auth_user', JSON.stringify(this.user));
    return this.user;
  },
  
  async login(email, password) {
    const response = await loginAccount({ email, password });
    const responseData = response?.data || response;
    const payload = responseData?.data || responseData;
    const responseUser = payload?.authResponse || payload?.user || payload?.account || payload;
    const token = payload?.accessToken
      || payload?.access_token
      || payload?.token
      || responseData?.accessToken
      || responseData?.access_token
      || responseData?.token
      || responseUser?.accessToken
      || responseUser?.access_token
      || responseUser?.token;
    const role = (responseUser?.role || payload?.role || responseData?.role || 'student').toLowerCase();

    if (!token) {
      throw new Error('Login response is missing an access token');
    }

    this.token = token;
    this.user = {
      id: responseUser?.id,
      name: responseUser?.name || responseUser?.username || email,
      email: responseUser?.email || email,
      role,
      avatar: responseUser?.avatar || ''
    };
    localStorage.setItem('access_token', token);
    localStorage.setItem('auth_user', JSON.stringify(this.user));
    return this.user;
  },
  
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
  },
  
  updateProfile(data) {
    if (this.user) {
      this.user = { ...this.user, ...data };
      localStorage.setItem('auth_user', JSON.stringify(this.user));
    }
  }
});
