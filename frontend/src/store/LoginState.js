import { create } from 'zustand'

export const useLoginState = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (newSate) => set({ isLoggedIn: newSate }),
}))
