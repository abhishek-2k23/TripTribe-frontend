// components/Discussion/DiscussionPanel.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDiscussion from "@/hooks/useDiscussion";
import { ChatInput } from "./ChatInput";
// import { MessageBubble } from "./MessageBubble"; // Create this for cleaner code
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";

export default function DiscussionPanel() {
  const {
    messages,
    inputText,
    handleTyping,
    handleSendMessage,
    typingUsers,
    scrollRef,
    currentUser
  } = useDiscussion();

  const recentMessages = messages.slice(-5);

  return (
    <Card className="p-5 space-y-4 shadow-sm border-slate-200">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-slate-800">Discussion</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-navy hover:bg-slate-50 font-bold">
              View All
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] h-[85vh] flex flex-col p-0 rounded-3xl border-none shadow-2xl">
            <DialogHeader className="p-6 border-b bg-white">
              <DialogTitle className="text-xl font-bold text-slate-900">Trip Discussion</DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 p-6 bg-slate-50/30 overflow-y-scroll ">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <MessageBubble 
                    key={msg._id} 
                    message={msg} 
                    isMe={msg.sender._id === currentUser?._id} 
                  />
                ))}
                
                {/* Typing Indicator */}
                {typingUsers.length > 0 && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 italic animate-pulse ml-2">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                    {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
              

            <ChatInput 
              inputText={inputText}
              handleTyping={handleTyping}
              handleSendMessage={handleSendMessage}
              
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mini-Preview Logic */}
      {/* Mini Preview Section: Shows up to 5 messages */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {recentMessages.length > 0 ? (
          recentMessages.map((msg) => (
            <div key={msg._id} className="flex gap-2 items-start">
               <span className="font-bold text-xs text-slate-800 shrink-0">{msg.sender?.name}:</span>
               <p className="text-xs text-slate-600 line-clamp-2">{msg.text}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 italic">No messages yet.</p>
        )}
      </div>

      {/* ChatInput integrated into the small preview as well */}
      <div className="pt-2 border-t">
        <ChatInput 
          inputText={inputText}
          handleTyping={handleTyping}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </Card>
  );
}