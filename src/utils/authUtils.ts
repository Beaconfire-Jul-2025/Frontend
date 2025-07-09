import type { User } from "../api/auth";

export const setAuthToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getUserRole = (): string | null => {
  const user = getUser();
  return user?.role || null;
};

export const logout = (): void => {
  removeAuthToken();
  window.location.href = "/login";
};
