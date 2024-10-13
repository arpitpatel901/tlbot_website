<!-- src/components/MainDashboard.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <ChatSideBar />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="flex justify-between items-center p-4 bg-white shadow-md">
        <!-- Sidebar Toggle Button for Small Screens -->
        <button
          @click="toggleSidebar"
          class="text-indigo-600 hover:text-indigo-800 focus:outline-none md:hidden"
          aria-label="Toggle sidebar"
        >
          <!-- Hamburger Icon -->
          <svg
            class="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!isSidebarOpen"
              fill-rule="evenodd"
              d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
              clip-rule="evenodd"
            />
            <path
              v-else
              fill-rule="evenodd"
              d="M6 18L18 6M6 6l12 12"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- User Profile -->
        <div class="flex items-center space-x-4">
          <span class="text-gray-700 font-medium">{{ userName }}</span>
          <div class="relative">
            <button class="focus:outline-none">
              <img
                :src="userAvatar"
                alt="User Avatar"
                class="h-8 w-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-auto">
        <!-- Render child routes here -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import DatabaseIcon from "@/components/DatabaseIcon.vue";
import ChatSideBar from "@/components/chat/ChatSideBar.vue";

export default {
  name: "MainDashboard",
  components: {
    ChatSideBar, // Register the ChatSideBar component
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    DatabaseIcon,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const isSidebarOpen = ref(false);

    // Initialize user data when the component is mounted
    onMounted(() => {
      userStore.initializeUser();
      console.log("MainDashboard: User Store State:", userStore.$state);
    });

    const logout = async () => {
      await userStore.logout();
      router.push({ name: "Home" }); // Changed to 'Home' to match route name
    };

    const userName = computed(() => userStore.user?.name || "User");
    const userAvatar = computed(
      () => userStore.user?.avatar || "https://via.placeholder.com/150"
    );

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
      console.log("MainDashboard: Toggling sidebar to", isSidebarOpen.value);
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
      console.log("MainDashboard: Closing sidebar");
    };

    // Chat Sessions from the store
    const chatSessions = computed(() => userStore.chatSessions || []);
    const activeChatSessionId = computed(() => userStore.activeChatSessionId);

    /**
     * Handles the selection of a chat session.
     * @param {string} sessionId - The ID of the selected chat session.
     */
    const handleSelectSession = (sessionId) => {
      console.log(`MainDashboard: Selecting chat session ID: ${sessionId}`);
      userStore.setActiveChatSession(sessionId);
      console.log(
        `MainDashboard: activeChatSessionId is now: ${userStore.activeChatSessionId}`
      );
      // Navigate to the Chat route
      router.push({ name: "Chat", params: { channelId: sessionId } }); // Ensure channelId matches route
      closeSidebar();
    };

    /**
     * Initializes a new chat session.
     */
    const initializeNewChat = () => {
      userStore.initializeNewChat();
      const newSessionId = userStore.activeChatSessionId;
      console.log(
        `MainDashboard: Initialized new chat session with ID: ${newSessionId}`
      );
      router.push({ name: "Chat", params: { channelId: newSessionId } }); // Ensure channelId matches route
      closeSidebar();
    };

    return {
      logout,
      userName,
      userAvatar,
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      chatSessions,
      activeChatSessionId,
      handleSelectSession,
      initializeNewChat,
    };
  },
};
</script>

<style scoped>
/* Ensure the text color is black */
input,
textarea {
  color: black;
}

/* Ensure the main content area doesn't get hidden under the fixed sidebar */
@media (min-width: 768px) {
  aside {
    position: static;
  }
}

/* Optional: Add smooth transition for the sidebar */
aside {
  transition: transform 0.3s ease-in-out;
}
</style>
