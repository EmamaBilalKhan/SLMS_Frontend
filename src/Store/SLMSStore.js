import { create } from "zustand";

const useSLMSStore = create((set, get) => ({
    userRole: null,
    setUserRole: (userRole) => set({ userRole }),
    clearUser: () => set({ userRole: null }),
    getUserRole: () => get().userRole,
    refreshToken : null,
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    getRefreshToken: () => get().refreshToken,
    clearRefreshToken: () => set({ refreshToken: null }),
    accessToken: null,
    setAccessToken: (accessToken) => set({ accessToken }),
    getAccessToken: () => get().accessToken,
    clearAccessToken: () => set({ accessToken: null }),
    id: null,
    setId : (id)=> set({id}),
    isEmailVerified : null,
    setIsEmailVerified : (isEmailVerified)=> set({isEmailVerified})
}));

export default useSLMSStore;