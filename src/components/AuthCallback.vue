<!-- src/components/AuthCallback.vue -->
<template>
  <div
    class="auth-callback flex items-center justify-center min-h-screen bg-gray-800"
  >
    <div v-if="status === 'success'" class="text-center text-gray-100">
      <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
      <p class="text-lg text-gray-100">You have successfully logged in.</p>
      <p v-if="userStore.user" class="mt-2">Redirecting to your dashboard...</p>
    </div>
    <div v-else-if="status === 'unauthorized'" class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p class="text-xl text-gray-100">
        Your email is not authorized to access this application.
      </p>
      <p class="mt-2 text-lg text-gray-100">
        Please contact support if you believe this is a mistake.
      </p>
      <p class="mt-2 text-lg text-gray-100">Email: support@toucanlabs.ai</p>
    </div>
    <div v-else class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-yellow-500">
        Authentication Pending
      </h1>
      <p class="text-lg text-gray-100">
        Please wait while we process your authentication.
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  name: "AuthCallback",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const status = ref(null);

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      status.value = urlParams.get("status");

      if (status.value === "success") {
        // Initialize user by fetching data from the server
        await userStore.initializeUser();

        if (userStore.user) {
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push({ name: "MainDashboard" });
          }, 2000);
        } else {
          // Handle case where user data could not be fetched
          console.error("Failed to fetch user data.");
          // Optionally, redirect to login page or show an error message
        }
      } else if (status.value === "unauthorized") {
        // Clear any existing user data
        userStore.clearUser();
        // No redirection; user remains on this page to see the message
      } else {
        // Handle other statuses or default behavior
        console.log("Authentication pending...");
      }
    });

    return {
      status,
      userStore, // Expose userStore if needed in the template
    };
  },
};
</script>
