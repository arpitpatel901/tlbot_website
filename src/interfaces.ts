// src/interfaces.ts
export interface BackendChatSession {
    id: number;
    lastMessageTimestamp: string;
    lastMessage: string;
    persona_id: number;
    sharedStatus: 'Public' | 'Private';
    // Add other properties as needed
  }
  
  export interface BackendMessage {
    messageId: number;
    message: string;
    type: 'assistant' | 'user' | 'error';
    timestamp: string;
    // Add other properties like files, documents, etc.
  }
  
  export interface Persona {
    id: number;
    name: string;
    user_id: number;
    // Add other properties as needed
  }
  