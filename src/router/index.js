// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from './../components/MainDashboard.vue'; // Adjust the path as necessary

const routes = [
  {
    path: '/main_dashboard',
    name: 'MainDashboard',
    component: MainDashboard
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
