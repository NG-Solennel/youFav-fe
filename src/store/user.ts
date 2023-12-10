import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserType {
  id: string;
  lastName: string;
  firstName: string;
  login: string;
  token: string;
}

interface UserState {
  user: UserType | undefined;
  setUser: (user: UserType | undefined) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
    }),
    { name: "profile" }
  )
);

export default useUserStore;
