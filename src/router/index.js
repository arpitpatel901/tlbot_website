// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeRedirect from '@/components/HomeRedirect.vue';
import MainDashboard from '@/components/MainDashboard.vue';
import ConnectDataSources from '@/components/ConnectDataSources.vue';
import AccountSettings from '@/components/AccountSettings.vue';
import Unauthorized from '@/components/Unauthorized.vue';
import HomePage from '@/components/HomePage.vue';
import AuthCallback from '@/components/AuthCallback.vue';
import Contact from '@/components/Contact.vue';
import NotFound from '@/components/NotFound.vue';

// Lazy-loaded components
const Chat = () => import('@/components/chat/Chat.vue');

const routes = [
  {
    path: '/',
    name: 'HomeRedirect',
    component: HomeRedirect,
  },
  {
    path: '/login',
    name: 'Login',
    component: HomePage,
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/main_dashboard',
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
        path: 'chat/:channelId', // Dynamic segment for channelId
        name: 'Chat',
        component: Chat,
        props: true, // Pass channelId as a prop
        meta: { requiresAuth: true },
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
  // Catch-all route for unknown paths
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to protect routes
router.beforeEach(async (to, from, next) => {
  console.log('Navigating from', from.fullPath, 'to', to.fullPath);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore();

  // Initialize user if not already done
  if (userStore.user === null) {
    await userStore.initializeUser();
  }

  if (requiresAuth && !userStore.user) {
    console.log('Route requires auth, but user is not authenticated. Redirecting to HomeRedirect.');
    next({ name: 'HomeRedirect' }); // Redirect to HomeRedirect component
  } else {
    next();
  }
});

export default router;
