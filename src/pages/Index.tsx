import React, { useState, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useToast } from "@/components/ui/use-toast";
import { createGeminiClient, generateResponse } from "@/utils/geminiClient";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes"; // Pf0af

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("geminiApiKey") || "");
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [geminiModel, setGeminiModel] = useState<any>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // Peb86

  useEffect(() => {
    if (apiKey) {
      try {
        setStatus("connecting");
        const model = createGeminiClient(apiKey);
        setGeminiModel(model);
        setStatus("connected");
        localStorage.setItem("geminiApiKey", apiKey);
      } catch (error) {
        console.error('Error initializing Gemini:', error);
        setStatus("disconnected");
        toast({
          title: "Connection Error",
          description: "Failed to initialize Gemini API. Please check your API key.",
          variant: "destructive",
        });
      }
    } else {
      setStatus("disconnected");
      setGeminiModel(null);
    }
  }, [apiKey, toast]);

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

    try {
      const response = await generateResponse(geminiModel, message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast({
        title: "Error",
        description: "Failed to get response from Gemini API. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const toggleTheme = () => { // Peb86
    setTheme(theme === "dark" ? "light" : "dark"); // Peb86
  }; // Peb86

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI Chat
        </h1>
        <div className="flex items-center gap-4">
          <ConnectionStatus status={status} />
          <SettingsDialog apiKey={apiKey} onApiKeyChange={setApiKey} />
          <Button variant="ghost" size="icon" onClick={toggleTheme}> // Pdc85
            {theme === "dark" ? "Light Mode" : "Dark Mode"} // Pdc85
          </Button> // Pdc85
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
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
