<!-- src/components/chat/ChatInputBar.vue -->
<template>
  <div class="flex items-center space-x-2">
    <input
      v-model="inputMessage"
      @keyup.enter="send"
      :placeholder="placeholder"
      class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      :disabled="disabled"
      aria-label="Type your message"
    />
    <button
      @click="send"
      class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      :disabled="disabled || isStreaming"
      aria-label="Send Message"
    >
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { defineProps, defineEmits } from "vue";

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

const emit = defineEmits(["send", "update:modelValue"]);

const inputMessage = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    inputMessage.value = newVal;
  }
);

watch(inputMessage, (newVal) => {
  emit("update:modelValue", newVal);
});

const send = () => {
  if (!inputMessage.value.trim()) return;
  emit("send");
};

const placeholder = computed(() => {
  return props.disabled
    ? "Select a channel to start messaging."
    : "Type your message here...";
});
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
