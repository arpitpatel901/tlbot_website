// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null);
  const chatSessions = ref([]);
  const activeChatSessionId = ref(null);

  // Actions

  /**
   * Initializes the user from localStorage if available.
   * Ensures each chat session has a 'messages' array.
   */
  const initializeUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }

    const storedChatSessions = localStorage.getItem('chatSessions');
    if (storedChatSessions) {
      chatSessions.value = JSON.parse(storedChatSessions);
      // Ensure each chatSession has a 'messages' array
      chatSessions.value.forEach(session => {
        if (!session.messages || !Array.isArray(session.messages)) {
          session.messages = [];
        }
      });
      persistChatSessions(); // Persist any changes made
    }

    const storedActiveChatSessionId = localStorage.getItem('activeChatSessionId');
    if (storedActiveChatSessionId) {
      activeChatSessionId.value = storedActiveChatSessionId;
    }
  };

  /**
   * Sets the user data and persists it to localStorage.
   * @param {Object} userData - The user data to set.
   */
  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Clears the user data and removes it from localStorage.
   */
  const clearUser = () => {
    user.value = null;
    chatSessions.value = [];
    activeChatSessionId.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('chatSessions');
    localStorage.removeItem('activeChatSessionId');
  };

  /**
   * Sets the active chat session by its ID.
   * @param {string} sessionId - The ID of the chat session to set as active.
   */
  const setActiveChatSession = (sessionId) => {
    activeChatSessionId.value = sessionId;
    localStorage.setItem('activeChatSessionId', sessionId);
  };

  /**
   * Initializes a new chat session and sets it as active.
   */
  const initializeNewChat = () => {
    const newSessionId = uuidv4();
    const newSession = {
      id: newSessionId,
      date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      lastMessageTimestamp: null,
      lastMessage: '',
      persona_id: null, // Assign a persona if applicable
      sharedStatus: 'Private',
      messages: [], // Initialize messages array
      // Add other necessary properties
    };
    chatSessions.value.push(newSession);
    setActiveChatSession(newSessionId);
    persistChatSessions();
  };

  /**
   * Adds a message to a specific chat session.
   * Initializes the 'messages' array if it's missing.
   * @param {string} sessionId - The ID of the chat session.
   * @param {string} message - The message content.
   * @param {string} type - The type of the message ('user' or 'assistant').
   */
  const addMessageToSession = (sessionId, message, type = 'user') => {
    console.log(`Attempting to add message to session ID: ${sessionId}`);
    
    if (!sessionId) {
      console.error("addMessageToSession: sessionId is null or undefined.");
      return;
    }

    const session = chatSessions.value.find(s => s.id === sessionId);
    
    if (session) {
      console.log(`Session found:`, session);
      
      // Defensive coding: Initialize 'messages' if undefined
      if (!session.messages || !Array.isArray(session.messages)) {
        console.warn(`addMessageToSession: 'messages' array missing for session ID ${sessionId}. Initializing it.`);
        session.messages = [];
        console.log(`Initialized 'messages' array for session ID ${sessionId}. Current messages:`, session.messages);
      }

      const newMessage = {
        messageId: uuidv4(),
        message: message,
        type: type, // 'user' or 'assistant'
        timestamp: new Date().toISOString(),
      };
      
      console.log(`Adding message to session ${sessionId}:`, newMessage);
      session.messages.push(newMessage);
      console.log(`Current messages in session ${sessionId}:`, session.messages);
      
      session.lastMessage = message;
      session.lastMessageTimestamp = newMessage.timestamp;
      
      persistChatSessions();
    } else {
      console.error(`addMessageToSession: No session found with ID ${sessionId}`);
    }
  };
  
  

  /**
   * Persists chat sessions to localStorage.
   */
  const persistChatSessions = () => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions.value));
    localStorage.setItem('activeChatSessionId', activeChatSessionId.value);
  };

  return {
    user,
    chatSessions,
    activeChatSessionId,
    initializeUser,
    setUser,
    clearUser,
    setActiveChatSession,
    initializeNewChat,
    addMessageToSession,
  };
});
