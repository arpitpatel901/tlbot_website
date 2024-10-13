<!-- src/components/chat/ChatIntro.vue -->
<template>
  <div class="flex flex-col items-center justify-center text-center p-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">
      Welcome to the Chat!
    </h2>
    <p class="text-gray-600 mb-6">Select a channel to start chatting.</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define the props (if any)
const props = defineProps({
  availableSources: {
    type: Array,
    default: () => [],
  },
  availablePersonas: {
    type: Array,
    default: () => [],
  },
  selectedPersona: {
    type: Object,
    default: () => ({}),
  },
});

// Debug log to ensure component is loaded
console.log("ChatIntro.vue: Loaded");
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
