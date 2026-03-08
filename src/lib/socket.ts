// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

// Use your backend URL from environment variables
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Export a single socket instance
export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,  
  transports: ["websocket"], 
});