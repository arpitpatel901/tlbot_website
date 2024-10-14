<!-- src/components/MainDashboard.vue -->
<!-- src/components/MainDashboard.vue -->
<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <ChatSideBar />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="flex justify-between items-center p-4 bg-white shadow-sm">
        <!-- Logo or App Name -->
        <div class="flex items-center space-x-2">
          <!-- Placeholder for Logo -->
          <span class="text-2xl font-bold text-gray-800">MyChatApp</span>
        </div>

        <!-- User Dropdown Menu -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center space-x-2 focus:outline-none"
          >
            <img
              :src="userAvatar"
              alt="User Avatar"
              class="h-8 w-8 rounded-full object-cover"
            />
            <span class="text-gray-700 font-medium hidden md:block">{{
              userName
            }}</span>
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
          <!-- User Menu -->
          <div
            v-if="isUserMenuOpen"
            @click.away="isUserMenuOpen = false"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20"
          >
            <a
              @click="navigateToAccountSettings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Account Settings
            </a>
            <a
              @click="logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-auto p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import ChatSideBar from "@/components/chat/ChatSideBar.vue";

export default {
  name: "MainDashboard",
  components: {
    ChatSideBar,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const isUserMenuOpen = ref(false);

    const logout = async () => {
      await userStore.logout();
      router.push({ name: "HomeRedirect" });
    };

    const navigateToAccountSettings = () => {
      router.push({ name: "AccountSettings" });
    };

    const userName = computed(() => userStore.user?.name || "User");
    const userAvatar = computed(
      () => userStore.user?.avatar || "https://via.placeholder.com/150"
    );

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    };

    return {
      logout,
      navigateToAccountSettings,
      userName,
      userAvatar,
      isUserMenuOpen,
      toggleUserMenu,
    };
  },
};
</script>

<style scoped>
/* Ensure the text color is black */
/* input,
textarea {
  color: black;
} */

/* Ensure the main content area doesn't get hidden under the fixed sidebar */
/* @media (min-width: 768px) {
  aside {
    position: static;
  }
} */

/* Optional: Add smooth transition for the sidebar */
/* aside {
  transition: transform 0.3s ease-in-out;
} */
</style>
