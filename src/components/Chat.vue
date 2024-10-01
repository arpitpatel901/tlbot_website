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
        @selectSession="handleSelectSession"
        @startNewChat="initializeNewChat"
      />

      <!-- Chat Content -->
      <main class="flex-1 flex flex-col bg-gray-50">
        <!-- Messages Area -->
        <div class="flex-1 p-4 overflow-y-auto" ref="chatArea">
          <!-- Messages List -->
          <div v-if="messageHistory.length > 0" class="space-y-4">
            <AIMessage
              v-for="(message, index) in messageHistory"
              :key="message.messageId"
              :message="message"
              @feedback="handleFeedback"
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
import { ref, computed, onMounted, watch, nextTick } from 'vue';
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
import { ThreeDots } from 'vue3-spinner';
// import axios from 'axios'; # Needed for real backend

// Import uuidv4
import { v4 as uuidv4 } from 'uuid';

const finalAvailableSources = ref([]);
const filteredAssistants = ref([]);
const selectedPersona = ref(null);

// Initialize Stores
const chatStore = useChatStore();
const userStore = useUserStore();

// Router Setup
const router = useRouter();
const route = useRoute();

// Computed Properties
const chatSessions = computed(() => chatStore.chatSessions);
const selectedChatSession = computed(() => {
  const chatId = route.query.chatId;
  const session = chatStore.chatSessions.find(session => session.id === chatId) || null;
  console.log("Computed selectedChatSession:", session);
  return session;
});
const folders = ref([]); // Placeholder for folders
const openedFolders = ref([]); // Placeholder for opened folders

// Reactive State
const newMessage = ref('');
const isStreaming = ref(false);

// Computed Properties
const messageHistory = computed(() => {
  const session = selectedChatSession.value;
  if (!session) return [];
  
  const messages = chatStore.completeMessageMap.value;
  if (messages && typeof messages === 'object') {
    const filtered = Object.values(messages)
      .filter(msg => msg.transaction_id === session.id)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    console.log("Computed messageHistory:", filtered);
    return filtered;
  } else {
    console.log("No messages found for the active session.");
    return [];
  }
});

// Reference to the chat area for scrolling
const chatArea = ref(null);

// Placeholder User Data
const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/150', // Placeholder avatar
};

// Functions

/**
 * Sends a message from the user and handles the AI response.
 */
 const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageContent = newMessage.value.trim();
  const messageId = uuidv4();
  const txn_id = chatStore.activeChatSessionId.value; // Correctly access the ref value
  const user_id = userStore.user?.id || 'unknown_user'; // Handle undefined user_id

  console.log("Sending message:", messageContent, "Transaction ID:", txn_id);

  // Add user's message to the store
  chatStore.addMessage({
    messageId: messageId,
    message: messageContent,
    type: 'user',
    timestamp: new Date().toISOString(),
    transaction_id: txn_id,
    user_id: user_id,
    extra: {}, // Add any additional metadata if needed
  });

  // Clear the input and set loading
  newMessage.value = '';
  isStreaming.value = true;

  // Scroll to bottom
  scrollToBottom();

  try {
    // Mock backend request (replace with actual API call)
    const response = await mockBackendRequest({
      message_content: messageContent,
      message_id: messageId,
      transaction_id: txn_id,
      user_id: user_id,
      extra: {}, // Additional metadata
    });

    // Add AI response to the store
    if (response && response.ai_response) {
      const aiMessageId = uuidv4();
      chatStore.addMessage({
        messageId: aiMessageId,
        message: response.ai_response,
        type: 'assistant',
        timestamp: new Date().toISOString(),
        transaction_id: txn_id,
        sources: response.sources || {}, // Reference sources
        extras: response.extras || {}, // Additional data
      });
    }

    // // Replace with your actual backend API endpoint
    // const response = await axios.post('http://localhost:3001/api/chat', {
    //   message_content: messageContent,
    //   message_id: messageId,
    //   transaction_id: txn_id,
    //   user_id: user_id,
    //   extra: {}, // Additional metadata
    // });

    // // Add AI response to the store
    // if (response.data && response.data.ai_response) {
    //   const aiMessageId = uuidv4();
    //   chatStore.addMessage({
    //     messageId: aiMessageId,
    //     message: response.data.ai_response,
    //     type: 'assistant',
    //     timestamp: new Date().toISOString(),
    //     transaction_id: txn_id,
    //     sources: response.data.sources || {}, // Reference sources
    //     extras: response.data.extras || {}, // Additional data
    //   });
    // }    

  } catch (error) {
    console.error("Error sending message:", error);
    // Optionally, add an error message to the chat
    const errorMessageId = uuidv4();
    chatStore.addMessage({
      messageId: errorMessageId,
      message: "Sorry, something went wrong. Please try again.",
      type: 'assistant',
      timestamp: new Date().toISOString(),
      transaction_id: txn_id,
      sources: {},
      extras: {},
    });
  } finally {
    isStreaming.value = false;
    scrollToBottom();
  }
};

