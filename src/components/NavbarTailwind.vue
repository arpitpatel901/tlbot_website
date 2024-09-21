<template>
  <div>
    <div class="custom-background relative w-full h-full">
      <nav class="relative container mx-auto p-6">
        <!-- Flex container -->
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="pt-4">
            <img src="./../assets/logo_manage.svg" alt="" />
            <!-- <img src="./../assets/test_logo.svg" alt="" /> -->
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
              href="#"
              class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
              >Contact</a
            >
            <!-- Button -->
            <a
              href="#"
              class="hidden p-2 px-4 pt-2 text-black bg-white font-bold rounded-lg baseline hover:bg-blue-200 md:block border-transparent border-2"
            >
              <button @click="loginClick">Login</button>
            </a>
            <!-- <GoogleLogin :callback="callback" prompt/> -->
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
            <a href="#" class="text-gray-500 hover:text-gray-300"
              >Integrations</a
            >
            <a href="#" class="text-gray-500 hover:text-gray-300">About</a>
            <a href="#" class="text-gray-500 hover:text-gray-300">Contact</a>
            <!-- <a href="#">Community</a> -->
          </div>
        </div>
      </nav>

      <!-- Static Text Section for Testing -->
      <!-- <section
        id="static-section"
        class="z-10 box-border relative mx-20 mt-5 py-10 h-auto text-center"
      >
        <p class="text-4xl md:text-5xl lg:text-6xl text-white">
          Welcome to TLabs!
        </p>
      </section> -->

      <!-- Title -->
      <section
        ref="messages"
        id="messages"
        class="z-10 box-border relative mx-20 mt-5 py-40 text-center md:py-30 md:px-30 md:mt-28"
        style="height: 400px;"
      >
        <p class="text-6xl lg:text-7xl space-y-20 lg:py-10 text-white mb-4">
          <h1><span class="text-gray-600">Build Your </span> <span class="text-blue-500">AI Assistant</span></h1>
        </p>
        <!-- Rotating messages -->
        <p
          v-show="currentMessage === 1 && !isFadingOut"
          class="text-5xl lg:text-6xl py-5 text-white animate-blink transition-opacity duration-2000 ease-in-out"
        >
          Search the Web
        </p>
        <p
          v-show="currentMessage === 2 && !isFadingOut"
          class="text-5xl lg:text-6xl py-5 text-white animate-blink transition-opacity duration-2000 ease-in-out"
        >
          Search your Data
        </p>
        <p
          v-show="currentMessage === 3 && !isFadingOut"
          class="text-5xl lg:text-6xl py-5 text-white animate-blink transition-opacity duration-2000 ease-in-out"
        >
          Automate your Tasks
        </p>
      </section>
    </div>
  </div>
  <div>
    <!-- Uniqueness Section -->
    <section id="Uniqueness">
      <!-- Flex container -->
      <div
        class="container flex flex-col px-4 mx-auto mt-10 space-y-12 py-10 md:py-40 md:space-y-0 md:flex-row"
      >
        <!-- What's Different -->
        <div class="flex flex-col space-y-4 md:w-1/2">
          <h2 class="max-w-md text-4xl font-bold text-center md:text-left">
            What's different about TLabs?
          </h2>
          <p
            class="max-w-sm text-xl text-center text-darkGrayishBlue md:text-left"
          >
            Designed for scalabilty, ease of use and cost-effectiveness, rest
            assured you are getting the optimal value for your investment.
            Reduce operational costs and simultaneously enhance customer
            experience.
          </p>
        </div>

        <!-- Numbered List -->
        <div class="flex flex-col space-y-8 md:w-1/2">
          <!-- List Item 1 -->
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            <!-- Heading -->
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  01
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                  Single platform for all your needs
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-2xl font-bold md:block">
                Single platform for all your needs
              </h3>
              <p class="text-darkGrayishBlue text-lg md:text-xl">
                Handle everything from automated AI support, ticket tracking,
                escalation management, without worrying about tweaking
                parameters. Give your customers a platform to raise their
                voices, and retarget them through continuous improvement.
              </p>
            </div>
          </div>

          <!-- List Item 2 -->
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            <!-- Heading -->
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  02
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                  Cost Effectiveness
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-2xl font-bold md:block">
                Cost Effectiveness
              </h3>
              <p class="text-darkGrayishBlue text-lg md:text-xl">
                Leveraging open-source models to enhance performance tailored to
                your specific needs, ensuring you receive unparalleled value for
                your investment.
              </p>
            </div>
          </div>

          <!-- List Item 3 -->
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            <!-- Heading -->
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  03
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                  Scalable and Private
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-2xl font-bold md:block">
                Scalable and Private
              </h3>
              <p class="text-darkGrayishBlue text-lg md:text-xl">
                Designed to be scalable in nature the platform grows with your
                data. Rest assured, your data remains exclusively yours,
                securely stored in a private database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sign Up for Updates Section -->
    <div
    class="mt-12 flex flex-col items-center bg-gray-100 pt-6 pb-16 px-6 rounded-lg"
  >
    <h2 class="text-2xl font-bold text-brightRed mb-4">Stay Updated</h2>
    <p class="text-darkGrayishBlue text-lg mb-4 text-center">
      Follow progress as we build chitchat to be the best personal assistant
    </p>
    <form
      id="signup-form"
      class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      @submit.prevent="submitEmail"
    >
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brightRed md:w-80"
        required
      />
      <button
        type="submit"
        class="px-6 py-2 text-white bg-brightRed rounded-lg hover:bg-brightRedLight focus:outline-none"
      >
        {{ buttonText }}
      </button>
    </form>
  </div>
  </div>
