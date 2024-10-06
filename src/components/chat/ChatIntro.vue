<!-- src/components/chat/ChatIntro.vue -->
<template>
  <div class="flex flex-col items-center justify-center text-center p-8">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <!-- Example Intro Icon -->
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.017 6.844L12 20l-6.176-3.578a12.083 12.083 0 01.017-6.844L12 14z" />
    </svg>
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Welcome to the Chat!</h2>
    <p class="text-gray-600 mb-6">Start by sending a message below. I'm here to assist you.</p>
    <!-- Removed the Start Chatting button -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

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
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
