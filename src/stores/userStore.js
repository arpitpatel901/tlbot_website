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
      this.userData = data;
    },
    clearUser() {
      this.userData = null;
    }
  }
});
