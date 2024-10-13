<!-- src/components/chat/Chat.vue -->
<template>
  <div class="flex flex-col h-full">
    <!-- Messages Area -->
    <div class="flex-1 p-2 sm:p-4 overflow-y-auto" ref="chatArea">
      <!-- Error Message -->
      <div v-if="error" class="text-red-500 text-center mb-4">
        {{ errorMessage }}
      </div>

      <!-- Messages List -->
      <div v-if="messages.length > 0" class="space-y-4">
        <template v-for="message in messages" :key="message._id">
          <UserMessage :message="message" />
        </template>
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
import { defineProps } from "vue";

// Correctly import components as default imports
import UserMessage from "@/components/chat/UserMessage.vue";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatIntro from "@/components/chat/ChatIntro.vue";
import { ThreeDots } from "vue3-spinner"; // Ensure this package is installed

// Define the props
const props = defineProps({
  channelId: {
    type: String,
    required: true,
  },
});

// Initialize Stores
const userStore = useUserStore();

console.log("Chat.vue component loaded with channelId:", props.channelId);

// Reactive State
const newMessage = ref("");
const isStreaming = ref(false);
const error = ref(false);
const errorMessage = ref("");

// Reference to the chat area for scrolling
const chatArea = ref(null);

// Computed Properties
const messages = computed(() => {
  console.log("Chat.vue: Messages updated:", userStore.messages);
  return userStore.messages;
});

// Set active channel and fetch messages on mount and when channelId changes
watch(
  () => props.channelId,
  async (newChannelId) => {
    if (newChannelId) {
      console.log("Chat.vue: Setting active channel to:", newChannelId);
      try {
        await userStore.setActiveChannel(newChannelId);
        error.value = false;
      } catch (err) {
        console.error("Chat.vue: Error setting active channel:", err);
        error.value = true;
        errorMessage.value = "Failed to load channel. Please try again later.";
      }
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
  try {
    await userStore.sendMessage(messageContent);
    error.value = false;
  } catch (err) {
    console.error("Chat.vue: Error sending message:", err);
    error.value = true;
    errorMessage.value = "Failed to send message. Please try again.";
  }

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
