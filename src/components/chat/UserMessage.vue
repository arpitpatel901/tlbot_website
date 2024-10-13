<!-- src/components/chat/UserMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="message-content">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

// Define the props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

// Debug log to ensure component is loaded
console.log("UserMessage.vue: Loaded with message:", props.message);

const messageClasses = computed(() => {
  return [
    "flex flex-col p-4 rounded-lg shadow-md max-w-md",
    "bg-blue-100 text-black ml-auto",
    "transition-transform duration-300 ease-in-out",
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
