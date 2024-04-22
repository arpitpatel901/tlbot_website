<template>
    <div class="auth-callback">
      Processing login information...
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'AuthCallback',
    setup() {
      const userStore = useUserStore();
  
      onMounted(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        if (code) {
          fetchUserDataFrom(code);
        }
      });
  
      async function fetchUserDataFrom(code) {
        try {
          const response = await axios.get(`http://localhost:3001/api/google-auth`, { params: { code } });
          if (response.data.success && response.data.userData) {
            console.log("Received user data from backend:", response.data.userData);
            userStore.setUser(response.data.userData);
            this.$router.push("/main_dashboard");
          } else {
            console.error("Failed to retrieve user data:", response.data.error);
            this.$router.push("/login");
          }
        } catch (error) {
          console.error("Error during the login process:", error);
          this.$router.push("/login");
        }
      }
    }
  };
  </script>
  