// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '@/components/MainDashboard.vue';
import ConnectDataSources from '@/components/ConnectDataSources.vue';
import AccountSettings from '@/components/AccountSettings.vue';
import Unauthorized from '@/components/Unauthorized.vue';
import HomePage from '@/components/HomePage.vue';
import AuthCallback from '@/components/AuthCallback.vue';
import Contact from '@/components/Contact.vue';
import { useUserStore } from '@/stores/userStore';

const Chat = () => import('@/components/Chat.vue');
const NotFound = () => import('@/components/NotFound.vue'); // Import the NotFound component


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
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
        // alias: '/connect-data-sources',
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        // alias: '/chat',
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: AccountSettings,
        // alias: '/account-settings',
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
    component: NotFound, // Use the NotFound component
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

  // Debugging Logs
  console.log('Navigating to:', to.fullPath);
  console.log('User Store State:', userStore.user);

  if (requiresAuth && !userStore.user) {
    console.log('User not authenticated. Redirecting to Home.');
    next('/');
  } else {
    next();
  }
});

export default router;
