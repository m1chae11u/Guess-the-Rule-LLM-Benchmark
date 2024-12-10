import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const PLAYER_OPTIONS = [
  { id: "user", name: "User (Self)", description: "Play the game yourself" },
  { id: "gpt4o", name: "GPT-4o", description: "Most capable OpenAI model" },
  { id: "gpt4o-mini", name: "GPT-4o Mini", description: "Faster OpenAI model" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", description: "Fast and efficient" },
  { id: "claude-3.5-haiku", name: "Claude 3.5 Haiku", description: "Latest Anthropic model" },
];

const DOMAIN_OPTIONS = [
  { id: "natural-language", name: "Natural Language" },
  { id: "lexical", name: "Lexical" },
  { id: "math", name: "Math" },
];

const DIFFICULTY_OPTIONS = [
  { id: "l1", name: "L1", description: "Basic difficulty" },
  { id: "l2", name: "L2", description: "Intermediate difficulty" },
  { id: "l3", name: "L3", description: "Advanced difficulty" },
];

interface ConversationSetupProps {
  onStart: (domain: string, difficulty: string, player: string, isDynamic: boolean) => void;
}

export const ConversationSetup = ({ onStart }: ConversationSetupProps) => {
  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isDynamic, setIsDynamic] = useState(false);

  const handleStart = () => {
    if (domain && difficulty && selectedPlayer) {
      onStart(domain, difficulty, selectedPlayer, isDynamic);
    }
  };

  return (
    <div className="animate-fade-in-slow space-y-6 w-full max-w-md mx-auto p-6 glass-panel hover:shadow-lg transition-shadow duration-300 bg-white/30 backdrop-blur-md border border-white/20">
      <div className="space-y-2">
        <label className="text-sm font-medium">Domain</label>
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all text-left">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            {DOMAIN_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id} className="text-left">
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Difficulty</label>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all text-left">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {DIFFICULTY_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id} className="text-left">
                <div className="flex flex-col">
                  <span>{option.name}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Select Player</label>
        <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
          <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all text-left">
            <SelectValue placeholder="Choose who will play" />
          </SelectTrigger>
          <SelectContent>
            {PLAYER_OPTIONS.map((player) => (
              <SelectItem key={player.id} value={player.id} className="text-left">
                <div className="flex flex-col">
                  <span>{player.name}</span>
                  <span className="text-xs text-muted-foreground">{player.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="dataset-type"
            checked={isDynamic}
            onCheckedChange={setIsDynamic}
          />
          <label htmlFor="dataset-type" className="text-sm font-medium">
            Dynamic Dataset
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help transition-colors hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent 
                side="right"
                className="max-w-xs bg-white/90 backdrop-blur-sm"
              >
                <p>Static datasets are predefined and pre-vetted by us. Dynamic datasets will be generated on the fly by our LLM, powered by OpenAI's GPT models, based on the game rule.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Button 
        onClick={handleStart}
        disabled={!domain || !difficulty || !selectedPlayer}
        className="w-full transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary/90 hover:bg-primary"
      >
        Start Game
      </Button>
    </div>
  );
};