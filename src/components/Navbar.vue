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
        <a
          href="#"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
          >Integrations</a
        >
        <a
          href="#"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
          >Learn More</a
        >
        <a
          href="/contact"
          class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
          >Contact</a
        >
        <!-- Button -->
        <a
          href="#"
          class="hidden p-2 px-4 text-black bg-gray-200 font-bold rounded-lg baseline hover:bg-blue-200 md:block border-transparent border-2"
        >
          <button @click="loginClick">Login</button>
        </a>
      </div>

      <!-- Hamburger Icon -->
      <button
        @click="toggleMenuButton"
        ref="menuButton"
        id="menu-btn"
        class="block hamburger md:hidden focus:outline-none"
      >
        <span class="hamburger-top"></span>
        <span class="hamburger-middle"></span>
        <span class="hamburger-bottom"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden">
      <div
        ref="menu"
        id="menu"
        class="relative flex-col items-center text-3xl hidden self-end py-8 mt-10 space-y-6 font-bold bg-transparent sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
      >
        <a href="#" class="text-gray-500 hover:text-gray-300">Product</a>
        <a href="#" class="text-gray-500 hover:text-gray-300">Integrations</a>
        <a href="#" class="text-gray-500 hover:text-gray-300">About</a>
        <a href="#" class="text-gray-500 hover:text-gray-300">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script>
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
    toggleMenuButton() {
      console.log("toggleMenuButton triggered");
      this.$refs.menuButton.classList.toggle("open");
      // console.log("toggleMenu triggered");
      // console.log(this.$refs.menu);
      this.$refs.menu.classList.toggle("flex");
      this.$refs.menu.classList.toggle("hidden");
    },
  },
};
</script>

<style scoped>
.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  background-color: black;
  display: block;
  height: 2px;
  width: 25px;
  margin: 4px 0;
}
</style>
