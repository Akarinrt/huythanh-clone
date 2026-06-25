import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useAdminThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light', // Default is light
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'admin-theme-storage', // name of the item in the storage (must be unique)
    }
  )
)
