<!-- src/components/Navbar.vue -->
<template>
  <nav class="relative container mx-auto p-6">
    <!-- Flex container -->
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="pt-4">
        <a href="/">
          <img src="./../assets/logo_manage.svg" alt="Manage Logo" />
        </a>
      </div>

      <!-- Menu Items for Medium and Larger Screens -->
      <div class="hidden items-center space-x-6 md:flex text-xl pt-2">
        <a
          href="/contact"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
        >
          Contact
        </a>
        <!-- Conditional Rendering Based on Authentication -->
        <template v-if="!user">
          <!-- Button for desktop -->
          <a
            href="#"
            class="hidden p-2 px-4 text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 md:block border-transparent border-2"
          >
            <button @click="loginClick">Login</button>
          </a>
        </template>
        <template v-else>
          <div class="flex items-center space-x-4">
            <span class="">{{ user.name }}</span>
            <!-- Logout button is now in the sidebar -->
            <!-- <a
              href="#"
              class="p-2 px-4 text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 border-transparent border-2"
              @click="logout"
            >
              Logout
            </a> -->
          </div>
        </template>
      </div>

      <!-- Hamburger Menu Button for Small Screens -->
      <div class="md:hidden flex items-center">
        <button
          @click="toggleMenu"
          class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          aria-label="Toggle menu"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
        >
          <!-- Hamburger Icon -->
          <svg
            class="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!isMenuOpen"
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
      </div>
    </div>

    <!-- Dropdown Menu for Small Screens -->
    <div
      v-show="isMenuOpen"
      id="mobile-menu"
      class="md:hidden mt-4 space-y-2"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="toggle-menu-button"
    >
      <a
        href="/contact"
        class="block py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
        @click="toggleMenu"
      >
        Contact
      </a>
      <template v-if="!user">
        <a
          href="#"
          class="block p-2 px-4 text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 border-transparent border-2"
          @click="handleLogin"
        >
          Login
        </a>
      </template>
      <template v-else>
        <div class="flex flex-col items-start space-y-2 px-4">
          <span class="">{{ user.name }}</span>
          <a
            href="#"
            class="w-full p-2 px-4 text-center text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 border-transparent border-2"
            @click="logout"
          >
            Logout
          </a>
        </div>
      </template>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "Navbar",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const loginClick = () => {
      // Initiate Google OAuth login
      google.accounts.oauth2
        .initCodeClient({
          client_id: import.meta.env.VITE_APP_CLIENT_ID, // Correct for Vite
          scope: "email profile openid",
          ux_mode: "redirect",
          redirect_uri: "http://localhost:3001/api/google-auth",
        })
        .requestCode();
    };

    const handleLogin = () => {
      loginClick();
      toggleMenu(); // Close menu after clicking login
    };

    const logout = () => {
      userStore.clearUser();
      router.push('/');
    };

    return {
      isMenuOpen,
      toggleMenu,
      loginClick,
      handleLogin,
      logout,
      user: userStore.user,
    };
  },
};
</script>

<style scoped>
.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  background-color: gray;
  display: block;
  height: 2px;
  width: 25px;
  margin: 4px 0;
}

/* Optional: Add transition for smooth menu toggle */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
