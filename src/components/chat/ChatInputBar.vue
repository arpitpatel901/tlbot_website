<!-- src/components/chat/ChatInputBar.vue -->
<template>
  <div class="flex items-center space-x-2 text-black">
    <input
      v-model="inputMessage"
      type="text"
      placeholder="Type your message..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      @keyup.enter="send"
    />
    <button
      :disabled="disabled"
      @click="send"
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300 transition-colors duration-200"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

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

const emit = defineEmits(['update:modelValue', 'send', 'cancel']);

const inputMessage = ref(props.modelValue);

// Sync with parent component
watch(inputMessage, (newVal) => {
  emit('update:modelValue', newVal);
});

const send = () => {
  console.log("reached send", inputMessage.value)
  if (!inputMessage.value.trim()) return;
  console.log("emitting send")
  emit('send');
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
