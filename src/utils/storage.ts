import {
  ACCESS_TOKEN_KEY,
  AUTH_USER_KEY,
  PENDING_VERIFY_EMAIL_KEY,
  REFRESH_TOKEN_KEY,
} from "./constants";
import type { User } from "../features/auth/types/auth.type";

export const storage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getUser(): User | null {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  setUser(user: User) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(AUTH_USER_KEY);
  },

  clearAuth() {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUser();
  },

  setPendingVerifyEmail(email: string) {
    localStorage.setItem(PENDING_VERIFY_EMAIL_KEY, email);
  },

  getPendingVerifyEmail(): string | null {
    return localStorage.getItem(PENDING_VERIFY_EMAIL_KEY);
  },

  removePendingVerifyEmail() {
    localStorage.removeItem(PENDING_VERIFY_EMAIL_KEY);
  },
};
