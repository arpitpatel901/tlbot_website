<!-- src/components/NotFound.vue -->
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-800">
      <!-- Optional: Add a loading spinner or message -->
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  export default {
    name: 'NotFound',
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
  
      onMounted(() => {
        if (userStore.user) {
          // If authenticated, redirect to dashboard
          router.replace('/main_dashboard');
        } else {
          // If not authenticated, redirect to Home
          router.replace('/');
        }
      });
  
      return {};
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add styles for the loading state */
  </style>
  