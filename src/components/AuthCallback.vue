<template>
    <div class="auth-callback">
      Processing login information...
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
//   import { onMounted } from 'vue';
//   import axios from 'axios';
  
  export default {
    name: 'AuthCallback',
    created() {
        // Parse userData from the query params
        const queryParams = new URLSearchParams(window.location.search);
        const userData = queryParams.get('userData');
        if (userData) {
        const userStore = useUserStore();
        userStore.setUser(JSON.parse(decodeURIComponent(userData)));
        this.$router.push('/main_dashboard');
        }
    },
  };
  </script>
  