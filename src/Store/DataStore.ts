import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Userdata {
  userId: string | null;
  email: string | null;
  name: string | null;
  setUserData: (userId: string, email: string, name: string) => void;
  resetUserData: () => void;
}

export const useDataStore = create<Userdata>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      name: null,

      setUserData: (userId: string, email: string, name: string) => {
        set({
          userId: userId,
          email: email,
          name: name,
        });
      },
      resetUserData: () => {
        set({
          userId: null,
          email: null,
          name: null,
        });
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
