<!-- src/components/Chat.vue -->
<template>
    <div class="flex flex-col h-screen bg-gray-100">
      <!-- Health Check and Auto Refresh -->
      <HealthCheckBanner />
      <InstantSSRAutoRefresh />
  
      <!-- Main Layout -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Chat Sidebar -->
        <ChatSidebar
          :chatSessions="chatSessions"
          :currentChatSession="selectedChatSession"
          :folders="folders"
          :openedFolders="openedFolders"
        />
  
        <!-- Chat Content -->
        <main class="flex-1 flex flex-col bg-gray-50">
          <!-- Messages Area -->
          <div class="flex-1 p-4 overflow-y-auto">
            <!-- Messages List -->
            <div v-if="messageHistory.length > 0" class="space-y-4">
              <AIMessage
                v-for="(message, index) in messageHistory"
                :key="message.messageId"
                :message="message"
                @feedback="openFeedbackModal"
                @edit="editMessage"
                @showDocs="showDocuments"
              />
              <div v-if="isStreaming" class="flex justify-center my-4">
                <ThreeDots
                  height="30"
                  width="50"
                  color="#3b82f6"
                  ariaLabel="loading"
                />
              </div>
            </div>
            <div v-else class="flex items-center justify-center h-full">
              <ChatIntro 
                :availableSources="finalAvailableSources" 
                :availablePersonas="filteredAssistants" 
                :selectedPersona="selectedPersona" 
                @startChat="initializeNewChat"
              />
            </div>
          </div>
  
          <!-- Message Input -->
          <footer class="p-4 bg-white border-t">
            <ChatInputBar
              v-model="newMessage"
              :isStreaming="isStreaming"
              :disabled="!selectedChatSession || isStreaming"
              @send="sendMessage"
              @cancel="cancelStreaming"
            />
          </footer>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useChatStore } from '@/stores/chatStore.js';
  import { useUserStore } from '@/stores/userStore.js';
  
  // Import Components
  import ChatSidebar from '@/components/chat/ChatSidebar.vue';
  import HealthCheckBanner from '@/components/health/HealthCheckBanner.vue';
  import InstantSSRAutoRefresh from '@/components/SSRAutoRefresh.vue';
  import AIMessage from '@/components/chat/AIMessage.vue';
  import ChatInputBar from '@/components/chat/ChatInputBar.vue';
  import ChatIntro from '@/components/chat/ChatIntro.vue';
  import { ThreeDots } from 'vue3-spinner'; // Updated to use vue3-spinner
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  
  const router = useRouter();
  const route = useRoute();
  
  const chatSessions = computed(() => chatStore.chatSessions);
  const selectedChatSession = computed(() => {
    const chatId = parseInt(route.query.chatId, 10);
    return chatStore.chatSessions.find(session => session.id === chatId) || null;
  });
  const folders = ref([]); // Placeholder for folders
  const openedFolders = ref([]); // Placeholder for opened folders
  
  // Reactive State
  const newMessage = ref('');
  const isStreaming = ref(false);
  
  // Computed Properties
  const messageHistory = computed(() => {
    if (!chatStore.completeMessageMap.value) {
      return [];
    }
    // Convert completeMessageMap to an ordered array
    return Object.values(chatStore.completeMessageMap.value).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });
  
  // Placeholder User Data
  const user = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150', // Placeholder avatar
  };
  
  // Functions
  
  const sendMessage = async () => {
    if (!newMessage.value.trim()) return;
    isStreaming.value = true;
  
    // Implement message sending logic
    // For now, simulate a message being sent
  
    setTimeout(() => {
      // Simulate AI response
      chatStore.addMessage({
        messageId: Date.now(),
        message: `Echo: ${newMessage.value}`,
        type: 'assistant',
        timestamp: new Date().toISOString(),
      });
      newMessage.value = '';
      isStreaming.value = false;
    }, 1500);
  };
  
  const cancelStreaming = () => {
    isStreaming.value = false;
    // Implement cancellation logic if applicable
  };
  
  // Placeholder functions for feedback and editing
  const openFeedbackModal = (type, messageId) => {
    // Implement feedback modal opening logic
  };
  
  const editMessage = (messageId, newContent) => {
    // Implement message editing logic
  };
  
  const showDocuments = (messageId) => {
    // Implement document display logic
  };
  
  // Function to initialize a new chat
  const initializeNewChat = () => {
    // Example implementation: add a new chat session
    const newSession = {
      id: Date.now(),
      lastMessageTimestamp: new Date().toISOString(),
      lastMessage: '',
      persona_id: null, // Assign a persona if applicable
      sharedStatus: 'Private',
      // Add other necessary properties
    };
    chatStore.addChatSession(newSession);
    chatStore.setActiveChatSession(newSession.id);
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here */
  </style>
  