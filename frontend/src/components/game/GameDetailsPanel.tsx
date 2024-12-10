import { Clock } from "lucide-react";

interface GameDetails {
  domain: string;
  difficulty: string;
  datasetType: string;
  startTime: Date;
  status: "ongoing" | "won" | "lost";
  turnsTaken: number;
}

interface GameDetailsPanelProps {
  details: GameDetails;
}

export const GameDetailsPanel = ({ details }: GameDetailsPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "text-blue-600";
      case "won":
        return "text-green-600";
      case "lost":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="glass-panel p-4 space-y-2 hover:shadow-lg transition-shadow duration-300 bg-gray-100/80 backdrop-blur-md border border-white/20">
      <h3 className="font-semibold text-lg mb-2 text-primary">Game Details</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="text-muted-foreground">Domain:</span>
        <span className="font-medium">{details.domain}</span>
        <span className="text-muted-foreground">Difficulty:</span>
        <span className="font-medium">{details.difficulty}</span>
        <span className="text-muted-foreground">Dataset:</span>
        <span className="font-medium">{details.datasetType}</span>
        <span className="text-muted-foreground">Status:</span>
        <span className={`font-medium ${getStatusColor(details.status)} animate-pulse`}>
          {details.status.charAt(0).toUpperCase() + details.status.slice(1)}
        </span>
      </div>
    </div>
  );
};