import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    onSendMessage(userInput);
    setUserInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your guess..."
        className="flex-1 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all"
      />
      <Button 
        type="submit" 
        disabled={!userInput.trim()}
        className="transition-all hover:scale-105 active:scale-95"
      >
        Send
      </Button>
    </form>
  );
};