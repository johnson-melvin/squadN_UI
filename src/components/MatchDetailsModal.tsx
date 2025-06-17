
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UsersRound, MapPin, Clock3, Calendar, Medal } from "lucide-react";

type Match = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  players: number;
  maxPlayers: number;
  host: string;
  hostAvatar: string;
};

interface Props {
  match: Match;
  open: boolean;
  onClose: () => void;
}

const MatchDetailsModal: React.FC<Props> = ({ match, open, onClose }) => {
  if (!match) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{match.title}</DialogTitle>
          <DialogDescription>{match.date} @ {match.time}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-3">
            <img src={match.hostAvatar} className="w-12 h-12 rounded-full border-2 border-blue-400" alt={match.host} />
            <span className="text-gray-300 text-xs">Host: {match.host}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={15} /> {match.date}
            <Clock3 size={15} className="ml-3" /> {match.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={15} /> {match.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <UsersRound size={15} /> {match.players} / {match.maxPlayers} joined
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetailsModal;
