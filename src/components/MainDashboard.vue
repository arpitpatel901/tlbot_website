<!-- src/components/MainDashboard.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:z-auto md:shadow-none',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between p-4 bg-indigo-600">
          <h2 class="text-lg font-semibold text-white">Dashboard</h2>
          <button
            @click="closeSidebar"
            class="text-white md:hidden focus:outline-none"
            aria-label="Close sidebar"
          >
            <!-- Close Icon -->
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Sidebar Navigation -->
        <nav class="flex-1 px-2 py-4 space-y-1 bg-white">
          <router-link
            :to="{ name: 'ConnectDataSources' }"
            class="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-indigo-50 transition-colors duration-200"
            active-class="bg-indigo-100 font-semibold"
            @click="closeSidebar"
          >
            <DatabaseIcon class="h-5 w-5 mr-3 text-indigo-600" />
            Connect Data Sources
          </router-link>
          <router-link
            :to="{ name: 'Chat' }"
            class="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-indigo-50 transition-colors duration-200"
            active-class="bg-indigo-100 font-semibold"
            @click="closeSidebar"
          >
            <ChatBubbleLeftRightIcon class="h-5 w-5 mr-3 text-indigo-600" />
            Chat
          </router-link>
          <router-link
            :to="{ name: 'AccountSettings' }"
            class="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-indigo-50 transition-colors duration-200"
            active-class="bg-indigo-100 font-semibold"
            @click="closeSidebar"
          >
            <Cog6ToothIcon class="h-5 w-5 mr-3 text-indigo-600" />
            Account Settings
          </router-link>
          <button
            @click="logout"
            class="flex items-center w-full text-left px-4 py-2 text-gray-700 rounded hover:bg-indigo-50 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3 text-indigo-600" />
            Logout
          </button>
        </nav>

        <!-- Horizontal Separator -->
        <hr class="my-2 border-gray-300" />

        <!-- Chat Sessions Section -->
        <div class="px-2 py-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-700 font-semibold">Chat Sessions</span>
            <button
              @click="initializeNewChat"
              class="text-indigo-600 hover:text-indigo-800 focus:outline-none"
              aria-label="Start New Chat"
            >
              <!-- Plus Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
          <ul class="space-y-1">
            <li v-for="session in chatSessions" :key="session.id">
              <button
                @click="handleSelectSession(session.id)"
                :class="[
                  'flex items-center w-full px-2 py-1 text-left rounded transition-colors duration-200',
                  activeChatSessionId === session.id
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'text-gray-600 hover:bg-indigo-50',
                ]"
              >
                <!-- Chat Session Icon -->
                <ChatBubbleLeftRightIcon class="h-4 w-4 mr-2 text-indigo-600" />
                <span class="truncate">{{
                  session.lastMessage || "New Chat"
                }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Overlay for small screens when sidebar is open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
      @click="closeSidebar"
    ></div>

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
            <!-- Dropdown Menu (Optional) -->
            <!-- You can implement a dropdown menu here if needed -->
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-auto">
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

export default {
  name: "MainDashboard",
  components: {
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
      router.push({ name: "Login" });
    };

    const userName = computed(() => userStore.user?.name || "User");
    const userAvatar = computed(
      () => userStore.user?.avatar || "https://via.placeholder.com/150"
    );

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
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
      // Navigate to the selected chat
      router.push({ name: "Chat", query: { chatId: sessionId } });
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
      router.push({ name: "Chat", query: { chatId: newSessionId } });
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
