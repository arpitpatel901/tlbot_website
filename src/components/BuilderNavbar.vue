<template>
    <div
      class="box-border flex relative flex-col shrink-0 px-5 pt-2 h-auto shadow-sm bg-zinc-400 grow-0"
      :maxWidth="null"
      :lazyLoad="false"
    >
      <header
        class="box-border flex relative flex-col grow shrink-0 self-stretch px-5 pt-2 mx-auto w-full h-auto shadow-sm bg-zinc-400 max-w-[1200px]"
      >
        <div
          class="flex flex-row w-full max-md:justify-start max-md:items-start max-sm:items-center"
        >
          <div
            class="flex relative flex-row gap-5 justify-between items-center self-stretch my-3 w-full"
          >
            <div
              class="flex relative flex-row self-stretch grow-[1.1674179080885916] max-md:items-center max-md:my-auto max-md:mr-auto max-md:w-full max-sm:justify-start"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F37d9aff9b41b4b79b79dcf51c295a5c3%2Fe47abcfdba144ce3aac055a96cb68dc4"
                alt="Company logo"
                class="box-border object-contain overflow-hidden shrink-0 m-auto w-full max-h-12 aspect-square max-w-[89px] min-h-[20px] min-w-[20px] max-md:grow max-md:mr-auto max-md:w-auto max-sm:mr-auto max-sm:max-h-[42px] max-sm:max-w-[53px] max-sm:min-w-[42px]"
              />
              <nav
                class="flex relative flex-col mt-4 grow-[3.1608208817763215] max-md:hidden max-md:flex-row max-md:mr-auto max-sm:hidden"
              >
                <div
                  class="flex relative flex-row gap-4 justify-start self-stretch max-md:justify-center"
                >
                  <button
                    @click="goToProduct"
                    class="box-border relative shrink-0 my-auto text-2xl cursor-pointer pointer-events-auto"
                  >
                    Product
                  </button>
                  <button
                    @click="goToSolutions"
                    class="box-border relative shrink-0 text-2xl cursor-pointer pointer-events-auto"
                  >
                    Solutions
                  </button>
                  <button
                    @click="goToResources"
                    class="box-border relative shrink-0 ml-0.5 text-2xl cursor-pointer pointer-events-auto max-md:mx-0.5"
                  >
                    Resources
                  </button>
                  <button
                    @click="goToPricing"
                    class="box-border relative shrink-0 my-auto ml-3 text-2xl cursor-pointer pointer-events-auto max-md:mx-2.5"
                  >
                    Pricing
                  </button>
                </div>
              </nav>
            </div>
            <div
              class="flex relative flex-row mt-px ml-auto w-auto text-2xl grow-0 max-md:hidden max-sm:hidden"
            >
              <button
                @click="requestDemo"
                class="box-border relative shrink-0 p-3 my-auto mr-4 ml-auto text-2xl text-center text-black rounded appearance-none cursor-pointer grow-0"
              >
                Request a demo
              </button>
              <div class="flex relative flex-row gap-4 ml-4">
                <button
                  @click="login"
                  class="box-border relative shrink-0 p-3 text-2xl text-center text-black rounded appearance-none cursor-pointer grow-0"
                >
                  Login
                </button>
                <button
                  @click="signup"
                  class="box-border relative shrink-0 p-3 text-2xl text-center bg-blue-500 rounded appearance-none cursor-pointer grow-0 text-[white]"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets%2F37d9aff9b41b4b79b79dcf51c295a5c3%2F8ab5d29108e44348b7e4c6f91ce06431"
            alt=""
            class="box-border object-cover overflow-hidden shrink-0 mt-5 w-full aspect-[1.19] min-h-[20px] min-w-[20px] max-md:flex max-md:my-auto max-md:w-6 max-md:h-6 max-md:max-w-[48px] max-sm:flex max-sm:my-auto max-sm:ml-auto max-sm:w-6 max-sm:h-6"
          />
        </div>
        <template v-if="show">
          <div
            gridRowWidth="25%"
            class="box-border hidden relative flex-col shrink-0 mt-5 max-md:flex max-sm:flex"
            :items="[
              {
                title: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    layerName: 'Accordion item title',
                    id: 'builder-344f0748368c4e1483f3059b53b0d0d6',
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        id: 'builder-dd9cbdba9f5f4b5ba503c8843953234b',
                        component: {
                          name: 'Text',
                          options: {
                            text: 'Product',
                          },
                        },
                        responsiveStyles: {
                          large: {
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                          },
                        },
                      },
                    ],
                    responsiveStyles: {
                      large: {
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'stretch',
                        flexDirection: 'column',
                        paddingBottom: '10px',
                        backgroundColor: 'rgba(234, 234, 234, 1)',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '10px',
                      },
                      medium: {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    },
                  },
                ],
                detail: [],
              },
              {
                title: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    layerName: 'Accordion item title',
                    id: 'builder-1e8803291ce54ecab5c2f67eeca52f73',
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        id: 'builder-289f8757b9ff4dd39bb231af5f915530',
                        component: {
                          name: 'Text',
                          options: {
                            text: 'Solution',
                          },
                        },
                        responsiveStyles: {
                          large: {
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                          },
                        },
                      },
                    ],
                    responsiveStyles: {
                      large: {
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'stretch',
                        flexDirection: 'column',
                        paddingBottom: '10px',
                        backgroundColor: 'rgba(234, 234, 234, 1)',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '10px',
                      },
                      medium: {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    },
                  },
                ],
                detail: [],
              },
              {
                title: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    layerName: 'Accordion item title',
                    id: 'builder-9825c73104a64b7f960955bbef9ad778',
                    children: [
                      {
                        '@type': '@builder.io/sdk:Element',
                        '@version': 2,
                        id: 'builder-12e19d6f88714598bcbb3c5bdc460324',
                        component: {
                          name: 'Text',
                          options: {
                            text: 'Resources',
                          },
                        },
                        responsiveStyles: {
                          large: {
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                          },
                        },
                      },
                    ],
                    responsiveStyles: {
                      large: {
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'stretch',
                        flexDirection: 'column',
                        paddingBottom: '10px',
                        backgroundColor: 'rgba(234, 234, 234, 1)',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '10px',
                      },
                      medium: {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    },
                  },
                ],
                detail: [],
              },
            ]"
            @eatatime="false"
            :grid="false"
            :useChildrenForItems="false"
          >
            <div>
              <div builder="accordion">
                <div builder="accordion-title">
                  <div
                    builder-id="builder-344f0748368c4e1483f3059b53b0d0d6"
                    class="flex relative flex-col p-2.5 bg-gray-200 max-md:bg-white"
                  >
                    <div
                      builder-id="builder-dd9cbdba9f5f4b5ba503c8843953234b"
                      class="flex flex-col text-left"
                    >
                      <div innerHTML="Product" class="builder-text"></div>
                    </div>
                  </div>
                </div>
                <div builder="accordion-detail"></div>
              </div>
              <div builder="accordion">
                <div builder="accordion-title">
                  <div
                    builder-id="builder-1e8803291ce54ecab5c2f67eeca52f73"
                    class="flex relative flex-col p-2.5 bg-gray-200 max-md:bg-white"
                  >
                    <div
                      builder-id="builder-289f8757b9ff4dd39bb231af5f915530"
                      class="flex flex-col text-left"
                    >
                      <div innerHTML="Solution" class="builder-text"></div>
                    </div>
                  </div>
                </div>
                <div builder="accordion-detail"></div>
              </div>
              <div builder="accordion">
                <div builder="accordion-title">
                  <div
                    builder-id="builder-9825c73104a64b7f960955bbef9ad778"
                    class="flex relative flex-col p-2.5 bg-gray-200 max-md:bg-white"
                  >
                    <div
                      builder-id="builder-12e19d6f88714598bcbb3c5bdc460324"
                      class="flex flex-col text-left"
                    >
                      <div innerHTML="Resources" class="builder-text"></div>
                    </div>
                  </div>
                </div>
                <div builder="accordion-detail"></div>
              </div>
            </div>
          </div>
        </template>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    methods: {
      goToProduct() {
        // Navigate to product page
        this.$router.push('/product');
      },
      goToSolutions() {
        // Navigate to solutions page  
        this.$router.push('/solutions');
      },
      goToResources() {
        // Navigate to resources page
        this.$router.push('/resources');  
      },
      goToPricing() {
        // Navigate to pricing page
        this.$router.push('/pricing');
      },
      requestDemo() {
        // Handle request demo action
        console.log('Request demo clicked');
      },
      login() {
        // Handle login action  
        console.log('Login clicked');
      },
      signup() {
        // Handle signup action
        console.log('Signup clicked');  
      },
    },
  };
  </script>