import { useState } from "react";
import {
  Calendar,
  UsersRound,
  MapPin,
  Clock3,
  Medal,
  Check,
  ChevronRight,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import MatchDetailsModal from "@/components/MatchDetailsModal";
import SportsSidebar, { SportType } from "@/components/SportsSidebar";
import AppSidebar from "@/components/AppSidebar";

const matchesUpcoming = [
  {
    id: 1,
    title: "Sunday Morning Football",
    date: "2025-06-22",
    time: "08:00 AM",
    location: "Central Park Field 2",
    players: 7,
    maxPlayers: 12,
    host: "Alex Lee",
    hostAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Mixed Doubles Tennis",
    date: "2025-06-18",
    time: "05:30 PM",
    location: "Riverside Courts",
    players: 3,
    maxPlayers: 4,
    host: "Sophia Lin",
    hostAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    title: "Yoga in the Park",
    date: "2025-06-20",
    time: "07:00 AM",
    location: "Prospect Park East",
    players: 5,
    maxPlayers: 20,
    host: "Marta Paredes",
    hostAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    title: "Cricket Practice",
    date: "2025-06-22",
    time: "10:00 AM",
    location: "Chelsea Field",
    players: 10,
    maxPlayers: 22,
    host: "Patrick Song",
    hostAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: 6,
    title: "Sunset Volleyball",
    date: "2025-06-19",
    time: "06:30 PM",
    location: "Coney Island Beach",
    players: 8,
    maxPlayers: 12,
    host: "Fiona Grant",
    hostAvatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
];

const matchesPast = [
  {
    id: 3,
    title: "Street Basketball",
    date: "2025-05-19",
    time: "06:20 PM",
    location: "Lakeview Sports",
    players: 8,
    maxPlayers: 10,
    host: "Jackson Wu",
    hostAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const defaultSports: SportType[] = [
  { name: "Football", icon: <UsersRound size={20} /> },
  { name: "Basketball", icon: <UsersRound size={20} /> },
  { name: "Tennis", icon: <UsersRound size={20} /> },
];

const Matches = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const matchList = tab === "upcoming" ? matchesUpcoming : matchesPast;
  const [modalMatch, setModalMatch] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sports, setSports] = useState<SportType[]>(defaultSports);
  const [selectedSport, setSelectedSport] = useState(defaultSports[0].name);

  function handleJoin(m: any) {
    toast({ title: "Joined Match", description: `You joined "${m.title}".` });
  }

  function handleDetails(m: any) {
    setModalMatch(m);
    setModalOpen(true);
  }

  return (
    <main className="w-full min-h-screen font-fb bg-background flex flex-col transition-colors duration-200 pt-20">
      <div className="flex-1 flex justify-center items-stretch w-full">
        <div className="hidden md:block">
          <AppSidebar
            sports={sports}
            selectedSport={selectedSport}
            onSelect={setSelectedSport}
            onAddSport={() =>
              setSports([
                ...sports,
                { name: `Sport ${sports.length + 1}`, icon: <UsersRound size={20} /> },
              ])
            }
          />
        </div>
        <div className="w-full flex flex-col items-center px-2 sm:px-5 pt-4 md:pt-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 mb-6 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-1 leading-tight text-center md:text-left">
                Matches
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setTab("upcoming")}
                variant={tab === "upcoming" ? "default" : "outline"}
                className={`rounded-lg shadow ${tab === "upcoming"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-primary/70 text-primary hover:bg-background"
                }`}
                size="sm"
              >
                <Calendar className="mr-1" size={16} />
                Upcoming
              </Button>
              <Button
                onClick={() => setTab("past")}
                variant={tab === "past" ? "default" : "outline"}
                className={`rounded-lg shadow ${tab === "past"
                  ? "bg-accent text-primary hover:bg-accent/80"
                  : "border-accent/70 text-accent hover:bg-background"
                }`}
                size="sm"
              >
                <History className="mr-1" size={16} />
                Past
              </Button>
            </div>
          </div>
          {/* Match List */}
          <div className="flex flex-col gap-7 w-full">
            {matchList.length > 0 ? (
              matchList.map(m => (
                <div
                  key={m.id}
                  className="rounded-2xl bg-surface border border-border shadow-lg hover:shadow-2xl flex flex-col md:flex-row md:items-center gap-4 px-7 py-5 md:py-6 transition-shadow animate-fade-in"
                >
                  <div className="flex items-center gap-3 min-w-[85px]">
                    <img
                      src={m.hostAvatar}
                      alt={m.host}
                      className="w-14 h-14 rounded-full border-2 border-primary object-cover"
                    />
                    <div>
                      <div className="text-xs text-text-muted">Host</div>
                      <div className="text-base font-semibold text-text">
                        {m.host}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold text-primary mb-0.5">
                      {m.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-primary/80 mb-1">
                      <span>
                        <Calendar className="inline mr-1" size={14} />
                        {m.date}
                      </span>
                      <span>
                        <Clock3 className="inline mr-1" size={14} />
                        {m.time}
                      </span>
                      <span>
                        <MapPin className="inline mr-1" size={14} />
                        {m.location}
                      </span>
                      <span>
                        <UsersRound className="inline mr-1" size={14} />
                        {m.players} / {m.maxPlayers} joined
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:ml-auto min-w-[120px]">
                    {tab === "upcoming" ? (
                      <Button
                        size="sm"
                        className="w-full bg-success/10 text-success hover:bg-success/20 border border-success transition-transform hover:scale-105"
                        onClick={() => handleJoin(m)}
                      >
                        <Check className="mr-1" size={16} /> Join
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full bg-accent/20 text-primary border border-accent hover:bg-accent/40 transition-transform hover:scale-105"
                      >
                        <Medal className="mr-1" size={16} /> Recreate Match
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary hover:bg-accent/30 transition-transform hover:scale-105"
                      onClick={() => handleDetails(m)}
                    >
                      <ChevronRight className="mr-1" size={16} /> Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl py-16 bg-surface border border-border shadow-inner flex items-center justify-center mt-8 text-primary/60 font-semibold tracking-wide text-xl text-center animate-fade-in">
                {tab === "upcoming"
                  ? "No upcoming matches. Try creating a new match!"
                  : "No past matches yet. Once you play, they'll show here."}
              </div>
            )}
            <MatchDetailsModal match={modalMatch} open={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Matches;
