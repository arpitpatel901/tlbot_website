import "./assets/main.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@/presets/lara"; // import preset
// import Wind from '@/presets/wind';      // import preset
import vue3GoogleLogin from "vue3-google-login";
import router from "./router";
import { createPinia } from 'pinia';
import App from "./App.vue";
import { useUserStore } from '@/stores/userStore';


export const CLIENT_ID = "497764252617-oau8a78f5pcolh165ntbm36e9f3d3hgh.apps.googleusercontent.com";

const app = createApp(App);

// PrimeVue setup
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara, // apply preset
    // pt: Wind  // apply preset
});

app.use(createPinia());

// Initialize the user store to load any persisted user data
const userStore = useUserStore();
userStore.initializeUser();

// Google Login setup
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID
});

// Router setup
app.use(router);

app.mount("#app");
