<!-- src/components/chat/ChatSideBar.vue -->
<template>
  <div class="w-1/4 border-r p-4 overflow-auto flex flex-col">
    <!-- Header with Channels title and New Channel button -->
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-lg font-semibold text-black">Channels</h4>
      <button
        @click="openCreateChannelModal"
        class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        aria-label="Create a new channel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>

    <!-- Channels List -->
    <ul class="flex-1 overflow-y-auto">
      <li
        v-for="channel in channels"
        :key="channel._id"
        :class="[
          'p-2 mb-2 rounded cursor-pointer flex justify-between items-center',
          activeChannelId === channel._id ? 'bg-blue-100' : 'hover:bg-gray-100',
        ]"
        @click="selectChannel(channel._id)"
      >
        <span class="text-black"> # {{ channel.name }} </span>
      </li>
    </ul>

    <!-- Create Channel Modal -->
    <CreateChannelModal
      v-if="isCreateChannelModalOpen"
      @close="closeCreateChannelModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import CreateChannelModal from "./CreateChannelModal.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const channels = computed(() => userStore.channels);
const activeChannelId = computed(() => userStore.activeChannelId);

const selectChannel = (channelId) => {
  console.log(`ChatSideBar.vue: Selected channel ID: ${channelId}`);
  userStore.setActiveChannel(channelId);
  userStore.fetchMessages(channelId); // Fetch the messages for the selected channel

  // Navigate to the Chat route with channelId as a route param
  router.push({ name: "Chat", params: { channelId } });
};

const isCreateChannelModalOpen = ref(false);

const openCreateChannelModal = () => {
  console.log("ChatSideBar.vue: Create Channel button clicked");
  isCreateChannelModalOpen.value = true;
};

const closeCreateChannelModal = () => {
  isCreateChannelModalOpen.value = false;
};
</script>

<style scoped>
/* Ensure the text color is black */
input,
textarea {
  color: black;
}

/* Optional: Add any specific styles here */
</style>
