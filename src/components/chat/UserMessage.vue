<!-- src/components/chat/UserMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="flex items-center space-x-2">
      <img
        :src="senderAvatar"
        alt="Sender Avatar"
        class="h-6 w-6 rounded-full object-cover"
      />
      <span class="font-semibold text-gray-700">{{ senderName }}</span>
    </div>
    <div class="message-content">
      {{ message.content }}
    </div>
    <!-- Optional: Display Timestamp -->
    <div class="text-xs text-gray-500 mt-1">
      {{ formattedTimestamp }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();

// Determine if the message is from the current user
const isCurrentUser = computed(
  () => props.message.userId === userStore.user._id
);

// Compute the sender's name
const senderName = computed(() => {
  return isCurrentUser.value ? "You" : "Other User";
});

// Compute the sender's avatar
const senderAvatar = computed(() => {
  return isCurrentUser.value
    ? userStore.user.avatar || "https://via.placeholder.com/150"
    : "https://via.placeholder.com/150"; // Placeholder for other users
});

// Define message styling based on the sender
const messageClasses = computed(() => {
  return [
    "max-w-md px-4 py-2 rounded-lg",
    isCurrentUser.value
      ? "bg-primary-100 text-gray-800 self-end"
      : "bg-gray-100 text-gray-800 self-start",
  ];
});

// Optional: Format the timestamp correctly
const formattedTimestamp = computed(() => {
  const date = new Date(props.message.createdAt);
  if (isNaN(date)) return "Invalid Date";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});
</script>

<style scoped>
.message-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 1rem;
}
</style>
