<!-- src/components/chat/UserMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="message-content">
      {{ message.message }}
    </div>
    <!-- No actions for user messages -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

/**
 * Computes the classes for the message container based on message type.
 */
const messageClasses = computed(() => {
  return [
    'p-2 rounded shadow bg-blue-100 text-black',
    // Additional classes can be added here
  ];
});
</script>

<style scoped>
.message-content {
  /* Ensure the text is black */
  color: black;
  /* Other styling as needed */
}

/* Optional: Style the message container */
.p-2 {
  padding: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
