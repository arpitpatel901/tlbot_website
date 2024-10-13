<!-- src/components/chat/Chat.vue -->
<template>
  <div class="flex flex-col h-full">
    <!-- Messages Area -->
    <div class="flex-1 p-2 sm:p-4 overflow-y-auto" ref="chatArea">
      <!-- Messages List -->
      <div v-if="messageHistory.length > 0" class="space-y-4">
        <template
          v-for="(message, index) in messageHistory"
          :key="message.messageId"
        >
          <AssistantMessage
            v-if="message.type === 'assistant'"
            :message="message"
            @feedback="handleFeedback"
            @showDocs="showDocuments"
          />
          <UserMessage v-else-if="message.type === 'user'" :message="message" />
          <div v-else class="p-2 bg-red-100 text-black rounded shadow">
            Unknown message type.
          </div>
        </template>
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
    <footer class="p-2 sm:p-4 bg-white border-t">
      <ChatInputBar
        v-model="newMessage"
        :isStreaming="isStreaming"
        :disabled="!selectedChatSession || isStreaming"
        @send="sendMessage"
        @cancel="cancelStreaming"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";

// Import Components
import AssistantMessage from "@/components/chat/AssistantMessage.vue";
import UserMessage from "@/components/chat/UserMessage.vue";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatIntro from "@/components/chat/ChatIntro.vue";
import { ThreeDots } from "vue3-spinner";

// Import uuidv4
import { v4 as uuidv4 } from "uuid";

const finalAvailableSources = ref([]);
const filteredAssistants = ref([]);
const selectedPersona = ref(null);

// Initialize Stores
const userStore = useUserStore();

// Router Setup
const router = useRouter();
const route = useRoute();

// Reactive State
const newMessage = ref("");
const isStreaming = ref(false);

// Reference to the chat area for scrolling
const chatArea = ref(null);

// Synchronize store's activeChatSessionId with route's chatId
const syncChatSession = () => {
  const chatId = route.query.chatId;
  if (chatId) {
    const sessionExists = userStore.chatSessions.some(
      (session) => session.id === chatId
    );
    if (sessionExists) {
      userStore.setActiveChatSession(chatId);
    } else {
      // If the chat session doesn't exist, create it
      userStore.initializeNewChat(chatId);
    }
  } else {
    // If no chatId is provided, create a new chat session
    userStore.initializeNewChat();
    router.replace({
      name: "Chat",
      query: { chatId: userStore.activeChatSessionId },
    });
  }
};

// Call syncChatSession on mount
onMounted(() => {
  syncChatSession();
});

// Watch for changes in route's chatId
watch(
  () => route.query.chatId,
  (newChatId) => {
    syncChatSession();
  }
);

// Computed Properties
const selectedChatSession = computed(() => {
  // const chatId = userStore.activeChatSessionId;
  const chatId = route.query.chatId;
  const session =
    userStore.chatSessions.find((session) => session.id === chatId) || null;
  console.log("Computed selectedChatSession:", session);
  return session;
});

const messageHistory = computed(() => {
  const session = selectedChatSession.value;
  console.log("Session is :", session);
  if (!session) return [];

  // Retrieve messages array from the session
  const messages = session.messages || [];
  console.log("Computed messageHistory:", messages);
  return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
});

// Functions

/**
 * Sends a message from the user and handles the AI response.
 */
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageContent = newMessage.value.trim();
  const txn_id = selectedChatSession.value?.id;
  const user_id = userStore.user?.id || "unknown_user"; // Handle undefined user_id

  if (!txn_id) {
    console.error("Cannot send message: No active chat session.");
    return;
  }

  // Add user's message to the store
  userStore.addMessageToSession(txn_id, messageContent, "user");

  // Clear the input and set loading
  newMessage.value = "";
  isStreaming.value = true;

  // Scroll to bottom
  scrollToBottom();

  try {
    // Mock backend request (replace with actual API call)
    const response = await mockBackendRequest({
      message_content: messageContent,
      transaction_id: txn_id,
      user_id: user_id,
      extra: {}, // Additional metadata
    });

    // Add AI response to the store
    if (response && response.ai_response) {
      userStore.addMessageToSession(txn_id, response.ai_response, "assistant");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    userStore.addMessageToSession(
      txn_id,
      "Sorry, something went wrong. Please try again.",
      "assistant"
    );
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
 * Shows documents or additional information related to a message.
 * @param {string} messageId - The ID of the message.
 */
const showDocuments = (messageId) => {
  console.log(`Show documents for message ID: ${messageId}`);
  // Implement document display logic
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
</script>

<style scoped>
/* Ensure the chat area occupies the full height on mobile */
@media (max-width: 767px) {
  .flex-1 {
    height: calc(100vh - 64px); /* Adjust based on header/footer height */
  }
}

/* Adjust padding for mobile */
@media (max-width: 639px) {
  .p-2 {
    padding: 0.5rem;
  }
}
</style>
