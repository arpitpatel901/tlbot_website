<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      class="fixed inset-y-0 left-0 z-50 md:static md:translate-x-0"
    >
      <div class="flex flex-col h-full">
        <!-- Use relative paths here -->
        <router-link
          :to="{ name: 'ConnectDataSources' }"
          class="flex items-center px-4 py-2 text-gray-800 rounded hover:bg-gray-200"
          active-class="bg-gray-200 font-semibold"
          @click="closeSidebar"
        >
          <DatabaseIcon class="h-5 w-5 mr-3 text-gray-800" />
          Connect Data Sources
        </router-link>
        <router-link
          :to="{ name: 'Chat' }"
          class="flex items-center px-4 py-2 text-gray-800 rounded hover:bg-gray-200"
          active-class="bg-gray-200 font-semibold"
          @click="closeSidebar"
        >
          <ChatBubbleLeftRightIcon class="h-5 w-5 mr-3 text-gray-800" />
          Chat
        </router-link>
        <router-link
        :to="{ name: 'AccountSettings' }"
          class="flex items-center px-4 py-2 text-gray-800 rounded hover:bg-gray-200"
          active-class="bg-gray-200 font-semibold"
          @click="closeSidebar"
        >
          <Cog6ToothIcon class="h-5 w-5 mr-3 text-gray-800" />
          Account Settings
        </router-link>
        <button
          @click="logout"
          class="flex items-center w-full text-left px-4 py-2 text-gray-800 rounded hover:bg-gray-200"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3 text-gray-800" />
          Logout
        </button>
      </div>
    </aside>
    
    <!-- Overlay for small screens when sidebar is open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
      @click="closeSidebar"
    ></div>
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="flex justify-between items-center p-4 bg-white shadow-md">
        <!-- Sidebar Toggle Button for Small Screens -->
        <button
          @click="toggleSidebar"
          class="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
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
        
        <!-- User Name Display -->
        <span class="text-gray-700 font-medium">{{ userName }}</span>
      </header>
      
      <!-- Content -->
      <main class="flex-1 overflow-auto p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { ChatBubbleLeftRightIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import DatabaseIcon from '@/components/DatabaseIcon.vue';

export default {
  name: 'MainDashboard',
  components: {
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    DatabaseIcon,
    ArrowRightOnRectangleIcon,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const isSidebarOpen = ref(false);

    const logout = () => {
      userStore.clearUser();
      router.push('/');
    };

    const userName = computed(() => userStore.user?.name || 'User');

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    return {
      logout,
      userName,
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    };
  },
};
</script>

<style scoped>
.main-dashboard {
  padding: 20px;
  text-align: center;
}

.main-dashboard h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.main-dashboard p {
  font-size: 18px;
  color: #34495e;
}
</style>
