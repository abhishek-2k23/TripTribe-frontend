// types/discussion.ts

export interface ChatUser {
  _id: string;
  name: string;
  imageUrl?: string;
}

export interface Message {
  _id: string;
  trip: string;
  sender: ChatUser;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface TypingStatus {
  userName: string;
  isTyping: boolean;
  tripId: string;
}

// API Response Types
export interface GetMessagesResponse {
  success: boolean;
  data: Message[];
}

export interface SendMessageResponse {
  success: boolean;
  data: Message;
}

export interface GroupedMessages {
  date: string;
  messages: Message[];
}