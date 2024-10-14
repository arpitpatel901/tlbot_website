<!-- src/components/chat/UserMessage.vue -->
<template>
  <div :class="messageClasses">
    <div class="flex items-center space-x-2 mb-1">
      <img
        :src="senderAvatar"
        alt="Sender Avatar"
        class="h-6 w-6 rounded-full object-cover"
      />
      <span class="font-semibold text-gray-700">{{ senderName }}</span>
      <span class="text-xs text-gray-500 ml-auto">{{
        formattedTimestamp
      }}</span>
    </div>
    <div class="message-content">
      <div v-if="users && users.length">
        {{ message.content }}
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
const { users, user } = storeToRefs(userStore);

// Debugging Logs
console.log("UserStore:", userStore);
console.log("UserStore Users:", users.value);
console.log("UserStore User:", user.value);
console.log("Message UserId:", props.message.userId);

// Determine if the message is from the current user
const isCurrentUser = computed(() => {
  return props.message.userId === (user.value?.id || "");
});

// Compute the sender's details
const sender = computed(() => {
  if (isCurrentUser.value) {
    return (
      user.value || {
        name: "Unknown",
        avatar: "https://via.placeholder.com/150",
      }
    );
  }

  if (!users.value || !Array.isArray(users.value)) {
    console.warn("userStore.users.value is not defined or not an array");
    return { name: "Unknown", avatar: "https://via.placeholder.com/150" };
  }

  const messageUserId = props.message.userId;
  const otherUser = users.value.find((u) => u.id === messageUserId);

  console.log("Found user:", otherUser);

  return (
    otherUser || { name: "Unknown", avatar: "https://via.placeholder.com/150" }
  );
});

// Compute sender's name and avatar
const senderName = computed(() => sender.value.name);
const senderAvatar = computed(
  () => sender.value.avatar || "https://via.placeholder.com/150"
);

// Define message styling based on the sender
const messageClasses = computed(() => {
  return [
    "max-w-md px-4 py-2 rounded-lg shadow",
    isCurrentUser.value
      ? "bg-primary-100 text-gray-800 self-end"
      : "bg-gray-100 text-gray-800 self-start",
  ];
});

// Format the timestamp
const formattedTimestamp = computed(() => {
  const date = new Date(props.message.createdAt);
  if (isNaN(date)) return "";
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
