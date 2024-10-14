<!-- src/components/chat/Chat.vue -->
<template>
  <div class="flex flex-col h-full">
    <!-- Messages Area -->
    <div class="flex-1 p-4 overflow-y-auto" ref="chatArea">
      <!-- Error Message -->
      <div v-if="error" class="text-red-500 text-center mb-4">
        {{ errorMessage }}
      </div>

      <!-- Messages List -->
      <div v-if="messages.length > 0" class="space-y-4">
        <template v-for="message in messages" :key="message.id">
          <UserMessage :message="message" />
        </template>
      </div>
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        <ChatIntro />
      </div>
    </div>

    <!-- Message Input -->
    <footer class="p-4 bg-white border-t">
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

import UserMessage from "@/components/chat/UserMessage.vue";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatIntro from "@/components/chat/ChatIntro.vue";

const props = defineProps({
  channelId: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();

const newMessage = ref("");
const isStreaming = ref(false);
const error = ref(false);
const errorMessage = ref("");

const chatArea = ref(null);

const messages = computed(() => userStore.messages);

watch(
  () => props.channelId,
  async (newChannelId) => {
    if (newChannelId) {
      try {
        await userStore.setActiveChannel(newChannelId);
        error.value = false;
      } catch (err) {
        error.value = true;
        errorMessage.value = "Failed to load channel. Please try again later.";
      }
    }
  },
  { immediate: true }
);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageContent = newMessage.value.trim();
  try {
    await userStore.sendMessage(messageContent);
    error.value = false;
  } catch (err) {
    error.value = true;
    errorMessage.value = "Failed to send message. Please try again.";
  }

  newMessage.value = "";
  isStreaming.value = true;

  scrollToBottom();

  setTimeout(() => {
    isStreaming.value = false;
    scrollToBottom();
  }, 500);
};

const scrollToBottom = () => {
  if (chatArea.value) {
    chatArea.value.scrollTop = chatArea.value.scrollHeight;
  }
};

// Automatically scroll to bottom when new messages arrive
watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
