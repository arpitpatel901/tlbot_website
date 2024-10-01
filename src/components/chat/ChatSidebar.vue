<!-- src/components/chat/ChatSidebar.vue -->
<template>
  <div class="w-1/4 border-r p-4 overflow-auto flex flex-col">
    <!-- Header with Chats title and New Chat button -->
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-lg font-semibold text-black">Chats</h4>
      <button
        @click="startNewChat"
        class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        aria-label="Start a new chat"
      >
        <!-- New Chat Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Chats List -->
    <ul class="flex-1 overflow-y-auto">
      <li
        v-for="(session, index) in chatSessions"
        :key="session.id"
        :class="[
          'p-2 mb-2 rounded cursor-pointer flex justify-between items-center',
          activeSessionId === session.id
            ? 'bg-blue-100'
            : 'hover:bg-gray-100',
        ]"
        @click="selectSession(session.id)"
      >
        <span class="text-black">
          Transaction {{ index + 1 }}
        </span>
        <span class="text-xs text-gray-500">
          {{ formatDate(session.date) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  chatSessions: {
    type: Array,
    default: () => [],
  },
  currentChatSession: {
    type: Object,
    default: null,
  },
  folders: {
    type: Array,
    default: () => [],
  },
  openedFolders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['selectSession', 'startNewChat']);

const startNewChat = () => {
  emit('startNewChat');
};

const selectSession = (sessionId) => {
  emit('selectSession', sessionId);
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

// Compute the active session ID
const activeSessionId = computed(() => props.currentChatSession?.id);
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
