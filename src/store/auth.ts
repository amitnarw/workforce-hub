import { create } from "zustand";

type Role = "admin" | "team_lead" | "employee";

interface AuthState {
  user: null | { role: Role };
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));