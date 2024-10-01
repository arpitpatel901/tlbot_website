<!-- src/components/chat/AssistantMessage.vue -->
<template>
    <div :class="messageClasses">
      <div class="message-content">
        {{ message.message }}
      </div>
      <div class="actions">
        <button @click="feedback('positive')" class="feedback-button" aria-label="Positive Feedback">👍</button>
        <button @click="feedback('negative')" class="feedback-button" aria-label="Negative Feedback">👎</button>
        <button @click="showDocs(message.messageId)" class="docs-button" aria-label="Show Documents">📄</button>
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
      'p-2 rounded shadow',
      props.message.type === 'user' ? 'bg-blue-100 text-black' : 'bg-gray-100 text-black',
      // Additional classes can be added here
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
    /* Ensure the text is black */
    color: black;
    /* Other styling as needed */
  }
  
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
  }
  
  .feedback-button:hover,
  .docs-button:hover {
    opacity: 0.7;
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
  