<!-- src/components/chat/ChatIntro.vue -->
<template>
    <div class="flex flex-col items-center justify-center text-center p-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-3.582 8-8 8H11a8 8 0 01-8-8V6a8 8 0 018-8h2a8 8 0 018 8v6z" />
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Welcome to the Chat!</h2>
      <p class="text-gray-600 mb-6">Start by sending a message below. I'm here to assist you.</p>
      <button
        @click="$emit('startChat')"
        class="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
        aria-label="Start Chat"
      >
        Start Chatting
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define props
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
  
  // Define emits
  const emit = defineEmits(['startChat']);
  </script>
  
  <style scoped>
  /* Optional: Add any specific styles here */
  </style>
  