import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { GameDetailsPanel } from "./game/GameDetailsPanel";
import { GameStatsPanel } from "./game/GameStatsPanel";
import { ChatMessage } from "./game/ChatMessage";
import { ChatInput } from "./game/ChatInput";

interface Message {
  id: string;
  content: string;
  sender: string;
}

interface GameDetails {
  domain: string;
  difficulty: string;
  datasetType: string;
  startTime: Date;
  status: "ongoing" | "won" | "lost";
  turnsTaken: number;
}

interface ConversationDisplayProps {
  messages: Message[];
  isLoading: boolean;
  onReset: () => void;
  isUserPlaying: boolean;
  gameDetails: GameDetails;
}

export const ConversationDisplay = ({ 
  messages, 
  isLoading, 
  onReset,
  isUserPlaying,
  gameDetails
}: ConversationDisplayProps) => {
  const { toast } = useToast();
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const copyConversation = () => {
    const text = localMessages
      .map((msg) => `${msg.sender}: ${msg.content}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast({
      description: "Conversation copied to clipboard",
      duration: 2000,
    });
  };

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user"
    };
    
    const systemMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "I understand your guess. Let me evaluate that...",
      sender: "system"
    };
    
    setLocalMessages(prev => [...prev, userMessage, systemMessage]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GameDetailsPanel details={gameDetails} />
        <GameStatsPanel startTime={gameDetails.startTime} turnsTaken={gameDetails.turnsTaken} />
      </div>

      <div className="h-[500px] overflow-y-auto p-6 glass-panel space-y-4 hover:shadow-lg transition-shadow duration-300 bg-gray-100/80 backdrop-blur-md border border-white/20">
        {localMessages.map((message, index) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            sender={message.sender}
            index={index}
          />
        ))}
        {isLoading && (
          <div className="message-bubble mr-auto">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      {isUserPlaying && (
        <ChatInput onSendMessage={handleSendMessage} />
      )}

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={onReset}
          className="transition-all hover:scale-[1.02] active:scale-[0.98] bg-white/50 backdrop-blur-sm hover:bg-white/80"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Game
        </Button>
        <Button
          variant="outline"
          onClick={copyConversation}
          className="transition-all hover:scale-[1.02] active:scale-[0.98] bg-white/50 backdrop-blur-sm hover:bg-white/80"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Conversation
        </Button>
      </div>
    </div>
  );
};