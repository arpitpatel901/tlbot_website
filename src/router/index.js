// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '../components/MainDashboard.vue'; // Adjust the import path as needed.
import NavbarTailwind from '../components/NavbarTailwind.vue';
import AuthCallback from '../components/AuthCallback.vue';
import SignIn from '../components/SignIn.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NavbarTailwind
  },
  {
    path: '/login',
    name: 'Login',
    component: NavbarTailwind
  },
  {
    path: '/main_dashboard',
    name: 'MainDashboard',
    component: MainDashboard,
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn,
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
