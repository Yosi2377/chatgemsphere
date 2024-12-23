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
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import ConversationMenu from "@/components/ConversationMenu";
import APIPage from "./APIPage";
import DocAPIPage from "./DocAPIPage";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Conversation = {
  id: string;
  name: string;
  messages: Message[];
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("geminiApiKey") || "");
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [geminiModel, setGeminiModel] = useState<any>(null);
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

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

    if (!currentConversationId) {
      toast({
        title: "No Conversation Selected",
        description: "Please select a conversation to send a message.",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(geminiModel, message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, { role: "user", content: message }, { role: "assistant", content: response }] }
            : conv
        )
      );
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

  const handleAddConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      name: "New Conversation",
      messages: [],
    };
    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversationId(newConversation.id);
  };

  const handleRenameConversation = (id: string, newName: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, name: newName } : conv
      )
    );
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    const selectedConversation = conversations.find((conv) => conv.id === id);
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
    } else {
      setMessages([]);
    }
  };

  const handleClearConversation = () => {
    if (currentConversationId) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId ? { ...conv, messages: [] } : conv
        )
      );
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          <Link to="/">Yossi Chat</Link>
        </h1>
        <div className="flex items-center gap-4">
          <ConnectionStatus status={status} />
          <SettingsDialog apiKey={apiKey} onApiKeyChange={setApiKey} />
          <DarkModeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r">
          <ConversationMenu
            conversations={conversations}
            onRename={handleRenameConversation}
            onDelete={handleDeleteConversation}
            onSelect={handleSelectConversation}
            onClear={handleClearConversation}
          />
          <Button onClick={handleAddConversation}>Add Conversation</Button>
          <Button onClick={handleClearConversation}>Clear Conversation</Button>
          <nav>
            <ul>
              <li>
                <Link to="/api">API Page</Link>
              </li>
              <li>
                <Link to="/doc-api">Documentation API Page</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <Routes>
            <Route path="/api" element={<APIPage />} />
            <Route path="/doc-api" element={<DocAPIPage />} />
            <Route path="/" element={
              <>
                {messages.map((message, index) => (
                  <ChatMessage key={index} {...message} />
                ))}
                {isLoading && (
                  <ChatMessage role="assistant" content="" isLoading={true} />
                )}
              </>
            } />
          </Routes>
        </main>
      </div>

      <footer className="border-t">
        <ChatInput onSend={handleSend} disabled={isLoading || !apiKey} />
      </footer>
    </div>
  );
};

export default Index;
