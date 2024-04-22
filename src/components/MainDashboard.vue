<template>
  <div class="main-dashboard">
    <h1>Main Dashboard</h1>
    <p>Welcome to the Main Dashboard of the Application!</p>

    <!-- Display user information if available -->
    <div v-if="user">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <a 
        href="#" 
        class="hidden p-2 px-4 pt-2 text-black bg-white font-bold rounded-lg baseline hover:bg-blue-200 md:block border-transparent border-2"
      >
        <button @click="handleLogout">Logout</button>
      </a>

      
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
import { useRouter } from 'vue-router';

export default {
  name: 'MainDashboard',
  setup() {
    // Access user information from Pinia store
    const userStore = useUserStore();
    const user = ref(userStore.userData); // Reactive reference to user data
    const router = useRouter();

    const handleLogout = () => {
      userStore.logout();
      router.push('/login');
    };

    onMounted(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const userDataJSON = queryParams.get('userData');
      if (userDataJSON) {
        try {
          const userData = JSON.parse(decodeURIComponent(userDataJSON));
          userStore.setUser(userData);
          user.value = userData; // Update reactive reference
        } catch (e) {
          console.error('Error parsing user data from URL parameter:', e);
        }
      }
    });

    return {
      user, // Make sure to return this so it's available in the template
      handleLogout
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
