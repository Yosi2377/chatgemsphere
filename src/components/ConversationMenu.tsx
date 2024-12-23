import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Conversation {
  id: string;
  name: string;
}

interface ConversationMenuProps {
  conversations: Conversation[];
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onClear: (id: string) => void;
}

const ConversationMenu: React.FC<ConversationMenuProps> = ({
  conversations,
  onRename,
  onDelete,
  onSelect,
  onClear,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const handleRename = (id: string) => {
    onRename(id, newName);
    setEditingId(null);
    setNewName("");
  };

  return (
    <div className="conversation-menu">
      {conversations.map((conversation) => (
        <ContextMenu key={conversation.id}>
          <ContextMenuTrigger asChild>
            <Link to={`/conversation/${conversation.id}`} onClick={() => onSelect(conversation.id)}>
              <div className="conversation-item">
                {editingId === conversation.id ? (
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={() => handleRename(conversation.id)}
                    autoFocus
                  />
                ) : (
                  <span>{conversation.name}</span>
                )}
              </div>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => setEditingId(conversation.id)}>
              Rename
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => onDelete(conversation.id)}>
              Delete
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => onClear(conversation.id)}>
              Clear
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};

export default ConversationMenu;