</template>

<script>
// import axios from "axios";
import { CLIENT_ID } from "@/main";
// import { CLIENT_SECRET } from "@/main";
import TileComponent from "./TileComponent.vue";

import { GoogleLogin } from "vue3-google-login";
// import { googleSdkLoaded } from "vue3-google-login";
export default {
  name: "NavbarTailwind",
  components: {
    TileComponent,
    GoogleLogin,
  },
  data() {
    return {
      currentMessage: 1, // Start with the first message
      buttonText: "Sign Up", // Make sure buttonText is defined in the data function
      isFadingOut: false, // Start without fadeout
    };
  },
  mounted() {
    this.startMessageRotation();
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle("dark");
    },
    toggleMenuButton() {
      console.log("toggleMenuButton triggered");
      this.$refs.menuButton.classList.toggle("open");
      // console.log("toggleMenu triggered");
      // console.log(this.$refs.menu);
      this.$refs.menu.classList.toggle("flex");
      this.$refs.menu.classList.toggle("hidden");
    },
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
    // // Rotates between messages
    // startMessageRotation() {
    //   setInterval(() => {
    //     this.currentMessage = (this.currentMessage % 3) + 1;
    //   }, 5000); // Change message every 5 seconds
    // },
    // Rotates between messages with minimal downtime
    startMessageRotation() {
      setInterval(() => {
        // Trigger fade-out before changing message
        this.isFadingOut = true;
        setTimeout(() => {
          this.currentMessage = (this.currentMessage % 3) + 1; // Cycle through messages
          this.isFadingOut = false; // After changing, allow fade-in
        }, 100); // Minimal delay between messages to avoid flicker
      }, 5000); // Change message every 5 seconds
    },
    async submitEmail() {
      const emailInput = document.getElementById("email");
      const email = emailInput.value;

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzV5eTuWK7Yr6QTbhY_NOKoLItPH28artZAYoYWN9079uilbzR00n39NcqaT5ZVmJFE/exec", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: email,
          }),
        });

        const result = await response.json();
        if (result.result === "success") {
          emailInput.value = ""; // Clear the email input after successful submission
          this.buttonText = "Thank You!"; // Update button text to "Thank You!"

          // After 3 seconds, revert the button text back to "Sign Up"
          setTimeout(() => {
            this.buttonText = "Sign Up";
          }, 3000);
        } else {

          alert("There was an issue with your signup. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting email:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
};
</script>

<style>
@keyframes blink {
  0%, 10% {
    opacity: 0; /* Quick fade-in */
  }
  20%, 80% {
    opacity: 1; /* Stay visible for a longer time */
  }
  90%, 100% {
    opacity: 0; /* Quick fade-out */
  }
}
.animate-blink {
  animation: blink 5s infinite;
}
.custom-background {
  background-image: linear-gradient(
      to bottom,
      transparent,
      var(--vt-c-black) 100%
    ),
    url("./../assets/topography.svg");
  background-repeat: repeat, repeat;
  background-position: center, center;
}
/* body { */
/* background-image: url("./../assets/bg-tablet-pattern.svg"); */
/* background-image: url("./../assets/wave.svg"); */
/* background-repeat: no-repeat; */
/* background-size: 800px; */
/* background-position: 90% -25%; */
/* } */
.spacer {
  aspect-ratio: 760/500;
  width: 100%;
  background-repeat: repeat-x;
  background-position: center;
  background-size: auto 100%;
}
.layer1 {
  background-image: url("./../assets/wave.svg");
}
/* .custom-shape-divider-bottom-1712260637 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    background-repeat: repeat-x;
} */

#cta {
  background-image: url("./../assets/wave.svg");
  background-repeat: repeat-x;
  aspect-ratio: 2500/500;
}

