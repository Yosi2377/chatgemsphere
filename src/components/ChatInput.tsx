import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="chat-input-container sticky bottom-0 bg-background border-t"
    >
      <div 
        className={cn(
          "relative flex w-full gap-2 p-2 rounded-lg transition-all duration-200",
          isFocused ? "shadow-lg" : "shadow-sm",
          disabled ? "opacity-50" : ""
        )}
      >
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message... (Press Enter to send)"
          className={cn(
            "min-h-[50px] max-h-[200px] pr-12 resize-none",
            "bg-background border rounded-lg",
            "focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-all duration-200"
          )}
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          className={cn(
            "send-button absolute right-4 bottom-4",
            "bg-primary hover:bg-primary/90",
            !message.trim() && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled || !message.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};