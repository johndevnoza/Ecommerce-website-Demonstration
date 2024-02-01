import { create } from "zustand";

type SearchState = {
  isSearchActive: boolean;
  activateSearch: () => void;
  deactivateSearch: () => void;
};

const useSearchStore = create<SearchState>((set) => ({
  isSearchActive: false,
  activateSearch: () => {
    console.log("Activating search...");
    set({ isSearchActive: true });
  },
  deactivateSearch: () => {
    console.log("Deactivating search...");
    set({ isSearchActive: false });
  },
}));
export default useSearchStore;
