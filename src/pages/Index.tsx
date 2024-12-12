import React, { useState, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">(
    "disconnected"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (message: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key in the settings.",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    // Simulate API call (replace with actual Gemini API integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This is a simulated response." },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (apiKey) {
      setStatus("connecting");
      // Simulate API connection (replace with actual Gemini API check)
      setTimeout(() => {
        setStatus("connected");
      }, 1000);
    } else {
      setStatus("disconnected");
    }
  }, [apiKey]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI Chat
        </h1>
        <div className="flex items-center gap-4">
          <ConnectionStatus status={status} />
          <SettingsDialog apiKey={apiKey} onApiKeyChange={setApiKey} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && (
          <ChatMessage role="assistant" content="" isLoading={true} />
        )}
      </main>

      <footer className="border-t">
        <ChatInput onSend={handleSend} disabled={isLoading || !apiKey} />
      </footer>
    </div>
  );
};

export default Index;