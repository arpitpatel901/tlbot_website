<script setup>
// import ExampleComponent from "./components/ExampleComponent.vue";
// import StackedList from "./components/StackedList.vue";
// import Navbar from "./components/Navbar.vue";
// import NavbarTailwind from "./components/NavbarTailwind.vue";


</script>

<template>
  <div id="app">
    <!-- <NavbarTailwind /> -->
    <router-view></router-view> <!-- Routed components get rendered here -->
    <!-- <Navbar /> -->
    <!-- <StackedList /> -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped></style>
