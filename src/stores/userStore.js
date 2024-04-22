// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null
  }),
  getters: {
    isLoggedIn: (state) => state.userData !== null
  },
  actions: {
    setUser(data) {
      // Optionally save non-sensitive preferences to local storage
      this.userData = data;
      localStorage.setItem('userPreferences', JSON.stringify(data.preferences));
    },
    logout() {
      this.userData = null;
      // Optionally clear any other state properties or reset them to default values
      // Clear any session cookies or tokens here if they are set on the client-side
      // Clear user information from local storage if needed
      localStorage.removeItem('userPreferences');
      // Clear session cookies if applicable
      document.cookie = 'sessionToken=; Max-Age=0; path=/; domain=' + window.location.hostname;

    }
  }
});
