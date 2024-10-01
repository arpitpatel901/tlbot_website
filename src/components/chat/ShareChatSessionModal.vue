<!-- components/chat/ShareChatSessionModal.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4">Share Chat Session</h2>
        <div class="mb-4">
          <p class="text-sm text-gray-700">Share this chat session with others:</p>
          <input type="text" :value="shareableLink" readonly class="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Close</button>
          <button @click="copyLink" class="px-4 py-2 bg-blue-600 text-white rounded">Copy Link</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    chatSessionId: number;
    sharedStatus: string;
  }>();
  
  const emit = defineEmits(['close', 'share']);
  
  const shareableLink = computed(() => {
    return `${window.location.origin}/chat?chatId=${props.chatSessionId}`;
  });
  
  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink.value).then(() => {
      emit('share', true);
      emit('close');
    }).catch(() => {
      emit('share', false);
    });
  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional styles if necessary */
  </style>
  