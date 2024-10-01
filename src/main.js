// src/main.js
import "./assets/main.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@/presets/lara"; // import preset
// import Wind from '@/presets/wind';      // import preset
import vue3GoogleLogin from "vue3-google-login";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { useUserStore } from "@/stores/userStore";
// import { useChatStore } from "@/stores/chatStore"; // Remove this import if not needed

export const CLIENT_ID =
  "497764252617-oau8a78f5pcolh165ntbm36e9f3d3hgh.apps.googleusercontent.com";

const app = createApp(App);
const pinia = createPinia();

// PrimeVue setup
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara, // apply preset
  // pt: Wind  // apply preset
});
// Pinia Store
app.use(pinia);
// Router setup
app.use(router);
// Google Login setup
app.use(vue3GoogleLogin, {
  clientId: CLIENT_ID,
});

// Initialize the user store to load any persisted user data
const userStore = useUserStore();
userStore.initializeUser();

// Initialize the chat store and set user_id if logged in
// const chatStore = useChatStore();
// chatStore.initializeChat(); // Remove this line

if (userStore.user) {
  // chatStore.setUserId(userStore.user.id); // Remove or adjust if chatStore is not initialized here
}

app.mount("#app");
