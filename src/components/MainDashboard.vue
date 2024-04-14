<template>
  <div class="main-dashboard">
    <h1>Main Dashboard</h1>
    <p>Welcome to the Main Dashboard of the Application!</p>
  </div>
</template>

<script>
import axios from 'axios'; // Ensure Axios is imported

export default {
  name: 'MainDashboard',
  created() {
    console.log("Created MainDashboard")
    // Parse the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (code) {
      // If you have a code, send it to the backend for validation/processing
      this.sendCodeToBackend(code);
    }
  },
  methods: {
    async sendCodeToBackend(code) {
      try {
        // Note: Change this URL to your actual backend endpoint that handles the OAuth process
        const response = await axios.get(`http://localhost:3001/api/process-code`, { params: { code } });
        console.log("Response from backend:", response.data);
        // Handle the response, e.g., log in the user
      } catch (error) {
        console.error("Error processing the login code:", error);
      }
    }
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
