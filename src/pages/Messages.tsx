
import React from "react";
import { MessageSquare, Users, Search, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoConversations = [
  {
    id: 1,
    name: "Priya Singh",
    lastMessage: "See you at 7pm at Central Park court! 🏐",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    unread: 2,
    time: "2m ago",
  },
  {
    id: 2,
    name: "Lucas Kim",
    lastMessage: "Awesome run today, let's go Sunday?",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    unread: 0,
    time: "25m ago",
  },
  {
    id: 3,
    name: "Sam D.",
    lastMessage: "Want to join our football group?",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    unread: 1,
    time: "1h ago",
  },
];

const Messages = () => {
  return (
    <main className="w-full min-h-screen bg-background font-fb flex flex-col pt-20 items-center">
      <section className="w-full max-w-2xl flex flex-col gap-6 px-2 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight text-center mb-4 flex items-center justify-center gap-2">
          <MessageSquare size={32} className="text-accent drop-shadow" />
          Messages
        </h1>
        {/* Search/Start New */}
        <div className="flex items-center gap-2 mb-2">
          <input
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2 text-base text-text placeholder:text-text-muted focus:ring-2 focus:ring-accent/40 outline-none"
            type="text"
            placeholder="Search chats or people..."
          />
          <Button size="sm" className="rounded-xl" variant="default">
            <Smile size={16} className="mr-1.5" /> New Chat
          </Button>
        </div>
        {/* Conversations */}
        <div className="bg-surface rounded-2xl shadow-md border border-border p-2 flex flex-col gap-2">
          {demoConversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-accent/10 transition shadow-sm ${
                conv.unread ? "bg-accent/10 border-l-4 border-accent" : ""
              }`}
            >
              <img
                src={conv.avatar}
                alt={conv.name}
                className="w-11 h-11 rounded-full border-2 border-primary object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[1.06rem] text-primary">{conv.name}</div>
                <div className="text-sm text-text-muted truncate">{conv.lastMessage}</div>
              </div>
              <div className="flex flex-col items-end gap-0">
                <span className="text-xs text-text-muted">{conv.time}</span>
                {conv.unread > 0 && (
                  <span className="mt-1 inline-block px-2 py-0.5 bg-accent text-white text-xs rounded-full font-semibold">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Friendly Banner */}
        <div className="rounded-2xl mt-6 text-center py-7 bg-gradient-to-r from-highlight/5 via-accent/5 to-primary/10 text-text font-semibold shadow-sm border border-muted text-base">
          <span className="text-primary">Messaging coming soon</span>
          {` — Quickly chat, organize matches & make friends across the globe!`}
        </div>
      </section>
    </main>
  );
};

export default Messages;

