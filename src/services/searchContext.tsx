import { create } from "zustand";
// this is state for blurring effect when input search
type SearchState = {
  isSearchActive: boolean;
  activateSearch: () => void;
  deactivateSearch: () => void;
};

const useSearchStore = create<SearchState>((set) => ({
  isSearchActive: false,
  activateSearch: () => {
    set({ isSearchActive: true });
  },
  deactivateSearch: () => {
    set({ isSearchActive: false });
  },
}));
export default useSearchStore;
