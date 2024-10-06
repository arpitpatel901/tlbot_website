<!-- src/components/chat/AssistantMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="message-content">
      {{ message.message }}
    </div>
    <div class="actions">
      <button
        @click="feedback('positive')"
        class="feedback-button"
        aria-label="Give positive feedback"
      >
        👍
      </button>
      <button
        @click="feedback('negative')"
        class="feedback-button"
        aria-label="Give negative feedback"
      >
        👎
      </button>
      <button
        @click="showDocs(message.messageId)"
        class="docs-button"
        aria-label="Show Documents"
      >
        📄
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['feedback', 'showDocs']);

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

/**
 * Emits feedback events.
 * @param {string} type - The type of feedback ('positive' or 'negative').
 */
const feedback = (type) => {
  emit('feedback', type, props.message.messageId);
};

/**
 * Emits showDocs event.
 * @param {string} messageId - The ID of the message.
 */
const showDocs = (messageId) => {
  emit('showDocs', messageId);
};
</script>

<style scoped>
.message-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 1rem;
}

/* Action Buttons */
.actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.feedback-button,
.docs-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s, color 0.2s;
}

.feedback-button:hover,
.docs-button:hover {
  transform: scale(1.2);
  color: #2563eb; /* Indigo-600 */
}
</style>
