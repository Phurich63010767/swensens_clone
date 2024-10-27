import { create } from 'zustand'

export const useUserState = create((set) => ({
  isAdmin: false,
  setIsAdmin: (newSate) => set({ isAdmin: newSate }),
  userInfo: {},
  setUserInfo: (newSate) => set({ userInfo: newSate }),
}))
