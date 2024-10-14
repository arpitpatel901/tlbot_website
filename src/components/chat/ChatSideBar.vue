<!-- src/components/chat/ChatSideBar.vue -->
<template>
  <aside class="w-64 bg-white border-r flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-4 border-b">
      <h2 class="text-xl font-semibold text-gray-800">Channels</h2>
      <button
        @click="openCreateChannelModal"
        class="text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Create a new channel"
      >
        <!-- Plus Icon -->
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Channels List -->
    <nav class="flex-1 overflow-y-auto">
      <ul>
        <li
          v-for="channel in channels"
          :key="channel.id"
          @click="selectChannel(channel.id)"
          :class="[
            'flex items-center px-4 py-2 cursor-pointer',
            activeChannelId === channel.id
              ? 'bg-gray-200'
              : 'hover:bg-gray-100',
          ]"
        >
          <span class="text-gray-700"># {{ channel.name }}</span>
        </li>
      </ul>
    </nav>

    <!-- Footer with Dropdown Menu -->
    <div class="px-4 py-4 border-t">
      <div class="relative">
        <button
          @click="toggleSettingsMenu"
          class="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          <span class="text-gray-700">Settings</span>
          <!-- Dropdown Icon -->
          <svg
            class="h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <!-- Settings Menu -->
        <div
          v-if="isSettingsMenuOpen"
          @click.away="isSettingsMenuOpen = false"
          class="absolute bottom-14 left-4 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20"
        >
          <a
            @click="navigateToDataConnectors"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Data Connectors
          </a>
          <a
            @click="logout"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </a>
        </div>
      </div>
    </div>

    <!-- Create Channel Modal -->
    <CreateChannelModal
      v-if="isCreateChannelModalOpen"
      @close="closeCreateChannelModal"
    />
  </aside>
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
const organizationName = computed(
  () => userStore.user?.organizationId?.name || "Organization"
);

const selectChannel = (channelId) => {
  userStore.setActiveChannel(channelId);
  router.push({ name: "Chat", params: { channelId } });
};
const users = computed(() => userStore.users);

const isCreateChannelModalOpen = ref(false);
const isSettingsMenuOpen = ref(false);

const openCreateChannelModal = () => {
  isCreateChannelModalOpen.value = true;
};

const closeCreateChannelModal = () => {
  isCreateChannelModalOpen.value = false;
};

const toggleSettingsMenu = () => {
  isSettingsMenuOpen.value = !isSettingsMenuOpen.value;
};

const logout = async () => {
  await userStore.logout();
  router.push({ name: "HomeRedirect" });
};

const navigateToDataConnectors = () => {
  router.push({ name: "ConnectDataSources" });
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