/**
 * Cancels the ongoing message streaming.
 */
const cancelStreaming = () => {
  isStreaming.value = false;
  // Implement cancellation logic if applicable
};

/**
 * Handles feedback events from AI messages.
 * @param {string} type - The type of feedback (e.g., 'positive', 'negative').
 * @param {string} messageId - The ID of the message being fed back on.
 */
const handleFeedback = (type, messageId) => {
  console.log(`Feedback received: ${type} for message ID: ${messageId}`);
  // Implement feedback handling logic (e.g., send to backend)
};

/**
 * Edits a user's message.
 * @param {string} messageId - The ID of the message to edit.
 * @param {string} newContent - The new content for the message.
 */
 const editMessage = (messageId, newContent) => {
  const message = chatStore.completeMessageMap.value[messageId];
  if (message) {
    chatStore.completeMessageMap.value[messageId].message = newContent;
    console.log(`Message edited: ${messageId}`, newContent);
    // Optionally, persist the change or notify the backend
  }
};;

/**
 * Shows documents or additional information related to a message.
 * @param {string} messageId - The ID of the message.
 */
const showDocuments = (messageId) => {
  console.log(`Show documents for message ID: ${messageId}`);
  // Implement document display logic
};

/**
 * Handles the selection of a chat session.
 * @param {string} sessionId - The ID of the selected chat session.
 */
const handleSelectSession = (sessionId) => {
  chatStore.setActiveChatSession(sessionId);
  // Navigate to the selected chat
  router.push({ query: { chatId: sessionId } });
};

/**
 * Initializes a new chat session.
 */
const initializeNewChat = () => {
  const newSessionId = uuidv4();
  const newSession = {
    id: newSessionId,
    date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
    lastMessageTimestamp: null,
    lastMessage: '',
    persona_id: null, // Assign a persona if applicable
    sharedStatus: 'Private',
    // Add other necessary properties
  };
  chatStore.addChatSession(newSession);
  chatStore.setActiveChatSession(newSession.id);
  router.push({ query: { chatId: newSession.id } });
};

/**
 * Mock backend request function to simulate AI response.
 * @param {object} payload - The data sent to the backend.
 * @returns {Promise<object>} The simulated backend response.
 */
const mockBackendRequest = (payload) => {
  // Simulate network delay and response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ai_response: `Echo: ${payload.message_content}`,
        response_id: uuidv4(),
        transaction_id: payload.transaction_id,
        sources: {}, // Populate with reference sources as needed
        extras: {}, // Additional data
      });
    }, 1500); // 1.5 seconds delay
  });
};

/**
 * Scrolls the chat area to the bottom to show the latest message.
 */
const scrollToBottom = () => {
  if (chatArea.value) {
    chatArea.value.scrollTop = chatArea.value.scrollHeight;
  }
};

// Watch for changes in messageHistory to auto-scroll
watch(messageHistory, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

// Set activeChatSessionId based on the route on mount
onMounted(() => {
  if (selectedChatSession.value) {
    chatStore.setActiveChatSession(selectedChatSession.value.id);
  }

  if (!route.query.chatId && chatStore.activeChatSessionId) {
    router.replace({ query: { chatId: chatStore.activeChatSessionId } });
  }
});
</script>

<style scoped>
/* Loader Styles (if using CSS loader) */
/* Remove if using vue3-spinner */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.message-content {
  white-space: pre-wrap;
}

/* Optionally, add different styles for user and AI messages */
.bg-blue-500 {
  /* User messages */
}

.bg-gray-300 {
  /* AI messages */
}
</style>
