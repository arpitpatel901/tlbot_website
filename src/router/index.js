// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '../components/MainDashboard.vue'; // Adjust the import path as needed.
import HomePage from '../components/HomePage.vue';
import AuthCallback from '../components/AuthCallback.vue'
import Contact from '../components/Contact.vue'; // Import the Contact component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: HomePage
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
    path: '/contact',
    name: 'Contact',
    component: Contact, // Add contact page route
  }
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
