<template>
  <div class="main-dashboard">
    <h1>Main Dashboard</h1>
    <p>Welcome to the Main Dashboard of the Application!</p>

    <!-- Display user information if available -->
    <div v-if="user">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Add more fields as needed -->
    </div>
    <div v-else>
      <p>No user information available.</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Ensure the path is correct

export default {
  name: 'MainDashboard',
  setup() {
    // Access user information from Pinia store
    const userStore = useUserStore();
    const user = ref(userStore.userData);

    onMounted(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const userDataJSON = queryParams.get('userData');
      if (userDataJSON) {
        try {
          // Parse and decode user data from the URL parameter
          const userData = JSON.parse(decodeURIComponent(userDataJSON));
          // Update the user store with the retrieved data
          userStore.setUser(userData);
          // Update the local user ref to be reactive
          user.value = userData;
        } catch (e) {
          console.error('Error parsing user data from URL parameter:', e);
        }
      }
    });

    return {
      user
    };
  }
};
</script>

<style scoped>
.main-dashboard {
  padding: 20px;
  text-align: center;
}

.main-dashboard h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.main-dashboard p {
  font-size: 18px;
  color: #34495e;
}
</style>
