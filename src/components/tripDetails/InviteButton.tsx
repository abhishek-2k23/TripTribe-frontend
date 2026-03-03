import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";

interface InviteButtonProps {
  inviteCode: string;
}

export default function InviteButton({
  inviteCode,
}: InviteButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      toast.success("Invite code copied!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      variant="hero"
      className="relative overflow-hidden w-32 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={hovered ? handleCopy : undefined}
    >
      {/* Default View */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
          hovered ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <UserPlus size={16} />
        Invite
      </div>

      {/* Hover View */}
      <div
        className={`absolute inset-0 flex items-center justify-between px-3 transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <span className="font-mono text-sm truncate">
          {inviteCode}
        </span>

        {copied ? (
          <Check size={16} />
        ) : (
          <Copy size={16} />
        )}
      </div>
    </Button>
  );
}