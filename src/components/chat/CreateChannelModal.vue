<!-- src/components/chat/CreateChannleModal.vue -->
<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4 text-black">Create New Channel</h2>
      <div class="mb-4">
        <label class="block text-gray-700">Channel Name</label>
        <input
          v-model="channelName"
          type="text"
          class="mt-1 w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Description</label>
        <textarea
          v-model="channelDescription"
          class="mt-1 w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          @click="createChannel"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

// Define emit
const emit = defineEmits(["close"]);

const userStore = useUserStore();

const channelName = ref("");
const channelDescription = ref("");

// Create Channel function
const createChannel = async () => {
  if (!channelName.value.trim()) {
    console.log("Channel name is required");
    alert("Channel name is required.");
    return;
  }

  console.log("Attempting to create channel:", channelName.value);
  await userStore.createChannel(channelName.value, channelDescription.value);
  console.log("Channel created successfully");
  emit("close"); // Use `emit` instead of `$emit`
};
</script>


<style scoped>
/* Ensure the text color is black */
input,
textarea {
  color: black;
}
/* Optional: Add any additional styles if necessary */
</style>
