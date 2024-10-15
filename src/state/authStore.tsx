import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {mmkvStorage} from './storage';

// Define the authStore interface
interface AuthStore {
  user: Record<string, any> | null;
  currentOrder: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  logout: () => void;
}

// Create the Zustand store with persistence
export const useAuthStore = create(
  persist(
    (set,get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order: any) => set({ currentOrder: order }),
      setUser: (data: any) => set({ user: data }),
      logout: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: 'auth-storage', // Name of the storage
      storage: createJSONStorage(() => mmkvStorage), // MMKV storage configuration
    }
  )
);
