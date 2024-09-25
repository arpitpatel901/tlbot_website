// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '../components/MainDashboard.vue'; // Adjust the import path as needed.
import HomePage from '../components/HomePage.vue';
import AuthCallback from '../components/AuthCallback.vue'
import Contact from '../components/Contact.vue'; // Import the Contact component
import Unauthorized from '@/components/Unauthorized.vue'; // Optional: Separate page for unauthorized access
import ProtectedLayout from '@/layouts/ProtectedLayout.vue';
import { useUserStore } from '@/stores/userStore'; // Import the user store


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
    component: ProtectedLayout,
    children: [
      { path: '', component: MainDashboard, meta: { requiresAuth: true } },
    ],
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
  },
  {
    path: '/unauthorized',
    component: Unauthorized
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore();

  if (requiresAuth && !userStore.user) {
    next('/');
  } else {
    next();
  }
});

export default router;
