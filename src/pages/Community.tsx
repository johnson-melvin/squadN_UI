import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UsersRound,
  MessageSquare,
  Calendar,
  Users,
  ChevronRight,
  Users2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AppSidebar from "@/components/AppSidebar";

// Updated demo content to make the wall feel more "real"
const groups = [
  {
    name: "Downtown Football (NYC)",
    members: 21,
    description: "Weekly games & banter at Central Park.",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=DFC",
  },
  {
    name: "Tennis Aces Squad",
    members: 13,
    description: "Court times, doubles pairs, memes 🎾",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=TAS",
  },
  {
    name: "Brooklyn Runners",
    members: 38,
    description: "Run and train together throughout Brooklyn. All levels.",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=BRUN",
  },
  {
    name: "Coney Volleyballers",
    members: 25,
    description: "Weekly pickup games, tournaments, and beach parties 🏐",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=CVOL",
  },
  {
    name: "Yoga Flow NYC",
    members: 19,
    description: "Stretch, breathe, and meet other yogis. Community for all.",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=YOGA",
  },
];

const discussions = [
  {
    title: "Who’s in this Friday for Football?",
    author: "Sam",
    replies: 6,
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    title: "Need tennis racquet recommendations",
    author: "Priya",
    replies: 3,
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
  },
  {
    title: "Any runners interested in a Sunday 10K?",
    author: "Lucas Kim",
    replies: 13,
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    title: "Shoutout: volleyball league photos uploaded!",
    author: "Fiona",
    replies: 8,
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
];

const Community = () => {
  const [tab, setTab] = useState<"groups" | "discussions" | "events">("groups");
  const navigate = useNavigate();

  function handleJoin(group) {
    toast({ title: "Joined Group", description: `You've joined "${group.name}"!` });
  }

  function handleView(group) {
    navigate("/community-view");
  }

  // Main accent is orange; backgrounds are cream/white, secondaries are gold/green.
  return (
    <main className="w-full min-h-screen bg-background font-fb flex flex-col pt-20">
      <div className="flex-1 flex justify-center items-stretch w-full">
        <div className="hidden md:block">
          <AppSidebar
            sports={[
              { name: "Football", icon: <UsersRound size={20} /> },
              { name: "Basketball", icon: <UsersRound size={20} /> },
              { name: "Tennis", icon: <UsersRound size={20} /> },
            ]}
            selectedSport="Football"
            onSelect={() => {}}
            onAddSport={() => {}}
          />
        </div>
        <section className="flex-1 flex flex-col w-full items-center max-w-3xl mx-auto px-2 md:px-0 py-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 w-full md:justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-1 md:mb-0 text-center md:text-left">
              Community
            </h1>
            <div className="ml-auto flex gap-2">
              <Button
                onClick={() => setTab("groups")}
                variant={tab === "groups" ? "default" : "outline"}
                className={`rounded-lg shadow ${tab === "groups"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-primary/70 text-primary hover:bg-background"
                }`}
                size="sm"
              >
                <UsersRound className="mr-1" size={16} /> Groups
              </Button>
              <Button
                onClick={() => setTab("discussions")}
                variant={tab === "discussions" ? "default" : "outline"}
                className={`rounded-lg shadow ${tab === "discussions"
                  ? "bg-success text-white hover:bg-success/90"
                  : "border-success/70 text-success hover:bg-background"
                }`}
                size="sm"
              >
                <MessageSquare className="mr-1" size={16} /> Discussions
              </Button>
              <Button
                onClick={() => setTab("events")}
                variant={tab === "events" ? "default" : "outline"}
                className={`rounded-lg shadow ${tab === "events"
                  ? "bg-accent text-primary hover:bg-accent/90"
                  : "border-accent/70 text-accent hover:bg-background"
                }`}
                size="sm"
              >
                <Calendar className="mr-1" size={16} /> Events
              </Button>
            </div>
          </div>
          {/* Tab content */}
          <div className="w-full">
          {tab === "groups" && (
            <div className="flex flex-col gap-7">
              {groups.map((g) => (
                <div key={g.name} className="relative bg-surface rounded-xl border border-border shadow group flex items-center px-5 py-4 md:gap-5 gap-3 hover:shadow-2xl hover:bg-accent/60 duration-200 transition-all animate-scale-in">
                  <img src={g.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-primary" alt={g.name} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-text">{g.name}</div>
                    <div className="text-xs text-primary/70">{g.members} members</div>
                    <div className="text-sm text-text-muted mt-1">{g.description}</div>
                  </div>
                  <Button size="sm" variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border border-success transition-transform hover:scale-105" onClick={() => handleJoin(g)}>
                    <Users2 className="mr-1" size={16} /> Join Group
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-accent/30 transition-transform hover:scale-105" onClick={() => handleView(g)}>
                    <ChevronRight className="mr-1" size={16} /> View
                  </Button>
                </div>
              ))}
              <Button className="w-full mt-3 py-4 text-base rounded-xl shadow-md bg-accent/60 text-primary hover:bg-accent/90" variant="secondary">
                <Plus className="mr-1" size={18} /> Create New Group
              </Button>
            </div>
          )}
          {tab === "discussions" && (
            <div className="flex flex-col gap-7">
              {discussions.map((d) => (
                <div key={d.title} className="flex items-center rounded-2xl bg-surface border border-border shadow-lg px-7 py-5 md:py-6 gap-5 animate-fade-in">
                  <img src={d.avatar} alt={d.author} className="w-14 h-14 rounded-full border-2 border-accent" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-primary text-base">{d.title}</div>
                    <div className="text-xs text-text-muted">By {d.author} • {d.replies} replies</div>
                  </div>
                  <Button size="sm" variant="secondary" className="bg-accent/40 hover:bg-accent/60 text-primary transition-transform hover:scale-105">
                    <ChevronRight className="mr-1" size={16} /> View Thread
                  </Button>
                </div>
              ))}
              <Button className="w-full mt-3 py-4 text-base rounded-xl shadow-md bg-accent/60 text-primary hover:bg-accent/90" variant="secondary">
                <Plus className="mr-1" size={18} /> Start New Thread
              </Button>
            </div>
          )}
          {tab === "events" && (
            <div className="rounded-2xl py-16 bg-surface border border-border shadow-inner flex items-center justify-center mt-8 text-primary/60 font-semibold tracking-wide text-xl text-center animate-fade-in">
              Community events coming soon!
            </div>
          )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Community;
