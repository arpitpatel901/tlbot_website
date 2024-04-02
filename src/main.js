import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara';      //import preset        

import App from './App.vue'

const app = createApp(App).mount('#app')
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset        
});
