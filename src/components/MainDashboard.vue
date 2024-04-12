<template>
  <div class="main-dashboard">
    <h1>Main Dashboard</h1>
    <p>Welcome to the Main Dashboard of the Application!</p>
  </div>
</template>

<script>
export default {
  name: "MainDashboard",
  data() {
    return {
      // Data properties for the dashboard can be added here
    };
  },
  methods: {
    // Methods for dashboard functionality can be added here
  },
  mounted() {
    // This lifecycle hook can be used to fetch data when the component mounts
    console.log("Main Dashboard Component has been mounted.");
  },
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
