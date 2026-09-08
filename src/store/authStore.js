import { reactive } from 'vue';
import { createAccount, loginAccount, verifyOtp, requestPasswordReset, resetPassword } from '../services/authApi.js';

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
  const name = user?.name || user?.username || fallbackEmail || 'User';

  return {
    id: user?.id ?? null,
    name,
    username: user?.username || name,
    email: user?.email || fallbackEmail,
    role: String(user?.role || payload?.role || 'student').toLowerCase(),
    avatar: user?.avatar || ''
  };
};

const storedToken = safeRead('access_token');
const storedUser = storedToken ? safeReadJson('auth_user') : null;

const responsePayload = (response) => response?.data?.data || response?.data || response;

const setSession = (payload, fallbackEmail = '') => {
  const token = extractToken(payload);
  const user = extractUser(payload, fallbackEmail);

  if (!token) {
    throw new Error('Authentication response is missing an access token');
  }

  authStore.token = token;
  authStore.user = user;
  persistAuth(user, token);
  return user;
};

export const authStore = reactive({
  user: storedUser,
  token: storedToken,

  async signup(account) {
    const response = await createAccount(account);
    const payload = responsePayload(response);
    const email = account.email;

    // Some APIs return a token on registration, while others require a
    // normal login immediately after creating the account.
    if (extractToken(payload)) {
      return setSession(payload, email);
    }

    return this.login(email, account.password);
  },
  
  // State for OTP flows
  requiresOtp: false,
  _pendingLogin: null,

  // Login flow with optional OTP
  async login(email, password) {
    const response = await loginAccount({ email, password });
    const payload = responsePayload(response);
    if (payload && payload.needOtp) {
      // Backend indicates OTP is required
      this.requiresOtp = true;
      this._pendingLogin = { email, password };
      return null; // UI will handle OTP step
    }
    // No OTP required, establish session directly
    return setSession(payload, email);
  },

  // Verify OTP for login
  async verifyLoginOtp(otp) {
    if (!this._pendingLogin) throw new Error('No pending login for OTP');
    const { email, password } = this._pendingLogin;
    const response = await verifyOtp({ email, password, otp });
    this._pendingLogin = null;
    this.requiresOtp = false;
    const payload = responsePayload(response);
    return setSession(payload, email);
  },

  // Forgot password state
  resetPhase: 'email', // 'email' | 'otp' | 'newPassword'
  _resetEmail: null,
  _resetToken: null,

  // Initiate forgot password (send OTP)
  async requestPasswordReset(email) {
    const response = await requestPasswordReset(email);
    this._resetEmail = email;
    this.resetPhase = 'otp';
    return response;
  },

  // Verify OTP for password reset
  async verifyResetOtp(otp) {
    if (!this._resetEmail) throw new Error('No password reset request pending');
    const response = await verifyOtp({ email: this._resetEmail, otp, purpose: 'reset' });
    // Expect backend to return a temporary token for resetting password
    const payload = responsePayload(response);
    this._resetToken = payload?.resetToken || null;
    this.resetPhase = 'newPassword';
    return payload;
  },

  // Set new password after OTP verification
  async resetPassword(newPassword) {
    if (!this._resetToken) throw new Error('Reset token missing');
    await resetPassword({ token: this._resetToken, password: newPassword });
    // Reset flow finished, revert to login mode
    this.resetPhase = 'email';
    this._resetEmail = null;
    this._resetToken = null;
    return true;
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
