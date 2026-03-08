import { create } from 'zustand';
import type { Message } from '@/types/discussion.types';

interface DiscussionState {
  messages: Message[];
  typingUsers: string[]; 
  isLoading: boolean;
  
  // Actions
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  
  // Typing Actions
  updateTypingStatus: (userName: string, isTyping: boolean) => void;
  clearTyping: () => void;
}

export const useDiscussionStore = create<DiscussionState>((set) => ({
  messages: [],
  typingUsers: [],
  isLoading: false,

  setMessages: (messages) => set({ messages }),
  
  addMessage: (msg: Message) => 
  set((state) => {
    // Check if the message ID is already in our array
    const exists = state.messages.some((m) => m._id === msg._id);
    if (exists) return state; // Do nothing if it's already there
    
    return { messages: [...state.messages, msg] };
  }),

  setLoading: (isLoading) => set({ isLoading }),

  updateTypingStatus: (userName, isTyping) => set((state) => {
    if (isTyping) {
      // Add user if not already in the list
      if (state.typingUsers.includes(userName)) return state;
      return { typingUsers: [...state.typingUsers, userName] };
    } else {
      // Remove user
      return { typingUsers: state.typingUsers.filter(u => u !== userName) };
    }
  }),

  clearTyping: () => set({ typingUsers: [] }),
}));