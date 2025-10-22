import { create } from "zustand";

export const useUserSession = create((set, get) => ({
  user: null, // { name, email, password }

  setUser: (userData) => set({ user: userData }),

  clearUser: () => set({ user: null }),

  getUserCollectionPrefix: () => {
    const user = get().user;
    if (!user?.name) return "desconocido";
    const parts = user.name.trim().toLowerCase().split(" ");
    return parts.slice(0, 2).join("_");
  },
}));
