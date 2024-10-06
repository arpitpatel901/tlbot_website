<!-- components/chat/FeedbackModal.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4">Provide Feedback</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Feedback Type</label>
          <select v-model="feedbackType" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
            <option value="positive">👍 Positive</option>
            <option value="negative">👎 Negative</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Comments</label>
          <textarea v-model="comments" class="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="4" placeholder="Optional comments..."></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="submitFeedback" class="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineEmits, defineProps } from 'vue';
  
  const props = defineProps<{
    feedbackType: string;
    messageId: number;
  }>();
  
  const emit = defineEmits(['close', 'submit']);
  
  const feedbackType = ref<string>(props.feedbackType);
  const comments = ref<string>('');
  
  const submitFeedback = () => {
    emit('submit', { type: feedbackType.value, messageId: props.messageId, comments: comments.value });
  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional styles if necessary */
  </style>
  