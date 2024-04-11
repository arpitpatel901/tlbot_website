import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara';      //import preset  
// import Wind from '@/presets/wind';      //import preset        
import vue3GoogleLogin from "vue3-google-login";

import App from './App.vue';

export const CLIENT_ID = "497764252617-oau8a78f5pcolh165ntbm36e9f3d3hgh.apps.googleusercontent.com";
const app = createApp(App);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset 
    // pt: Wind                            //apply preset      
},
vue3GoogleLogin, {
    clientId: CLIENT_ID
});

app.mount('#app');