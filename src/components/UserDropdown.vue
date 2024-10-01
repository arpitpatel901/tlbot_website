<!-- src/components/UserDropdown.vue -->
<template>
    <div class="relative inline-block text-left">
      <div>
        <button @click="toggleDropdown" class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <img :src="user.avatar" alt="User Avatar" class="h-8 w-8 rounded-full" />
        </button>
      </div>
  
      <div v-if="isOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    user: {
      name: string;
      avatar: string;
    };
  }>();
  
  const emit = defineEmits(['']);
  
  const isOpen = ref(false);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.inline-block.text-left')) {
      isOpen.value = false;
    }
  };
  
  window.addEventListener('click', handleClickOutside);
  
  // Cleanup event listener on unmount
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  /* Optional: Add any specific styles here */
  </style>
  