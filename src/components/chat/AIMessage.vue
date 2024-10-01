<!-- src/components/chat/AIMessage.vue -->
<template>
  <div class="flex items-start space-x-4">
    <div class="flex-shrink-0">
      <!-- AI Avatar or Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <!-- Example AI Icon -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.017 6.844L12 20l-6.176-3.578a12.083 12.083 0 01.017-6.844L12 14z" />
      </svg>
    </div>
    <div class="flex-1 bg-white p-4 rounded-lg shadow">
      <p class="text-gray-800">{{ message.message }}</p>
      <span class="text-xs text-gray-500 mt-2 block">{{ formatTimestamp(message.timestamp) }}</span>
      <div class="flex space-x-2 mt-2">
        <button @click="handleFeedback('positive')" class="text-green-500" aria-label="Positive Feedback">👍</button>
        <button @click="handleFeedback('negative')" class="text-red-500" aria-label="Negative Feedback">👎</button>
        <button @click="handleEdit" class="text-gray-500" aria-label="Edit Message">✏️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({
      messageId: 0,
      message: '',
      type: 'assistant',
      timestamp: '',
    }),
  },
});

const emit = defineEmits(['feedback', 'edit', 'showDocs']);

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const handleFeedback = (type) => {
  emit('feedback', type, props.message.messageId);
};

const handleEdit = () => {
  emit('edit', props.message.messageId, props.message.message);
};
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