@media (max-width: 576px) {
  body {
    background-position: 50px -50px;
    background-size: 500px;
  }

  /* #cta {
    background-image: url("./../assets/bg-simplify-section-mobile.svg");
  } */
}

/* Hamburger Menu */

.hamburger {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.25s;
  position: relative;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 4px;
  background: #4b5563;
  transform: rotate(0);
  transition: all 0.5s;
}

.hamburger-middle {
  transform: translateY(7px);
}

.hamburger-bottom {
  transform: translateY(14px);
}

.open {
  transform: rotate(90deg);
  transform: translateY(0px);
}

.open .hamburger-top {
  transform: rotate(45deg) translateY(6px) translate(6px);
}

.open .hamburger-middle {
  display: none;
}

.open .hamburger-bottom {
  transform: rotate(-45deg) translateY(6px) translate(-6px);
}

.hover\:bg-brightRedLight:hover {
  --tw-bg-opacity: 1;
  background-color: hsl(12 88% 69% / var(--tw-bg-opacity));
}

.hover\:bg-gray-900:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}

.hover\:text-darkGrayishBlue:hover {
  --tw-text-opacity: 1;
  color: hsl(227 12% 61% / var(--tw-text-opacity));
}

.hover\:text-brightRed:hover {
  --tw-text-opacity: 1;
  color: hsl(12 88% 59% / var(--tw-text-opacity));
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Hover highlight effect */
a.relative {
  position: relative; /* Ensures that the pseudo-element is positioned relative to the button */
}

a.relative::after {
  content: "";
  display: block;
  position: absolute;
  top: -12px; /* Adjust these values to control the offset of the border */
  bottom: -12px;
  left: -12px;
  right: -12px;
  border: 6px solid transparent; /* Makes the border invisible by default */
  border-radius: inherit; /* Matches the border-radius of the button */
  transition: border-color 0.3s; /* Smooth transition for the border color */
}

a.relative:hover::after {
  border-color: #3b82f6; /* Sets the border color on hover to Tailwind's blue-500 */
}

@media (min-width: 480px) {
  .sm\:w-auto {
    width: auto;
  }

  .sm\:self-center {
    align-self: center;
  }
}

@media (min-width: 768px) {
  .md\:mb-4 {
    margin-bottom: 1rem;
  }

  .md\:block {
    display: block;
  }

  .md\:flex {
    display: flex;
  }

  .md\:hidden {
    display: none;
  }

  .md\:w-1\/2 {
    width: 50%;
  }

  .md\:w-1\/3 {
    width: 33.333333%;
  }

  .md\:max-w-xl {
    max-width: 36rem;
  }

  .md\:flex-row {
    flex-direction: row;
  }

  .md\:flex-col {
    flex-direction: column;
  }

  .md\:items-start {
    align-items: flex-start;
  }

  .md\:justify-start {
    justify-content: flex-start;
  }

  .md\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }

  .md\:space-x-6 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.5rem * var(--tw-space-x-reverse));
    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .md\:bg-transparent {
    background-color: transparent;
  }

  .md\:py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .md\:py-12 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .md\:text-left {
    text-align: left;
  }

  .md\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .md\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}
</style>
