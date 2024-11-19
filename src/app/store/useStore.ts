import { create } from "zustand";

// Define the types for the state and actions
interface CloseStore {
  close: boolean;
  setClose: (close: boolean) => void;
}

// Create the store with typed state and action
export const useClose = create<CloseStore>((set) => ({
  close: false,
  setClose: (close: boolean) => set({ close }),
}));