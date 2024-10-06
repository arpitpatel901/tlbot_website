<!-- src/components/chat/UserMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="message-content">
      {{ message.message }}
    </div>
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
    'flex flex-col p-4 rounded-lg shadow-md max-w-md',
    props.message.type === 'user' ? 'bg-blue-100 text-black ml-auto' : 'bg-gray-100 text-black',
    'transition-transform duration-300 ease-in-out',
  ];
});
</script>

<style scoped>
.message-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 1rem;
}
</style>
