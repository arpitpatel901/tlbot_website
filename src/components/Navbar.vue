<template>
  <header
    class="supports-backdrop-blur:bg-background/60 bg-background sticky top-0 z-50 w-full backdrop-blur"
  >
    <div
      class="box-border flex relative min-h-screen flex-col"
      :maxWidth="null"
      :lazyLoad="false"
    >
      <div
        class="container relative flex h-16 w-full items-center md:justify-between"
      >
        <!-- <a href="/"
          ><svg
            width="116"
            height="24"
            viewBox="0 0 116 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              width="24"
              height="24"
              rx="6"
              fill="hsl(var(--neutral-90))"
            ></rect>
            TLabsChatBot
            </svg
        ></a> -->
        <div class="flex w-full items-center justify-end gap-2.5">
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            class="relative z-10 max-w-max flex-1 items-center justify-center hidden md:block"
          >
            <div style="position: relative">
              <ul
                data-orientation="horizontal"
                class="group flex flex-1 list-none items-center justify-center space-x-1"
                dir="ltr"
              >
                <li>
                  <a
                    class="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex w-max items-center justify-center py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-foreground/70 group h-8 rounded-sm px-2.5"
                    href="/docs"
                    data-radix-collection-item=""
                    >Learn</a
                  >
                </li>
                <li>
                  <a
                    class="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex w-max items-center justify-center py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-foreground/70 group h-8 rounded-sm px-2.5"
                    href="/changelog"
                    data-radix-collection-item=""
                    >What's new</a
                  >
                </li>
                <li>
                  <a
                    class="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex w-max items-center justify-center py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-foreground/70 group h-8 rounded-sm px-2.5"
                    href="/pricing"
                    data-radix-collection-item=""
                    >Pricing</a
                  >
                </li>
                <li>
                  <a
                    class="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex w-max items-center justify-center py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-foreground/70 group h-8 rounded-sm px-2.5"
                    href="/blog"
                    data-radix-collection-item=""
                    >Blog</a
                  >
                </li>
              </ul>
            </div>
            <div class="absolute left-0 top-full flex justify-center"></div>
          </nav>
          <a
            class="focus-visible:ring-ring items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm h-8 px-3 text-xs hidden rounded-sm md:flex"
            href="/signin"
            >Sign in<span class="sr-only">Sign in</span></a
          ><button
            class="focus-visible:ring-ring group relative z-0 transform-gpu items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-white/10 font-medium transition-transform duration-300 ease-in-out [background:var(--bg)] [border-radius:var(--radius)] focus-visible:outline-none focus-visible:ring-1 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 h-8 px-3 text-xs text-white dark:text-white hidden md:inline-flex"
            style="
              --spread: 90deg;
              --shimmer-color: #ffffff;
              --radius: 0.3rem;
              --speed: 3s;
              --cut: 0.1em;
              --bg: hsla(151, 55%, 42%, 1);
            "
          >
            <div
              class="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]"
            >
              <div
                class="animate-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]"
              >
                <div
                  class="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
                ></div>
              </div>
            </div>
            Try for free<span class="sr-only">Try for free</span>
            <div
              class="insert-0 absolute size-full px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f] rounded-sm"
            ></div>
            <div
              class="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

export default {
  components: {
    Menubar,
    Button,
    Accordion,
    AccordionTab,
  },
  setup() {
    const show = ref(true);

    const items = ref([
      {
        label: "Product",
        command: () => {
          // handle navigation or action
        },
      },
      // Other items...
    ]);

    function requestDemo() {
      // handle the action
    }

    return { show, items, requestDemo };
  },
};
</script>