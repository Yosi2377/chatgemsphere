import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isLoading,
}) => {
  return (
    <div className="chat-message">
      <div
        className={cn(
          "chat-bubble shadow-sm",
          role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto",
          role === "assistant" ? "bg-secondary text-secondary-foreground" : "",
          role === "system" ? "bg-muted text-muted-foreground" : "",
          isLoading ? "animate-pulse" : "animate-scale"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-current animate-blink" />
            <div className="w-2 h-2 rounded-full bg-current animate-blink delay-100" />
            <div className="w-2 h-2 rounded-full bg-current animate-blink delay-200" />
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-words">{content}</div>
        )}
      </div>
    </div>
  );
};