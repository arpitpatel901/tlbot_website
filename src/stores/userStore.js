// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null);
  const channels = ref([]);
  const activeChannelId = ref(null);
  const messages = ref([]);

  const chatSessions = ref([]);
  const activeChatSessionId = ref(null);

  // Actions

  // User initialization and authentication
  const initializeUser = async () => {
    try {
      const response = await axios.get('/api/protected/user');
      user.value = response.data;
      console.log("userStore: User initialized:", user.value);
      await fetchChannels();
    } catch (error) {
      console.error('userStore: User not authenticated:', error);
      user.value = null;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      console.log("userStore: User logged out");
    } catch (error) {
      console.error('userStore: Error during logout:', error);
    }
    clearUser();
  };

  const clearUser = () => {
    user.value = null;
    channels.value = [];
    activeChannelId.value = null;
    messages.value = [];
    chatSessions.value = [];
    activeChatSessionId.value = null;
    localStorage.clear();
    console.log("userStore: User state cleared");
  };

  // Channel-related functions
  const fetchChannels = async () => {
    try {
      const response = await axios.get('/api/channels');
      channels.value = response.data;
      console.log("userStore: Channels fetched:", channels.value);
    } catch (error) {
      console.error('userStore: Error fetching channels:', error);
    }
  };

  const createChannel = async (name, description) => {
    try {
      console.log("userStore: Creating channel:", name);
      const response = await axios.post('/api/channels', { name, description });
      channels.value.push(response.data);
      console.log("userStore: Channel created:", response.data);
      await setActiveChannel(response.data._id);
    } catch (error) {
      console.error('userStore: Error creating channel:', error);
    }
  };

  const setActiveChannel = async (channelId) => {
    activeChannelId.value = channelId;
    console.log(`userStore: Active channel set to ID: ${channelId}`);
    await fetchMessages(channelId);
  };

  const fetchMessages = async (channelId) => {
    try {
      console.log(`userStore: Fetching messages for channel ID: ${channelId}`);
      const response = await axios.get(`/api/channels/${channelId}/messages`);
      messages.value = response.data;
      console.log("userStore: Messages fetched:", messages.value);
    } catch (error) {
      console.error('userStore: Error fetching messages:', error);
    }
  };

  const sendMessage = async (content) => {
    if (!activeChannelId.value) {
      console.log("userStore: No active channel selected");
      return;
    }

    try {
      console.log("userStore: Sending message to channel:", activeChannelId.value);
      const response = await axios.post(`/api/channels/${activeChannelId.value}/messages`, { content });
      messages.value.push(response.data);  // Add the new message to the messages array
      console.log("userStore: Message sent:", response.data);
    } catch (error) {
      console.error("userStore: Error sending message:", error);
    }
  };

  // Chat session-related functions
  const initializeNewChat = () => {
    const newSessionId = uuidv4();
    const newSession = {
      id: newSessionId,
      date: new Date().toISOString().split('T')[0],
      lastMessageTimestamp: null,
      lastMessage: '',
      messages: [],
    };
    chatSessions.value.push(newSession);
    setActiveChatSession(newSessionId);
    persistChatSessions();
    console.log("userStore: New chat session initialized:", newSession);
  };

  const setActiveChatSession = (sessionId) => {
    activeChatSessionId.value = sessionId;
    localStorage.setItem('activeChatSessionId', sessionId);
    console.log(`userStore: Active chat session set to ID: ${sessionId}`);
  };

  const addMessageToSession = (sessionId, message, type = 'user') => {
    if (!sessionId) {
      console.error('userStore: addMessageToSession: sessionId is null or undefined.');
      return;
    }

    const session = chatSessions.value.find((s) => s.id === sessionId);

    if (session) {
      if (!session.messages || !Array.isArray(session.messages)) {
        session.messages = [];
      }

      const newMessage = {
        messageId: uuidv4(),
        message: message,
        type: type,
        timestamp: new Date().toISOString(),
      };

      session.messages.push(newMessage);
      session.lastMessage = message;
      session.lastMessageTimestamp = newMessage.timestamp;

      persistChatSessions();
      console.log(`userStore: Message added to session ${sessionId}:`, newMessage);
    } else {
      console.error(`userStore: addMessageToSession: No session found with ID ${sessionId}`);
    }
  };

  const persistChatSessions = () => {
    try {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions.value));
      localStorage.setItem('activeChatSessionId', activeChatSessionId.value);
      console.log("userStore: Chat sessions persisted to localStorage");
    } catch (error) {
      console.error('userStore: Error persisting chatSessions to localStorage:', error);
    }
  };

  const initializeChatSessions = () => {
    const storedChatSessions = localStorage.getItem('chatSessions');
    if (storedChatSessions) {
      chatSessions.value = JSON.parse(storedChatSessions);
      console.log("userStore: Chat sessions loaded from localStorage:", chatSessions.value);
    }

    const storedActiveChatSessionId = localStorage.getItem('activeChatSessionId');
    if (storedActiveChatSessionId) {
      activeChatSessionId.value = storedActiveChatSessionId;
      console.log(`userStore: Active chat session loaded from localStorage: ${activeChatSessionId.value}`);
    }
  };

  // Call initializeChatSessions when store is created
  initializeChatSessions();

  // Return all necessary state and actions
  return {
    user,
    channels,
    activeChannelId,
    messages,
    chatSessions,
    activeChatSessionId,
    initializeUser,
    logout,
    clearUser,
    fetchChannels,
    createChannel,
    setActiveChannel,
    fetchMessages,
    sendMessage,
    initializeNewChat,
    setActiveChatSession,
    addMessageToSession,
  };
});
