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
    <div
      className={cn(
        "flex w-full animate-fade-up p-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          role === "user"
            ? "bg-chat-user text-white"
            : role === "assistant"
            ? "bg-chat-assistant text-white"
            : "bg-chat-system text-white"
        )}
      >
        {isLoading ? (
          <span className="flex gap-1">
            <span className="animate-blink">.</span>
            <span className="animate-blink delay-100">.</span>
            <span className="animate-blink delay-200">.</span>
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
};