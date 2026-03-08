import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/types/discussion.types";
import { format, isValid } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}

export function MessageBubble({ message, isMe }: MessageBubbleProps) {
  // Safety check for Date
  const date = new Date(message.createdAt);
  const formattedTime = isValid(date) ? format(date, "hh:mm a") : "";

  // Safety check for Sender
  const senderName = message.sender?.name || "Unknown User";
  const senderImage = message.sender?.imageUrl;
  const initials = senderName.charAt(0).toUpperCase();

  return (
    <div className={`flex gap-3 w-full ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="w-8 h-8 shrink-0 border border-slate-100">
        <AvatarImage src={senderImage} />
        <AvatarFallback className="bg-slate-200 text-[10px] font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[75%]`}>
        {!isMe && (
          <span className="text-[10px] font-bold text-slate-500 ml-1 mb-1">
            {senderName}
          </span>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all ${
            isMe
              ? "bg-navy text-white rounded-tr-none"
              : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </div>

        {formattedTime && (
          <span className="text-[9px] text-slate-400 mt-1 px-1 lowercase">
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}