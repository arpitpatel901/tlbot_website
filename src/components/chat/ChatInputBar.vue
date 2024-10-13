<!-- src/components/chat/ChatInputBar.vue -->
<template>
  <div class="flex items-center space-x-2 text-black">
    <input
      v-model="inputMessage"
      @keyup.enter="send"
      :placeholder="placeholder"
      class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
      :disabled="disabled"
      aria-label="Type your message"
    />
    <button
      @click="send"
      class="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      :disabled="disabled || isStreaming"
      aria-label="Send Message"
    >
      Send
    </button>
    <button
      v-if="isStreaming"
      @click="cancel"
      class="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
      aria-label="Cancel Sending"
    >
      Cancel
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { defineProps, defineEmits } from "vue";

// Define the props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
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

// Debug logs when ChatInputBar is loaded
console.log("ChatInputBar component loaded");

// Define the emit
const emit = defineEmits(["send", "update:modelValue"]);

// Manage the input message state
const inputMessage = ref(props.modelValue);

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    inputMessage.value = newVal;
    console.log("ChatInputBar: modelValue updated:", newVal); // Log when modelValue changes
  }
);

// Emit updates to modelValue
watch(inputMessage, (newVal) => {
  console.log("ChatInputBar: inputMessage updated:", newVal); // Log when inputMessage changes
  emit("update:modelValue", newVal);
});

// Send the message
const send = () => {
  if (!inputMessage.value.trim()) {
    alert("Cannot send an empty message.");
    console.log("ChatInputBar: Attempted to send empty message");
    return;
  }
  console.log("ChatInputBar: Sending message:", inputMessage.value); // Log when sending a message
  emit("send");
};

const placeholder = computed(() => {
  return props.disabled
    ? "Select a chat session to start messaging."
    : "Type your message here...";
});

// Optional: Implement cancel functionality if needed
const cancel = () => {
  console.log("ChatInputBar: Cancel sending message");
  // Implement cancel logic if applicable
};
</script>

<style scoped>
/* Ensure the input and button are touch-friendly */
input {
  font-size: 1rem;
}

button {
  font-size: 1rem;
}
</style>
