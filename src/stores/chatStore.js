// src/stores/chatStore.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = defineStore('chat', () => {
  // === State ===
  const chatSessions = ref([]);
  const activeChatSessionId = ref(null);
  const completeMessageMap = ref({});
  const availablePersonas = ref([]);

  // === Actions ===
  const addChatSession = () => {
    const newSession = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0], // Group by date
      lastMessageTimestamp: null,
      lastMessage: '',
      persona_id: null, // Assign a persona if applicable
      sharedStatus: 'Private',
    };
    chatSessions.value.push(newSession);
    activeChatSessionId.value = newSession.id;
    console.log("Added new chat session:", newSession);
    return newSession.id;
  };

  const setActiveChatSession = (sessionId) => {
    activeChatSessionId.value = sessionId;
    console.log("Set activeChatSessionId to:", sessionId);
  };

  /**
   * Adds a message to the completeMessageMap.
   * @param {Object} message - The message object to add.
   */
  const addMessage = (message) => {
    if (message && message.messageId) {
      console.log("Adding message to store:", message);
      // Ensure reactivity by creating a new object
      completeMessageMap.value = {
        ...completeMessageMap.value,
        [message.messageId]: message,
      };

      // Update the last message of the session
      const session = chatSessions.value.find(s => s.id === message.transaction_id);
      if (session) {
        session.lastMessage = message.message;
        session.lastMessageTimestamp = message.timestamp;
      }
    }
  };

  const initializeChat = () => {
    const storedSessions = localStorage.getItem('chatSessions');
    if (storedSessions) {
      try {
        chatSessions.value = JSON.parse(storedSessions);
        if (chatSessions.value.length > 0) {
          activeChatSessionId.value = chatSessions.value[chatSessions.value.length -1].id;
          console.log("Initialized chat with existing sessions. Active session ID:", activeChatSessionId.value);
        }
      } catch (error) {
        console.error("Failed to parse chatSessions from localStorage:", error);
        chatSessions.value = [];
        addChatSession();
      }
    } else {
      addChatSession();
    }
  
    const storedMessages = localStorage.getItem('completeMessageMap');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        completeMessageMap.value = parsedMessages || {};
        console.log("Initialized completeMessageMap with stored messages.");
      } catch (error) {
        console.error("Failed to parse completeMessageMap from localStorage:", error);
        completeMessageMap.value = {};
      }
    } else {
      completeMessageMap.value = {};
    }
  };

  // === Watchers ===
  watch(chatSessions, (newVal) => {
    localStorage.setItem('chatSessions', JSON.stringify(newVal));
  }, { deep: true });

  watch(completeMessageMap, (newVal) => {
    localStorage.setItem('completeMessageMap', JSON.stringify(newVal));
  }, { deep: true });

  // === Initialize ===
  initializeChat();

  // === Return ===
  return {
    chatSessions,
    activeChatSessionId,
    completeMessageMap,
    availablePersonas,

    addChatSession,
    setActiveChatSession,
    addMessage,
  };
});
