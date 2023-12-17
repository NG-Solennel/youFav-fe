import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

export default useSearchStore;
