import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara';      //import preset  
// import Wind from '@/presets/wind';      //import preset        


import App from './App.vue';

const app = createApp(App);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset 
    // pt: Wind                            //apply preset      
});

app.mount('#app');