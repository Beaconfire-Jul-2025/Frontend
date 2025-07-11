import { useMemo } from "react";
import {
  getUser,
  getAuthToken,
  isAuthenticated as checkAuth,
  logout,
  setAuthToken,
  setUser,
} from "@/utils/authUtils";
import type { AuthContextType, LoginRequest } from "@/types/auth";
import { login as loginAPI } from "@/api/auth";

export const useAuth = (): AuthContextType => {
  const user = getUser();
  const token = getAuthToken();
  const isAuthenticated = checkAuth();

  const login = async (credentials: LoginRequest) => {
    const { token, user } = await loginAPI(credentials);
    setAuthToken(token);
    setUser(user);
  };

  return useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      logout,
    }),
    [user, token, isAuthenticated],
  );
};
