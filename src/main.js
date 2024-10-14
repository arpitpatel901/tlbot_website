// src/main.js
import "./assets/main.css"; // Assuming this is your Tailwind CSS file

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@/presets/lara";
import axios from 'axios';
import vue3GoogleLogin from "vue3-google-login";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { useUserStore } from "@/stores/userStore";

// Set the base URL if your backend is running on a different port
axios.defaults.baseURL = 'http://localhost:3001';
// Include credentials (cookies) with requests
axios.defaults.withCredentials = true;

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const app = createApp(App);
const pinia = createPinia();

// PrimeVue setup
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara, // apply preset
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

app.mount("#app");
