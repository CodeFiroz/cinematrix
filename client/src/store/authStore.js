import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      loading: false,
      error: null,

      setAuth: ({ user }) =>
        set({ user, isLoggedIn: true }),

      logout: () => set({ user: null, isLoggedIn: false }),

      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true });
          
          set({
            user: res.data.user,
            isLoggedIn: true,
            loading: false,
          });
          
        } catch (err) {
          set({ isLoggedIn: false, user: null, loading: false });
          console.log(err);
          
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);

