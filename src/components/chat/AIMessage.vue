<!-- src/components/chat/AIMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="message-content">
      {{ message.message }}
    </div>
    <div class="text-xs text-gray-600 mt-1">
      {{ formatTimestamp(message.timestamp) }}
    </div>
    <div class="flex space-x-2 mt-2">
      <button @click="handleFeedback('positive', message.messageId)" class="text-green-500" aria-label="Positive Feedback">👍</button>
      <button @click="handleFeedback('negative', message.messageId)" class="text-red-500" aria-label="Negative Feedback">👎</button>
      <button @click="handleEdit(message.messageId, message.message)" class="text-gray-500" aria-label="Edit Message">✏️</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['feedback', 'edit', 'showDocs']);

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const handleFeedback = (type, messageId) => {
  emit('feedback', type, messageId);
};

const handleEdit = (messageId, currentContent) => {
  const newContent = prompt("Edit your message:", currentContent);
  if (newContent !== null && newContent.trim() !== "") {
    emit('edit', messageId, newContent.trim());
  }
};
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
