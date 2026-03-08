// components/Discussion/ChatInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

export function ChatInput({ inputText, handleTyping, handleSendMessage }: ChatInputProps) {
  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <Input
        value={inputText}
        onChange={handleTyping}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        placeholder="Message the group..."
        className="rounded-sm bg-slate-50 border-none focus-visible:ring-primary/80"
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={!inputText.trim()}
        className="rounded-full bg-primary hover:bg-primary/90 px-3 transition-all active:scale-95"
      >
        <Send size={18} />
      </Button>
    </div>
  );
}