// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null, // Stores user data after authentication
    user: null, 
  }),
  getters: {
    isLoggedIn: (state) => state.userData !== null
  },
  actions: {
    setUser(userData) {
      this.user = userData;
      // Persist user data (optional)
      localStorage.setItem('user', JSON.stringify(userData));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initializeUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
  },
});
