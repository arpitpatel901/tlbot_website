<template>
  <div>
    <div class="custom-background relative w-full h-full">
      <Navbar />

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
    <section id="Uniqueness" class="py-20">
      <!-- Flex container -->
      <div class="container flex flex-col px-10 mx-auto space-y-12 md:space-y-0 md:flex-row md:space-x-20">
        <!-- What's Different -->
        <div class="md:w-1/2 flex flex-col space-y-6">
          <h2 class="text-5xl font-bold text-center md:text-left text-gray-300">
            What's Shadow?
          </h2>
          <p class="text-xl text-gray-500 text-center md:text-left leading-relaxed">
            Shadow is an AI tool designed to be your ultimate personal assistant, streamlining processes and automating tasks.
            Shadow enhances your productivity by reducing inefficiencies and letting AI handle repetitive tasks.
          </p>
          <p class="text-2xl text-gray-400 text-center md:text-left leading-relaxed">
            What can it do?
          </p>

          <!-- Cool Cards instead of a list -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-8">
            <div class="feature-card p-4 py-10 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform overflow-hidden">
              <div class="icon mb-4 text-5xl text-blue-500">
                <!-- Icon (replace with an actual icon library like FontAwesome or Heroicons) -->
                🌐
              </div>
              <h4 class="font-bold text-xl mb-2 overflow-hidden">Quickly browse the web</h4>
              <p class="text-gray-400">Easily navigate through the web using smart AI features.</p>
            </div>

            <div class="feature-card p-4 py-10 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform overflow-hidden">
              <div class="icon mb-4 text-5xl text-blue-500">
                <!-- Icon (replace with an actual icon library like FontAwesome or Heroicons) -->
                🔍
              </div>
              <h4 class="font-bold text-xl mb-2 overflow-hidden">Search through your data</h4>
              <p class="text-gray-400">Find the exact information you need, quickly and effortlessly.</p>
            </div>

            <div class="feature-card p-4 py-10 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform overflow-hidden">
              <div class="icon mb-4 text-5xl text-blue-500">
                <!-- Icon (replace with an actual icon library like FontAwesome or Heroicons) -->
                🤖
              </div>
              <h4 class="font-bold text-xl mb-2 overflow-hidden">Automate routine tasks</h4>
              <p class="text-gray-400">Let AI handle repetitive tasks, saving you time and effort.</p>
            </div>
          </div>
        </div>

        <!-- Numbered List -->
        <div class="md:w-1/2 flex flex-col space-y-8">
          <!-- List Item 1 -->
          <div class="flex items-start space-x-6">
            <!-- Number -->
            <div class="bg-blue-500 rounded-full px-4 py-2 text-white font-bold">
              01
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-500 mb-2">
                What are connectors?
              </h3>
              <p class="text-lg text-gray-500 leading-relaxed">
                Connectors are APIs or platforms you want to automate, including Google Home, Google Office, and more. Sign up to explore the growing list of integrations.
              </p>
            </div>
          </div>

          <!-- List Item 2 -->
          <div class="flex items-start space-x-6">
            <!-- Number -->
            <div class="bg-blue-500 rounded-full px-4 py-2 text-white font-bold">
              02
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-500 mb-2">
                How much does it cost?
              </h3>
              <p class="text-lg text-gray-500 leading-relaxed">
                Shadow is currently free and will always offer a free tier. For commercial use, please contact us for pricing details.
              </p>
            </div>
          </div>

          <!-- List Item 3 -->
          <div class="flex items-start space-x-6">
            <!-- Number -->
            <div class="bg-blue-500 rounded-full px-4 py-2 text-white font-bold">
              03
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-500 mb-2">
                How can I sign up?
              </h3>
              <p class="text-lg text-gray-500 leading-relaxed">
                Shadow is currently in beta. To request access, please use our contact page and leave a message. 
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
        Follow progress as we build shadow to be the best personal assistant
      </p>
      <form
        id="signup-form"
        class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 pb-6"
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
import Navbar from './Navbar.vue';

import { GoogleLogin } from "vue3-google-login";
// import { googleSdkLoaded } from "vue3-google-login";
export default {
  name: "HomePage",
  components: {
    GoogleLogin,
    Navbar,
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
