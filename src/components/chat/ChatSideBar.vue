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
    <div class="flex-1 overflow-y-auto">
      <ul>
        <li
          v-for="channel in channels"
          :key="channel.id"
          class="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
        >
          <span @click="selectChannel(channel.id)" class="flex-1">{{
            channel.name
          }}</span>
          <div class="relative">
            <!-- Three Dots Button -->
            <button
              @click.stop="toggleChannelMenu(channel.id)"
              class="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Channel options"
            >
              <!-- Three Dots Icon -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="activeChannelMenu === channel.id"
              @click.stop
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            >
              <!-- Non-Admin User Options -->
              <div v-if="!isAdmin">
                <a
                  @click="viewChannelDetails(channel)"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Details
                </a>
              </div>

              <!-- Admin User Options -->
              <div v-if="isAdmin">
                <a
                  @click="viewChannelDetails(channel)"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Details
                </a>
                <a
                  @click="toggleArchiveChannel(channel)"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {{ channel.archived ? "Unarchive" : "Archive" }}
                </a>
                <a
                  @click="deleteChannel(channel.id)"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

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
          @click="isSettingsMenuOpen = false"
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
import axios from "axios";

const userStore = useUserStore();
const router = useRouter();
const channels = computed(() => userStore.channels);
const activeChannelId = computed(() => userStore.activeChannelId);
const organizationName = computed(
  () => userStore.user?.organizationId?.name || "Organization"
);
const users = computed(() => userStore.users);
const isAdmin = computed(() => userStore.user.value?.role === "admin");

// Comprehensive Logging
console.log("userStore.user.value:", userStore.user.value);
console.log("User is Admin:", isAdmin.value);

const selectChannel = (channelId) => {
  userStore.setActiveChannel(channelId);
  router.push({ name: "Chat", params: { channelId } });
};

// Three-Dot Menu State
const activeChannelMenu = ref(null);

// Toggle the channel-specific dropdown menu
const toggleChannelMenu = (channelId) => {
  if (activeChannelMenu.value === channelId) {
    activeChannelMenu.value = null;
  } else {
    activeChannelMenu.value = channelId;
  }
};

// Delete Channel (Admin Only)
const deleteChannel = async (channelId) => {
  if (
    !confirm(
      "Are you sure you want to delete this channel? This action cannot be undone."
    )
  )
    return;
  try {
    await axios.delete(`/api/channels/${channelId}`);
    // Refresh channels list
    await userStore.fetchChannels();
    // If the deleted channel was active, reset activeChannelId
    if (userStore.activeChannelId === channelId) {
      userStore.setActiveChannel(null);
    }
    alert("Channel deleted successfully.");
  } catch (error) {
    console.error("Error deleting channel:", error);
    alert("Failed to delete channel.");
  }
};

// Archive/Unarchive Channel (Admin Only)
const toggleArchiveChannel = async (channel) => {
  try {
    await axios.patch(`/api/channels/${channel.id}/archive`, {
      archived: !channel.archived,
    });
    // Refresh channels list
    await userStore.fetchChannels();
    alert(
      `Channel ${channel.archived ? "archived" : "unarchived"} successfully.`
    );
  } catch (error) {
    console.error("Error archiving/unarchiving channel:", error);
    alert("Failed to archive/unarchive channel.");
  }
};

// View Channel Details (Non-Admin)
const viewChannelDetails = (channel) => {
  // Close the dropdown menu before showing the alert
  activeChannelMenu.value = null;

  // Implement details view as needed
  // For example, open a modal with channel information
  alert(
    `Channel Details:\nName: ${channel.name}\nDescription: ${
      channel.description || "N/A"
    }`
  );
};

// Sidebar and Settings Menu States
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
/* Optional: Customize scrollbar appearance */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  border: 2px solid #f1f1f1;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
