// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '@/components/MainDashboard.vue';
import ConnectDataSources from '@/components/ConnectDataSources.vue';
import AccountSettings from '@/components/AccountSettings.vue';
import Unauthorized from '@/components/Unauthorized.vue';
import HomePage from '../components/HomePage.vue';
import AuthCallback from '../components/AuthCallback.vue'
import Contact from '../components/Contact.vue'; // Import the Contact component
import ProtectedLayout from '@/layouts/ProtectedLayout.vue';
import { useUserStore } from '@/stores/userStore'; // Import the user store


const Chat = () => import('@/components/Chat.vue');

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
    path: '/',
    name: 'MainDashboard',
    component: MainDashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'connect-data-sources',
        name: 'ConnectDataSources',
        component: ConnectDataSources,
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: AccountSettings,
      },
    ],
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
  },
  // Redirect any unknown routes to MainDashboard or a 404 component
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to protect routes
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
