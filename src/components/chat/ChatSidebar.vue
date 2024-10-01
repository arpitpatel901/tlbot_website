<!-- src/components/chat/ChatSidebar.vue -->
<template>
  <aside class="w-1/4 bg-white border-r overflow-y-auto">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Chats</h3>
      <div v-for="(group, index) in groupedTransactions" :key="index" class="mb-4">
        <h4 class="text-md font-semibold text-gray-600 mb-2">{{ group.label }}</h4>
        <ul>
          <li
            v-for="session in group.sessions"
            :key="session.id"
            @click="selectSession(session.id)"
            :class="[
              'p-3 mb-2 rounded-lg cursor-pointer transition-colors',
              currentChatSession && currentChatSession.id === session.id
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-100 text-gray-700',
            ]"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">Transaction {{ getTransactionNumber(session.id) }}</span>
              <span class="text-xs text-gray-500">{{ formatTimestamp(session.lastMessageTimestamp) }}</span>
            </div>
            <p class="text-xs text-gray-500 truncate">{{ session.lastMessage }}</p>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface BackendChatSession {
  id: number;
  lastMessageTimestamp: string;
  lastMessage: string;
  persona_id: number;
  sharedStatus: 'Public' | 'Private';
  // Add other properties as needed
}

const props = defineProps<{
  chatSessions: BackendChatSession[];
  currentChatSession: BackendChatSession | null;
  folders: any[]; // Define appropriate types
  openedFolders: any[]; // Define appropriate types
}>();

const emit = defineEmits(['selectSession']);

const groupedTransactions = computed(() => {
  const groups = {
    Today: [] as BackendChatSession[],
    Yesterday: [] as BackendChatSession[],
    'Last 7 Days': [] as BackendChatSession[],
    'Last 30 Days': [] as BackendChatSession[],
    Earlier: [] as BackendChatSession[],
  };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOf7Days = new Date(startOfToday);
  startOf7Days.setDate(startOf7Days.getDate() - 7);
  const startOf30Days = new Date(startOfToday);
  startOf30Days.setDate(startOf30Days.getDate() - 30);

  props.chatSessions.forEach(session => {
    const sessionDate = new Date(session.lastMessageTimestamp);
    if (sessionDate >= startOfToday) {
      groups.Today.push(session);
    } else if (sessionDate >= startOfYesterday) {
      groups.Yesterday.push(session);
    } else if (sessionDate >= startOf7Days) {
      groups['Last 7 Days'].push(session);
    } else if (sessionDate >= startOf30Days) {
      groups['Last 30 Days'].push(session);
    } else {
      groups.Earlier.push(session);
    }
  });

  // Remove empty groups
  return Object.entries(groups)
    .filter(([_, sessions]) => sessions.length > 0)
    .map(([label, sessions]) => ({ label, sessions }));
});

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getTransactionNumber = (sessionId: number) => {
  const index = props.chatSessions.findIndex(session => session.id === sessionId);
  return index !== -1 ? index + 1 : '';
};

const selectSession = (sessionId: number) => {
  emit('selectSession', sessionId);
};
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
