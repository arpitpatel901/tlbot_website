// src/stores/chatStore.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // Ensure this is installed: npm install uuid

export const useChatStore = defineStore('chat', () => {
  // === Original State ===
  const transactions = ref([]);
  const activeTransactionId = ref(null);

  // === New State ===
  const chatSessions = ref([]);
  const activeChatSessionId = ref(null);
  const completeMessageMap = ref({});
  const availablePersonas = ref([]);

  // === Original Actions ===
  
  /**
   * Add a new chat transaction.
   * Generates a unique transaction ID and initializes messages.
   */
  const addTransaction = () => {
    const newTransaction = {
      transaction_id: uuidv4(),
      user_id: null, // To be set upon user login
      messages: [],
    };
    transactions.value.push(newTransaction);
    activeTransactionId.value = newTransaction.transaction_id;
    return newTransaction.transaction_id;
  };

  /**
   * Set the user ID for all existing transactions.
   * @param {string} userId - The ID of the user.
   */
  const setUserId = (userId) => {
    transactions.value.forEach((txn) => {
      txn.user_id = userId;
    });
  };

  /**
   * Add a message to a specific transaction.
   * @param {string} transaction_id - The ID of the transaction.
   * @param {string} message - The message content.
   * @param {string} sender - The sender ('user' or 'ai').
   */
  const addMessageToTransaction = (transaction_id, message, sender = 'user') => {
    const txn = transactions.value.find(t => t.transaction_id === transaction_id);
    if (txn) {
      txn.messages.push({
        message_id: uuidv4(),
        sender,
        message,
        timestamp: new Date(),
      });
    }
  };

  /**
   * Retrieve a transaction by its ID.
   * @param {string} transaction_id - The ID of the transaction.
   * @returns {object|null} - The transaction object or null if not found.
   */
  const getTransaction = (transaction_id) => {
    return transactions.value.find(t => t.transaction_id === transaction_id) || null;
  };

  /**
   * Initialize chat sessions from localStorage or start a new one.
   */
  const initializeChat = () => {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      transactions.value = JSON.parse(storedChats);
      if (transactions.value.length > 0) {
        activeTransactionId.value = transactions.value[transactions.value.length -1].transaction_id;
      }
    } else {
      addTransaction();
    }
  };

  // === New Actions ===
  
  /**
   * Set the active chat session.
   * @param {number} sessionId - The ID of the chat session.
   */
  const setActiveChatSession = (sessionId) => {
    activeChatSessionId.value = sessionId;
    // Additional logic to fetch messages can be added here
  };

  /**
   * Add a new chat session.
   * @param {object} session - The chat session object.
   */
  const addChatSession = (session) => {
    chatSessions.value.push(session);
  };

  /**
   * Add a message to the completeMessageMap.
   * @param {object} message - The message object.
   */
  const addMessage = (message) => {
    if (message && message.messageId) {
      completeMessageMap.value[message.messageId] = message;
    }
  };

  /**
   * Set the selected persona.
   * @param {object} persona - The persona object.
   */
  const setSelectedPersona = (persona) => {
    // Implement logic to set selected persona
    // For example, you might set a currentPersona property or similar
  };

  /**
   * Update the shared status of a chat session.
   * @param {number} sessionId - The ID of the chat session.
   * @param {boolean} shared - The new shared status.
   */
  const updateChatSessionSharedStatus = (sessionId, shared) => {
    const session = chatSessions.value.find(s => s.id === sessionId);
    if (session) {
      session.sharedStatus = shared ? 'Public' : 'Private';
    }
  };

  // === Watchers ===
  
  /**
   * Watch for changes in transactions and persist them to localStorage.
   */
  watch(transactions, (newVal) => {
    localStorage.setItem('chats', JSON.stringify(newVal));
  }, { deep: true });

  /**
   * Watch for changes in completeMessageMap and persist them to localStorage.
   */
  watch(completeMessageMap, (newVal) => {
    localStorage.setItem('completeMessageMap', JSON.stringify(newVal));
  }, { deep: true });

  // === Initialize Chat on Store Creation ===
  
  initializeChat();

  // === Return State and Actions ===
  
  return {
    // === Original State ===
    transactions,
    activeTransactionId,
    addTransaction,
    setUserId,
    addMessageToTransaction,
    getTransaction,
    initializeChat,

    // === New State ===
    chatSessions,
    activeChatSessionId,
    completeMessageMap,
    availablePersonas,

    // === New Actions ===
    setActiveChatSession,
    addChatSession,
    addMessage,
    setSelectedPersona,
    updateChatSessionSharedStatus,
  };
});
