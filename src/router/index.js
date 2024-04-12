// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '../components/MainDashboard.vue'; // Adjust the import path as needed.
import NavbarTailwind from '../components/NavbarTailwind.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NavbarTailwind
  },
  {
    path: '/main_dashboard',
    name: 'MainDashboard',
    component: MainDashboard,
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
