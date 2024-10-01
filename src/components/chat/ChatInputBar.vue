<!-- src/components/chat/ChatInputBar.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="text-black flex items-center space-x-4">
    <input
      v-model="localMessage"
      type="text"
      placeholder="Type your message..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      :disabled="disabled"
      required
      aria-label="Type your message"
    />
    <button
      type="submit"
      class="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors disabled:opacity-50"
      :disabled="disabled"
      aria-label="Send message"
    >
      <!-- Send Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isStreaming: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Define emits
const emit = defineEmits(['update:modelValue', 'send', 'cancel']);

// Local message state
const localMessage = ref(props.modelValue);

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    localMessage.value = newVal;
  }
);

// Watch for localMessage changes and emit 'update:modelValue'
watch(
  () => localMessage.value,
  (newVal) => {
    emit('update:modelValue', newVal);
  }
);

// Handle form submission
const handleSubmit = () => {
  if (props.isStreaming) {
    // Emit a cancel event if streaming is in progress
    emit('cancel');
  } else {
    // Emit a send event
    emit('send');
  }
};
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
