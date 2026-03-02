import { create } from "zustand";
import type { BackendUser, ClerkUserData } from "../types/auth.types";

interface AuthState {
  clerkUser: ClerkUserData | null;
  backendUser: BackendUser | null;

  setClerkUser: (user: ClerkUserData) => void;
  setBackendUser: (user: BackendUser) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  clerkUser: null,
  backendUser: null,

  setClerkUser: (user) => set({ clerkUser: user }),
  setBackendUser: (user) => set({ backendUser: user }),

  clearAuth: () =>
    set({
      clerkUser: null,
      backendUser: null,
    }),
}));

export default useAuthStore;