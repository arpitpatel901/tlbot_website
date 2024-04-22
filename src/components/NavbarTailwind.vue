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
              >Product</a
            >
            <a
              href="#"
              class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
              >Integrations</a
            >
            <a
              href="#"
              class="py-2 px-4 border-transparent border-2 hover:rounded-lg transition-all ease-in-out duration-200 hover:border-blue-300 hover:text-blue-300 hover:bg-gray-600"
              >About</a
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

      <!-- <div class="relative"> -->
      <!-- <div class="custom-shape-divider-bottom-1712260637 animate-sinusoid">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div> -->
      <!-- <div class="absolute spacer layer1 animate-sinusoid"></div> -->
      <!-- <div
          class="absolute blur-sm top-20 right-4 w-72 h-16 bg-blue-700 rounded-2xl md:left-20"
        ></div>
        <div
          class="absolute blur-sm top-40 left-4 w-72 h-16 bg-green-300 rounded-2xl md:right-20"
        ></div>
        <div
          class="absolute blur-sm top-60 right-4 w-72 h-16 bg-blue-700 rounded-2xl md:left-20"
        ></div>
        <div
          class="absolute blur-sm top-80 left-4 w-72 h-16 bg-green-300 rounded-2xl md:right-20"
        ></div> -->
      <!-- Title -->
      <header
        ref="title"
        id="title"
        class="z-10 box-border relative mx-20 mt-5 py-10 h-auto text-8xl text-center md:space-y-1 md:py-60 md:px-30 md:mt-28"
      >
        <h1>Build Your <span class="text-blue-500">AI Support</span></h1>
        <p
          class="box-border relative mx-auto pt-10 mt-5 h-auto text-4xl text-center md:text-4xl md:space-y-10 md:py-30 md:px-30 lg:max-w-3xl"
        >
          Build transparency into customer feedback with
          <!-- <span class="text-brightRed font-bold" -->
          <span class="text-gray-500 font-bold"
            >AI automations, Integrated ticket tracking, Automatic esclations,
            and much more..</span
          >
        </p>
        <a
          href="#"
          class="inline-block items-center text-2xl px-3 py-2 text-black bg-white font-bold rounded-lg baseline transition duration-300 relative"
          >Book Demo</a
        >
      </header>
    </div>
  </div>
  <div>
    <!-- Uniqueness Section -->
    <section id="Uniqueness">
      <!-- Flex container -->
      <div
        class="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row"
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
                customers. The platform is inherently scalable, ensuring it
                evolves alongside your customer base. Rest assured, your data
                remains exclusively yours, securely stored in a private
                database, and is never utilized to train our models.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <h2 class="text-5xl mt-20 font-bold text-center md:text-6xl">Use Cases</h2>
    <section id="Use-Cases">
      <div
        class="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row"
      >
        <div class="flex flex-col md:w-1/2">
          <TileComponent
            tileImage="whatsapp.jpeg"
            title="AI Draft Composer"
            description="Generate responses in a click, adhering to your company's brand and tone, based on expert knowledge."
          />
          <TileComponent
            tileImage="89354.jpg"
            title="Ticket Tracking"
            description="Track tickets from creation to resolution, ensuring no customer query goes unanswered."
          />
        </div>
        <div class="flex flex-col md:w-1/2">
          <TileComponent
            tileImage="whatsapp.jpeg"
            title="WhatApp Business Integration"
            description="Integrate your WhatsApp Business account to manage customer queries and feedback."
          />
          <TileComponent
            tileImage="topography.svg"
            title="Instagram Support Integration"
            description="Integrate your Instagram account to manage customer queries and feedback."
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="hidden bg-orange-500 md:flex">
      <!-- Flex Container -->
      <div
        class="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0"
      >
        <!-- Heading -->
        <h2
          class="text-5xl font-bold text-center text-white md:text-4xl md:max-w-xl md:text-left"
        >
          Automate your support so you can do what you do best
        </h2>
        <!-- Button -->
        <div>
          <a
            href="#"
            class="p-3 px-6 pt-2 text-brightRed bg-white rounded-lg shadow-2xl baseline hover:bg-gray-900"
            >Book Demo</a
          >
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-veryDarkBlue">
      <!-- Flex Container -->
      <div
        class="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0"
      >
        <!-- Logo and social links container -->
        <div
          class="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
        >
          <div class="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; 2022, All Rights Reserved
          </div>
          <!-- Logo -->
          <div>
            <img src="./../assets/logo-white.svg" class="h-8" alt="" />
          </div>
          <!-- Social Links Container -->
          <div class="flex justify-center space-x-4">
            <!-- Link 1 -->
            <a href="#">
              <img src="./../assets/icon-facebook.svg" alt="" class="h-8" />
            </a>
            <!-- Link 2 -->
            <a href="#">
              <img src="./../assets/icon-youtube.svg" alt="" class="h-8" />
            </a>
            <!-- Link 3 -->
            <a href="#">
              <img src="./../assets/icon-twitter.svg" alt="" class="h-8" />
            </a>
            <!-- Link 4 -->
            <a href="#">
              <img src="./../assets/icon-pinterest.svg" alt="" class="h-8" />
            </a>
            <!-- Link 5 -->
            <a href="#">
              <img src="./../assets/icon-instagram.svg" alt="" class="h-8" />
            </a>
          </div>
        </div>
        <!-- List Container -->
        <div class="flex justify-around space-x-32">
          <div class="flex flex-col space-y-3 text-white">
            <a href="#" class="hover:text-brightRed">Home</a>
            <a href="#" class="hover:text-brightRed">Integrations</a>
            <a href="#" class="hover:text-brightRed">Products</a>
          </div>
          <div class="flex flex-col space-y-3 text-white">
            <a href="#" class="hover:text-brightRed">About</a>
            <a href="#" class="hover:text-brightRed">Contact</a>
            <a href="#" class="hover:text-brightRed">Privacy Policy</a>
          </div>
        </div>

        <!-- Input Container -->
        <div class="flex flex-col justify-between">
          <form>
            <div class="flex space-x-3">
              <input
                type="text"
                class="flex-1 px-4 rounded-full focus:outline-none"
                placeholder="Updated in your inbox"
              />
              <button
                class="px-6 py-2 text-white rounded-full bg-brightRed hover:bg-brightRedLight focus:outline-none"
              >
                Go
              </button>
            </div>
          </form>
          <div class="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { CLIENT_ID } from "@/main";
