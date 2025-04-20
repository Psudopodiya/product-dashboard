import { loginApi, registerApi } from "@/api/authApi";
import { AuthState, User } from "@/types/authTypes";
import {
  getErrorMessageFromResponse,
  getStoredToken,
  getStoredUser,
} from "@/utils/authUtils";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  accessToken: getStoredToken("access_token"),
  refreshToken: getStoredToken("refresh_token"),
  isAuthenticated: !!getStoredToken("access_token"),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await loginApi(email, password);

      const userData: User = {
        username: data.username,
        email: data.email,
        role: data.role,
        custom_role: data.custom_role,
      };

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      set({
        user: userData,
        accessToken: data.access,
        refreshToken: data.refresh,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessageFromResponse(error),
      };
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username, email, password, role) => {
    set({ isLoading: true });
    try {
      await registerApi(username, email, password, role);
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessageFromResponse(error),
      };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
