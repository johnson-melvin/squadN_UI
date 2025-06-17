
import { useState } from "react";
import { Users, MapPin, MessageSquare, BadgePlus, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Map from "@/components/Map";
import SportsSidebar, { SportType } from "@/components/SportsSidebar";
import AppSidebar from "@/components/AppSidebar";

const players = [
  {
    name: "Alex Lee",
    skill: "Intermediate",
    sport: "Football",
    distance: "2.3 km",
    location: "Central Park",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    coords: { lng: -73.965355, lat: 40.782865 },
  },
  {
    name: "Sophia Lin",
    skill: "Beginner",
    sport: "Tennis",
    distance: "3.1 km",
    location: "Riverside Courts",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    coords: { lng: -73.9876, lat: 40.8004 },
  },
  {
    name: "Jackson Wu",
    skill: "Advanced",
    sport: "Basketball",
    distance: "1.5 km",
    location: "Lakeview Sports",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    coords: { lng: -73.9612, lat: 40.7968 },
  },
  {
    name: "Megan Cruz",
    skill: "Advanced",
    sport: "Volleyball",
    distance: "4.7 km",
    location: "Coney Island Beach",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    coords: { lng: -73.9767, lat: 40.5749 },
  },
  {
    name: "Liam Patel",
    skill: "Intermediate",
    sport: "Cricket",
    distance: "2.9 km",
    location: "Chelsea Field",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    coords: { lng: -73.9971, lat: 40.7470 },
  },
  {
    name: "Ava Chen",
    skill: "Beginner",
    sport: "Yoga",
    distance: "5.0 km",
    location: "Prospect Park",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    coords: { lng: -73.9697, lat: 40.6602 },
  },
  {
    name: "Joshua Miller",
    skill: "Intermediate",
    sport: "Basketball",
    distance: "3.2 km",
    location: "YMCA Downtown",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    coords: { lng: -73.9830, lat: 40.7145 },
  },
];

const defaultSports: SportType[] = [
  { name: "Football", icon: <Users size={20} /> },
  { name: "Basketball", icon: <Users size={20} /> },
  { name: "Tennis", icon: <Users size={20} /> },
];

const FindPlayers = () => {
  const [view, setView] = useState<"list" | "map">("list");
  const [filters, setFilters] = useState({
    search: "",
    sport: "Any Sport",
    skill: "Any Skill",
    distance: "Within 5km",
    location: "",
  });
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [sports, setSports] = useState<SportType[]>(defaultSports);
  const [selectedSport, setSelectedSport] = useState(defaultSports[0].name);

  // Filter logic (simulate)
  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation =
      !filters.location ||
      p.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSport =
      filters.sport === "Any Sport" || p.sport === filters.sport;
    const matchesSkill =
      filters.skill === "Any Skill" || p.skill === filters.skill;
    return matchesSearch && matchesSport && matchesSkill && matchesLocation;
  });

  function handleFilterChange(field: string, value: string) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <main className="w-full min-h-screen font-fb bg-background flex flex-col transition-colors duration-200 pt-20">
      <div className="flex-1 flex justify-center items-stretch w-full">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar
            sports={sports}
            selectedSport={selectedSport}
            onSelect={setSelectedSport}
            onAddSport={() =>
              setSports([
                ...sports,
                { name: `Sport ${sports.length + 1}`, icon: <Users size={20} /> },
              ])
            }
          />
        </div>
        {/* Main Content */}
        <div className="w-full flex flex-col items-center px-1 sm:px-4 pt-4 md:pt-8 max-w-3xl mx-auto">
          {/* Heading + Toggle */}
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 mb-6 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-1 leading-tight text-center md:text-left">
                Find Players Nearby
              </h1>
              <p className="text-sm text-muted mt-0 text-center md:text-left">
                Connect with fellow athletes in your area.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
                size="sm"
                className={`rounded-lg min-w-[92px] shadow ${view === "list"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-primary/70 text-primary hover:bg-background"
                }`}
              >
                <Users className="mr-1" size={16} />
                List View
              </Button>
              <Button
                variant={view === "map" ? "default" : "outline"}
                onClick={() => setView("map")}
                size="sm"
                className={`rounded-lg min-w-[92px] shadow ${view === "map"
                  ? "bg-success text-white hover:bg-success/90"
                  : "border-success/70 text-success hover:bg-background"
                }`}
              >
                <MapPin className="mr-1" size={16} />
                Map View
              </Button>
            </div>
          </div>
          {/* Filters */}
          <form
            className="w-full max-w-2xl flex flex-wrap gap-3 sm:gap-4 items-center justify-center bg-surface/90 rounded-2xl px-4 py-4 border border-accent/40 shadow mb-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              className="flex-grow min-w-[130px] max-w-[200px] bg-background border border-primary/40 text-text placeholder:text-muted focus:ring-2 focus:ring-primary/40"
              placeholder="Search players by name..."
              value={filters.search}
              onChange={e => handleFilterChange("search", e.target.value)}
            />
            <Select
              value={filters.sport}
              onValueChange={v => handleFilterChange("sport", v)}
            >
              <SelectTrigger className="w-full min-w-[110px] max-w-[140px] bg-background border border-primary/40 text-text focus:ring-2 focus:ring-primary/40">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Sport">Any Sport</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.skill}
              onValueChange={v => handleFilterChange("skill", v)}
            >
              <SelectTrigger className="w-full min-w-[110px] max-w-[140px] bg-background border border-primary/40 text-text focus:ring-2 focus:ring-primary/40">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Skill">Any Skill</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.distance}
              onValueChange={v => handleFilterChange("distance", v)}
            >
              <SelectTrigger className="w-full min-w-[110px] max-w-[140px] bg-background border border-accent text-text focus:ring-2 focus:ring-accent/40">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Within 5km">Within 5km</SelectItem>
                <SelectItem value="Within 10km">Within 10km</SelectItem>
                <SelectItem value="Within 25km">Within 25km</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full sm:w-[170px] flex items-center">
              <Input
                className="pl-8 bg-background border border-accent text-text placeholder:text-muted focus:ring-2 focus:ring-accent/40"
                placeholder="Enter location…"
                value={filters.location}
                onChange={e => handleFilterChange("location", e.target.value)}
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                <Locate size={16} />
              </div>
            </div>
            {view === "map" && (
              <Input
                className="w-full sm:w-[230px] bg-background border border-success/70 text-text focus:ring-2 focus:ring-success/40"
                placeholder="Mapbox Public Token"
                value={mapboxToken}
                onChange={e => setMapboxToken(e.target.value)}
                type="password"
                autoComplete="off"
              />
            )}
          </form>
          {/* List / Map */}
          <div className="flex-1 w-full flex flex-col pb-8 mt-1 animate-fade-in">
            {view === "list" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 w-full">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map(p => (
                    <div
                      key={p.name}
                      className="bg-white animate-scale-in rounded-2xl border border-accent shadow group flex flex-col items-start sm:flex-row sm:items-center p-4 py-6 gap-4 sm:gap-5 hover:shadow-xl hover:bg-success/5 transition-all duration-150"
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary mx-auto sm:mx-0"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1 font-semibold text-text text-base truncate">{p.name}</div>
                        <div className="text-xs text-primary/70">
                          {p.sport} &bull; {p.skill}
                        </div>
                        <div className="flex items-center text-xs text-primary mt-1">
                          <MapPin size={14} className="mr-1" />
                          {p.location} &mdash;
                          <span className="ml-1 text-accent">{p.distance}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2 sm:mt-0 ml-auto min-w-[120px] w-full sm:w-auto">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-success/20 text-success hover:bg-success/40 border border-success/70 font-semibold transition-transform duration-200 hover:scale-105 w-full"
                        >
                          <BadgePlus className="mr-1" size={16} /> Connect
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:bg-accent/50 border border-primary/20 transition-transform duration-200 hover:scale-105 w-full"
                        >
                          <MessageSquare className="mr-1" size={16} /> Message
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-primary/40 py-14 col-span-2 text-lg">
                    No players found. Try adjusting your filters!
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface h-[420px] md:h-[520px] shadow group flex flex-col items-center justify-center border border-accent mt-5">
                <Map
                  players={filteredPlayers.map(p => ({
                    name: p.name,
                    avatar: p.avatar,
                    coords: p.coords,
                  }))}
                  mapboxToken={mapboxToken}
                />
                <div className="absolute left-4 bottom-4 bg-accent/80 px-4 py-3 rounded-xl shadow text-text max-w-[260px] backdrop-blur font-semibold border border-accent/80">
                  See who's near you! Player locations update as more join.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindPlayers;
