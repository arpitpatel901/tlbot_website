<!-- src/components/HomeRedirect.vue -->
<template>
  <div class="flex justify-center items-center h-screen">
    <p>Redirecting...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.initializeUser(); // Initialize user data

  if (userStore.user) {
    router.replace({ name: "MainDashboard" });
  } else {
    router.replace({ name: "Login" });
  }
});
</script>

<style scoped>
/* Optional: Add styles for the redirecting state */
</style>
