<template>
    <div class="max-w-2xl mx-10 my-10 rounded-2xl overflow-hidden shadow-lg bg-black-10 text-center"> <!-- Removed fixed height, adjusted margin and width -->
      <img class="w-full h-100 object-cover" :src="resolvedImage" alt="Tile Image"> <!-- Fixed image height to h-48 -->
      <div class="px-6 py-4"> <!-- Removed fixed height for text container -->
        <div class="mt-10 font-bold text-3xl text-white mb-4">{{ title }}</div> <!-- Adjusted title size -->
        <p class="text-gray-300 text-lg mb-4">
          {{ description }}
        </p>
        <!-- Tag could be included here if needed -->
      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    name: 'TileComponent',
    props: {
      tileImage: String,
      title: String,
      description: String,
    },
    data() {
      return {
        resolvedImage: '', // Data property for the resolved image path
      };
    },
    mounted() {
      this.resolveImage();
    },
    methods: {
      resolveImage() {
        // Assuming images are placed in the `public/assets/` directory
        this.resolvedImage = new URL(`../assets/${this.tileImage}`, import.meta.url).href;
      }
    }
  };
  </script>
  