<!-- src/components/Chat.vue -->
<template>
  <div class="flex flex-col h-full text-black">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Chat</h2>
      <button
        @click="startNewTransaction"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        aria-label="Start a new chat"
      >
        New Chat
      </button>
    </div>

    <div class="flex flex-1">
      <!-- Transactions List -->
      <div class="w-1/4 border-r p-2 overflow-auto">
        <h3 class="text-xl font-semibold mb-2">Chats</h3>
        <ul>
          <li
            v-for="(txn, index) in transactions"
            :key="txn.transaction_id"
            :class="[
              'p-2 mb-2 rounded cursor-pointer',
              activeTransactionId === txn.transaction_id
                ? 'bg-blue-100'
                : 'hover:bg-gray-100',
            ]"
            @click="selectTransaction(txn.transaction_id)"
          >
            Transaction {{ index + 1 }}
          </li>
        </ul>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4 overflow-auto" ref="chatArea">
          <div v-if="activeTransaction" class="space-y-4">
            <div
              v-for="msg in activeTransaction.messages"
              :key="msg.message_id"
              :class="[
                'max-w-lg p-3 rounded',
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 text-gray-800 self-start',
              ]"
            >
              <div class="message-content">
                {{ msg.message }}
              </div>
              <div class="text-xs text-gray-600 mt-1">
                {{ formatTimestamp(msg.timestamp) }}
              </div>
            </div>
            <div v-if="isLoading" class="flex justify-center my-2">
              <div class="loader"></div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">
            Select a chat or start a new one.
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 p-2 border rounded"
              :disabled="!activeTransaction || isLoading"
              required
            />
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              :disabled="!activeTransaction || isLoading"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";
import { ref, computed, onMounted, watch, nextTick } from 'vue';
// import axios from "axios";

export default {
  name: "Chat",
  setup() {
    const chatStore = useChatStore();
    const userStore = useUserStore();
    const newMessage = ref("");
    const isLoading = ref(false);
    const chatArea = ref(null);

    // Start a new transaction on component mount if none exist
    onMounted(() => {
      if (chatStore.transactions.length === 0) {
        chatStore.addTransaction();
      }
    });

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Computed property for transactions
    const transactions = computed(() => chatStore.transactions);

    // Computed property for active transaction
    const activeTransaction = computed(() => {
      return chatStore.getTransaction(chatStore.activeTransactionId);
    });

    // Function to start a new chat transaction
    const startNewTransaction = () => {
      chatStore.addTransaction();
    };

    // Function to select a transaction
    const selectTransaction = (transaction_id) => {
      chatStore.activeTransactionId = transaction_id;
    };

    // Function to send a message
    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      const txn_id = chatStore.activeTransactionId;
      const user_id = userStore.user.id; // Assuming user has an 'id'

      // Add user message to store
      chatStore.addMessage(txn_id, newMessage.value, "user");

      // Scroll to bottom
      scrollToBottom();

      // Prepare payload
      const payload = {
        message: newMessage.value,
        message_id: generateUUID(),
        transaction_id: txn_id,
        user_id: user_id,
      };

      // Reset input and set loading
      newMessage.value = "";
      isLoading.value = true;

      try {
        // Send request to backend (mocked for now)
        const response = await mockBackendRequest(payload);
        // Add AI response to store
        if (response && response.data) {
          chatStore.addMessage(txn_id, response.data.reply, "ai");
        }

        // // Replace mockBackendRequest with real API call
        // const response = await axios.post('https://your-backend-api.com/chat', payload);
        // if (response.data && response.data.reply) {
        //   chatStore.addMessage(txn_id, response.data.reply, 'ai');
        // }
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally, add an error message to the chat
        chatStore.addMessage(
          txn_id,
          "Sorry, something went wrong. Please try again.",
          "ai"
        );
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    };

    // Function to generate UUID (if not using 'uuid' library in frontend)
    const generateUUID = () => {
      // Simple UUID generator (for demonstration purposes)
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };

    // Mock backend request function
    const mockBackendRequest = (payload) => {
      // Simulate network delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              reply: `Echo: ${payload.message}`,
            },
          });
        }, 1500); // 1.5 seconds delay
      });
    };

    // Scroll to bottom of chat area
    const scrollToBottom = () => {
      if (chatArea.value) {
        chatArea.value.scrollTop = chatArea.value.scrollHeight;
      }
    };

    // Watch for activeTransaction changes to scroll
    watch(activeTransaction, () => {
      nextTick(() => {
        scrollToBottom();
      });
    });

    return {
      transactions,
      activeTransaction,
      newMessage,
      sendMessage,
      isLoading,
      startNewTransaction,
      selectTransaction,
      chatArea,
      formatTimestamp,
    };
  },
};
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.message-content {
  white-space: pre-wrap;
}

/* Optionally, add different styles for user and AI messages */
.bg-blue-500 {
  /* User messages */
}

.bg-gray-300 {
  /* AI messages */
}
</style>
