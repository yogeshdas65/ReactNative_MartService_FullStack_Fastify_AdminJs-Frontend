import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

// Define the authStore interface
interface AuthStore {
  user: Record<string, any> | null;
  currentOrder: Record<string, any> | null;
  setUser: (user: Record<string, any>) => void;
  setCurrentOrder: (order: Record<string, any>) => void;
  logout: () => void;
}

// Fix: Correctly specify the types for Zustand's `persist` middleware
export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order: Record<string, any>) => set({ currentOrder: order }),
      setUser: (data: Record<string, any>) => set({ user: data }),
      logout: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: 'auth-storage', // Name of the storage
      storage: createJSONStorage(() => mmkvStorage), // MMKV storage configuration
    }
  )
);
