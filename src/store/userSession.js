import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserSession = create(
  persist(
    (set, get) => ({
      user: null, // { name, email, password }

      setUser: (userData) => set({ user: userData }),

      clearUser: () => set({ user: null }),

      getUserCollectionPrefix: () => {
        const user = get().user;
        if (!user?.name) return "desconocido";
        const parts = user.name.trim().toLowerCase().split(" ");
        return parts.slice(0, 2).join("_");
      },
    }),
    {
      name: "user-session-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
