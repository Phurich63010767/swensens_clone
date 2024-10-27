import { create } from 'zustand'

export const useUserState = create((set) => ({
  userInfo: {},
  setUserInfo: (newSate) => set({ userInfo: newSate }),
}))
