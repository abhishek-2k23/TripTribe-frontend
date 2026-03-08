import { useApi } from "@/services/api"
import useTripDetailsStore from "@/store/useTripDetails"
import { useEffect, useRef, useState } from "react"
import { socket } from "@/lib/socket"
import { useDiscussionStore } from "@/store/useDiscussionStore"
import useAuthStore from "@/store/useAuthStore"
import type { Message } from "@/types/discussion.types"

const useDiscussion = () => {
  const api = useApi()
  const currentUser = useAuthStore((s) => s.backendUser);
  const [inputText, setInputText] = useState("")
  const tripId = useTripDetailsStore((s) => s.selectedTripId)
  
  const { messages, setMessages, addMessage, typingUsers, updateTypingStatus } = useDiscussionStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use this to let TS determine if it's a number (browser) or object (Node)
const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const [isTyping, setIsTyping] = useState(false);

const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setInputText(value);

  if (!currentUser) return;

  // 1. If not already marked as typing, tell the server
  if (!isTyping && value.length > 0) {
    setIsTyping(true);
    socket.emit("typing_start", { tripId, userName: currentUser.name });
  }

  // 2. Clear existing timer whenever the user types
  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  // 3. Set a new timer. If it finishes, the user has "stopped"
  typingTimeoutRef.current = setTimeout(() => {
    if (isTyping || value.length === 0) {
      socket.emit("typing_stop", { tripId });
      setIsTyping(false);
    }
  }, 2500); // 2.5 seconds of inactivity = stop
};

// Also update handleSendMessage to clear the status immediately
const handleSendMessage = async () => {
  if (!inputText.trim()) return;
  try {
    await api.post("/discussion/send", { tripId, text: inputText });
    setInputText("");
    
    // Clear typing status immediately on send
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit("typing_stop", { tripId });
    setIsTyping(false);
    
  } catch (e) {
    console.error(e);
  }
};

  // 1. Fetch History & Setup Sockets
  useEffect(() => {
    const fetchHistory = async () => {
      const res:any = await api.get(`/discussion/${tripId}`);
      setMessages(res.data);
    };

    if (tripId) fetchHistory();

    socket.on("new_discussion_message", (msg: Message) => addMessage(msg));
    socket.on("user_typing", ({ userName, isTyping }) => updateTypingStatus(userName, isTyping));

    return () => {
      socket.off("new_discussion_message");
      socket.off("user_typing");
    };
  }, [tripId]);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUsers]);

  return {
    inputText,
    setInputText,
    handleSendMessage,
    handleTyping,
    currentUser,
    messages,
    scrollRef,
    typingUsers,
    tripId,

  }
}

export default useDiscussion
