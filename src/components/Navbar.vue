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
      <!-- Menu Items -->
      <div class="hidden items-center space-x-6 md:flex text-xl pt-2">
        <!-- <a
          href="#"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
          >Learn More</a
        > -->
        <a
          href="/contact"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
          >Contact</a
        >
        <!-- Button for desktop -->
        <a
          href="#"
          class="hidden p-2 px-4 text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 md:block border-transparent border-2"
        >
          <button @click="loginClick">Login</button>
        </a>
      </div>

      <!-- Login Button for small screens -->
      <a
        href="#"
        class="md:hidden p-2 px-4 text-black bg-gray-200 font-bold text-xl rounded-lg baseline hover:bg-blue-200 border-transparent border-2"
      >
        <button @click="loginClick">Login</button>
      </a>
    </div>
  </nav>
</template>

<script>
import { CLIENT_ID } from "@/main";
import { CLIENT_SECRET } from "@/main";

export default {
  methods: {
    loginClick() {
      google.accounts.oauth2
        .initCodeClient({
          client_id: CLIENT_ID, // Your Google OAuth Client ID
          scope: "email profile openid",
          ux_mode: "redirect", // Redirect mode as the UX mode
          redirect_uri: "http://localhost:3001/api/google-auth", // Point this to your backend
          // No need for the callback here, as the backend will handle it
        })
        .requestCode();
    },
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
</style>
