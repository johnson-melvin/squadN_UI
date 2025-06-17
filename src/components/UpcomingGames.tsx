
import { Users, Trophy, Calendar, MapPin } from "lucide-react";

const games = [
  {
    sport: "Football",
    location: "Central Park Field 3",
    datetime: "Today, 6:00 PM",
    players: "8/11",
    status: "joining",
  },
  {
    sport: "Basketball",
    location: "Downtown Court",
    datetime: "Tomorrow, 4:00 PM",
    players: "6/10",
    status: "confirmed",
  },
];

const statusColors: Record<string, string> = {
  joining: "bg-gray-800 text-blue-200",
  confirmed: "bg-red-600/80 text-white",
};

const UpcomingGames = () => (
  <div className="rounded-2xl bg-[#10131a] px-8 py-7 mt-6 shadow-md w-full">
    <div className="text-white text-xl font-semibold mb-2">Upcoming Games</div>
    <div className="text-gray-400 mb-6 text-sm">Your scheduled matches and games you're interested in</div>
    <div className="flex flex-col gap-3">
      {games.map((g, i) => (
        <div key={i} className="flex items-center gap-5 rounded-xl bg-[#181c23] px-5 py-4">
          {/* Sport Icon */}
          <div className="mr-2"><Trophy size={28} className="text-gray-400" /></div>
          <div className="flex flex-col flex-1 gap-1">
            <div className="text-base font-semibold text-white">{g.sport}</div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <MapPin size={14} className="inline mr-1" />
              <span>{g.location}</span>
              <Calendar size={14} className="inline ml-3 mr-1" />
              <span>{g.datetime}</span>
              <Users size={14} className="inline ml-3 mr-1" />
              <span>{g.players}</span>
            </div>
          </div>
          <div>
            <span className={`px-4 py-1 text-xs font-semibold rounded-full capitalize ${statusColors[g.status]}`}>{g.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingGames;
