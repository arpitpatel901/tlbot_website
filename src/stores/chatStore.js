// src/stores/chatStore.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export const useChatStore = defineStore('chat', () => {
  // Array of chat transactions
  // Each transaction contains a unique transaction_id, user_id, and an array of messages
  const transactions = ref([]);

  // Current active transaction ID
  // Tracks the currently active transaction. This is useful when displaying or interacting with a specific chat.
  const activeTransactionId = ref(null);

  // Add a new chat transaction
  // new chat transaction with a unique ID and adds it to the transactions array. It also sets this new transaction as the active one.
  const addTransaction = () => {
    const newTransaction = {
      transaction_id: uuidv4(),
      user_id: null, // Will be set when user logs in
      messages: [],
    };
    transactions.value.push(newTransaction);
    activeTransactionId.value = newTransaction.transaction_id;
    return newTransaction.transaction_id;
  };

  // Set the user ID for all transactions (should be called on user login)
  // Assigns the user_id to all existing transactions. This should be called when a user logs in to ensure that each transaction is associated with the correct user.
  const setUserId = (userId) => {
    transactions.value.forEach((txn) => {
      txn.user_id = userId;
    });
  };

  // Add a message to a specific transaction
  //  Adds a new message to the specified transaction. The sender can be either 'user' or 'ai' to differentiate between messages sent by the user and the AI agent.
  const addMessage = (transaction_id, message, sender = 'user') => {
    const txn = transactions.value.find(
      (t) => t.transaction_id === transaction_id
    );
    if (txn) {
      txn.messages.push({
        message_id: uuidv4(),
        sender, // 'user' or 'ai'
        message,
        timestamp: new Date(),
      });
    }
  };

  // Get a transaction by ID
  // Retrieves a specific transaction based on its ID.
  const getTransaction = (transaction_id) => {
    return transactions.value.find(
      (t) => t.transaction_id === transaction_id
    );
  };

  // Initialize from localStorage
  const initializeChat = () => {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      transactions.value = JSON.parse(storedChats);
      // Set the active transaction to the last one
      if (transactions.value.length > 0) {
        activeTransactionId.value =
          transactions.value[transactions.value.length - 1].transaction_id;
      }
    } else {
      // If no chats exist, start a new one
      addTransaction();
    }
  };

  // Watch for changes and persist to localStorage
  watch(
    transactions,
    (newVal) => {
      localStorage.setItem('chats', JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    transactions,
    activeTransactionId,
    addTransaction,
    setUserId,
    addMessage,
    getTransaction,
    initializeChat,
  };
});
