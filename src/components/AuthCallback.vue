<!-- src/components/AuthCallback.vue -->
<template>
  <div class="auth-callback flex items-center justify-center min-h-screen bg-gray-800">
    <div v-if="status === 'success'" class="text-center text-gray-100">
      <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
      <p class="text-lg text-gray-100">You have successfully logged in.</p>
      <p v-if="userData" class="mt-2">Redirecting to your dashboard...</p>
    </div>
    <div v-else-if="status === 'unauthorized'" class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p class="text-xl text-gray-100">Your email is not authorized to access this application.</p>
      <p class="mt-2 text-lg text-gray-100">
        Please contact support if you believe this is a mistake.
      </p>
      <p class="mt-2 text-lg text-gray-100">
        Email: support@toucanlabs.ai
      </p>
    </div>
    <div v-else class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-yellow-500">Authentication Pending</h1>
      <p class="text-lg">Please wait while we process your authentication.</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthCallback',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const userData = urlParams.get('userData');

    if (status === 'success' && userData) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userData));
        userStore.setUser(parsedUserData);
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/main_dashboard');
        }, 2000);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (status === 'unauthorized') {
      // Optionally, you can set user to null
      userStore.clearUser();
      // No redirection; user remains on this page to see the message
    }

    return {
      status,
      userData,
    };
  },
};
</script>