import { CLIENT_SECRET } from "@/main";
import TileComponent from "./TileComponent.vue";
import { useUserStore } from '@/stores/userStore'; // Make sure the path is correct

import { GoogleLogin } from "vue3-google-login";
// import { googleSdkLoaded } from "vue3-google-login";
export default {
  name: "NavbarTailwind",
  components: {
    TileComponent,
    GoogleLogin,
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
          ux_mode: "redirect", // Optional: depends on your flow
          redirect_uri: "http://localhost:5173/auth/callback", // This should be a frontend route
          // redirect_uri: "http://localhost:3001/api/google-auth", // Point this to your backend
          // callback: (response) => {
          //   if (response.code) {
          //     this.sendCodeToBackend(response.code);
          //   }
          // },
          // window.location: "http://localhost:3001/api/google-auth",
        })
        .requestCode();
    },
    async sendCodeToBackend(code) {
      try {
        const response = await axios.get(`http://localhost:3001/api/google-auth`, { params: { code } });

        if (response.data.success && response.data.userData) {
          console.log("Received user data from backend:", response.data.userData);
          const userStore = useUserStore();
          userStore.setUser(response.data.userData);
          this.$router.push("/main_dashboard");
        } else {
          console.error("Failed to retrieve user data:", response.data.error);
        }
      } catch (error) {
        console.error("Error during the login process:", error);
      }
    },
    // async fetchUserDataFrom(code) {
    //   const userStore = useUserStore(); // Initialize Pinia store

    //   try {
    //     // Exchange the authorization code for an access token
    //     const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
    //       code: code,
    //       client_id: CLIENT_ID,
    //       client_secret: CLIENT_SECRET,
    //       redirect_uri: "http://localhost:3001/api/google-auth",
    //       grant_type: 'authorization_code',
    //     });
        
    //     if (tokenResponse.data) {
    //       const accessToken = tokenResponse.data.access_token;
          
    //       // Fetch user details using the access token
    //       const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       });

    //       if (userResponse && userResponse.data) {
    //         console.log('User Data:', userResponse.data);
    //         userStore.setUser(userResponse.data); // Save the user data in the store
    //         // Here you can set the user data to your Vue state or store
    //       } else {
    //         console.error('Failed to fetch user data');
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error during Google Auth process:', error);
    //   }
    // },
  },
};

// const callback = (response) => {
//   // This callback will be triggered when the user selects or login to
//   // his Google account from the popup
//   alert('login click'+ response)
//   console.log("Handle the response", response)
// }
</script>

<style>
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
