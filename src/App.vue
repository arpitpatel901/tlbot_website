<script setup>
</script>

<template>
  <div id="app">
    <router-view></router-view> <!-- Routed components get rendered here -->
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore();
    onMounted(() => {
      userStore.initializeUser();
    });
  },
};
</script>

<style scoped></style>
