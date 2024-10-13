// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
  const initializeUser = async () => {
    try {
      const response = await axios.get('/api/protected/user');
      user.value = response.data;
    } catch (error) {
      console.error('User not authenticated:', error);
      user.value = null;
    }
  };

  /**
   * Clears the user data and removes it from localStorage.
   */
  const clearUser = () => {
    user.value = null;
    // Optionally, send a request to the server to destroy the session
    axios.post('/api/logout');
  };
  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    clearUser();
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
   * @param {string} [sessionId] - Optional session ID.
   */
  const initializeNewChat = (sessionId) => {
    const newSessionId = sessionId || uuidv4();
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
    if (!sessionId) {
      console.error("addMessageToSession: sessionId is null or undefined.");
      return;
    }

    const session = chatSessions.value.find(s => s.id === sessionId);

    if (session) {
      if (!session.messages || !Array.isArray(session.messages)) {
        session.messages = [];
      }

      const newMessage = {
        messageId: uuidv4(),
        message: message,
        type: type, // 'user' or 'assistant'
        timestamp: new Date().toISOString(),
      };

      session.messages.push(newMessage);
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
    try {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions.value));
      localStorage.setItem('activeChatSessionId', activeChatSessionId.value);
    } catch (error) {
      console.error("Error persisting chatSessions to localStorage:", error);
    }
  };

  return {
    user,
    chatSessions,
    activeChatSessionId,
    initializeUser,
    clearUser,
    setActiveChatSession,
    initializeNewChat,
    addMessageToSession,
    logout,
  };
});
