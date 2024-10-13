<!-- src/components/chat/Chat.vue -->
<template>
  <div class="flex flex-col h-full">
    <!-- Messages Area -->
    <div class="flex-1 p-2 sm:p-4 overflow-y-auto" ref="chatArea">
      <!-- Messages List -->
      <div v-if="messages.length > 0" class="space-y-4">
        <template v-for="message in messages" :key="message._id">
          <UserMessage :message="message" />
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
        <ChatIntro />
      </div>
    </div>

    <!-- Message Input -->
    <footer class="p-2 sm:p-4 bg-white border-t">
      <ChatInputBar
        v-model="newMessage"
        :isStreaming="isStreaming"
        :disabled="!userStore.activeChannelId || isStreaming"
        @send="sendMessage"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";

// Correctly import components as default imports
import UserMessage from "@/components/chat/UserMessage.vue";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatIntro from "@/components/chat/ChatIntro.vue";
import { ThreeDots } from "vue3-spinner"; // Ensure this package is installed

// Initialize Stores
const userStore = useUserStore();
const route = useRoute();

// Reactive State
const newMessage = ref("");
const isStreaming = ref(false);

// Reference to the chat area for scrolling
const chatArea = ref(null);

// Computed Properties
const messages = computed(() => {
  console.log("Chat.vue: Messages updated:", userStore.messages);
  return userStore.messages;
});

// Debug logs when Chat component is loaded
console.log("Chat.vue component loaded");

// Watch for route changes to update the active channel
watch(
  () => route.params.channelId,
  (newChannelId) => {
    if (newChannelId) {
      console.log("Chat.vue: Route changed to channel:", newChannelId);
      userStore.setActiveChannel(newChannelId);
      userStore.fetchMessages(newChannelId);
    }
  },
  { immediate: true }
);

// Functions

/**
 * Sends a message from the user.
 */
const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    console.log("Chat.vue: Cannot send an empty message");
    return;
  }

  const messageContent = newMessage.value.trim();
  console.log("Chat.vue: Sending message:", messageContent);
  await userStore.sendMessage(messageContent);

  // Clear the input and set loading
  newMessage.value = "";
  isStreaming.value = true;

  // Scroll to bottom
  scrollToBottom();

  // Simulate sending delay
  setTimeout(() => {
    isStreaming.value = false;
    scrollToBottom();
  }, 500);
};

/**
 * Scrolls the chat area to the bottom to show the latest message.
 */
const scrollToBottom = () => {
  if (chatArea.value) {
    console.log("Chat.vue: Scrolling to bottom");
    chatArea.value.scrollTop = chatArea.value.scrollHeight;
  }
};

// Watch for changes in messages to auto-scroll
watch(messages, () => {
  console.log("Chat.vue: Messages changed, triggering scroll");
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
