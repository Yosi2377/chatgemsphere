import React from "react";
import { cn } from "@/lib/utils";

type Status = "disconnected" | "connecting" | "connected";

interface ConnectionStatusProps {
  status: Status;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          status === "connected" && "bg-accent animate-pulse",
          status === "connecting" && "bg-secondary animate-pulse",
          status === "disconnected" && "bg-destructive"
        )}
      />
      <span className="text-sm text-muted-foreground capitalize">{status}</span>
    </div>
  );
};