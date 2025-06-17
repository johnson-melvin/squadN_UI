import React from "react";
import { UsersRound, MapPin, Calendar, Link2, MessageSquare, Heart } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type WallPostCardProps = {
  user: { name: string; avatar: string };
  sport?: string;
  sports?: string[];
  postedAt?: Date;
  date?: Date;
  message: string;
  image?: string;
  location?: string;
  levelOfPlay?: string;
  showLevel?: boolean;
  showConnect?: boolean;
  requestType?: "availability" | "request";
};

const getAccent = (type?: "availability" | "request") => {
  if (type === "availability") {
    return {
      bg: "bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400",
      text: "text-white",
      label: "Available to Connect",
      icon: <UsersRound size={12} className="mr-[3px]" />,
      trendy: true,
    };
  }
  if (type === "request") {
    return {
      bg: "bg-gradient-to-r from-orange-400 via-pink-500 to-red-500",
      text: "text-white",
      label: "Request to Connect",
      icon: <Link2 size={12} className="mr-[3px]" />,
      trendy: true,
    };
  }
  return null;
};

const WallPostCard: React.FC<WallPostCardProps> = ({
  user,
  sport,
  sports,
  postedAt,
  date,
  message,
  image,
  location,
  levelOfPlay,
  showLevel = true,
  showConnect = true,
  requestType,
}) => {
  const chipSport = sport || (sports && sports.length > 0 ? sports[0] : "");
  const isAvailability = !!chipSport && !!location && !!date;
  const trendAccent = getAccent(requestType || (isAvailability ? "availability" : undefined));
  const cardDate = date || postedAt || new Date();

  const handleConnect = () => {
    toast({ title: "Connect Request Sent", description: "They'll see your request soon!" });
  };
  const handleMessage = () => {
    toast({ title: "Coming Soon", description: "Direct messaging is in development." });
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#232745] border border-blue-100/30 dark:border-blue-900/20 shadow-lg w-full transition hover:shadow-2xl flex flex-col">

      {image && (
        <div className="w-full aspect-[16/8] bg-zinc-100 dark:bg-[#202338] rounded-t-2xl overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt="Post"
            className="w-full h-full object-cover object-center transition-all duration-150"
            style={{ minHeight: 100, maxHeight: 210, borderRadius: "0" }}
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 p-4 pt-3">
        {/* Trendy Label */}
        {trendAccent && (
          <span
            className={`inline-flex items-center px-2 py-[2px] rounded font-semibold text-xs ${trendAccent.bg} ${trendAccent.text} shadow mb-2`}
          >
            {trendAccent.icon} {trendAccent.label}
          </span>
        )}

        {/* User, Time, and Quick Info Row */}
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full border-2 border-blue-100 dark:border-blue-600 object-cover"
          />
          <div className="flex flex-col">
            <span className="font-bold text-blue-900 dark:text-blue-100 text-[13.2px] leading-tight">{user.name}</span>
            {/* Timestamp */}
            {postedAt && (
              <span className="text-neutral-500 dark:text-neutral-300 text-xs font-medium">
                {format(postedAt, "MMM d, yyyy • h:mm a")}
              </span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* Context Buttons */}
            <button
              className="rounded-full hover:bg-blue-100/40 transition p-1 text-blue-500"
              title="Message"
              type="button"
              onClick={handleMessage}
            >
              <MessageSquare size={16} />
            </button>
            <button
              className="rounded-full hover:bg-blue-100/60 transition p-1 text-pink-500"
              title="Like"
              type="button"
            >
              <Heart size={15} />
            </button>
          </div>
        </div>

        {/* Chips for Sport/Location/Time/Level */}
        <div className="flex flex-wrap gap-2 mb-1 mt-1">
          {chipSport && (
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-100 text-xs rounded-full font-semibold uppercase">{chipSport}</span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 text-xs rounded-full font-medium">
              <MapPin size={12} /> {location}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-700/20 text-blue-900 dark:text-indigo-100 text-xs rounded-full font-medium">
              <Calendar size={12} />
              {format(date, "MMM d, h:mm a")}
            </span>
          )}
          {showLevel && levelOfPlay && (
            <span className="inline-flex items-center px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 text-xs rounded-full font-semibold">
              Level: {levelOfPlay}
            </span>
          )}
        </div>

        {/* Message Content Area */}
        <div className="text-sm text-blue-900 dark:text-white whitespace-pre-line font-medium leading-tight mb-2">
          {/* AI-generated use-case content: */}
          {isAvailability ? (
            <>
              I am <span className="font-bold text-blue-700 dark:text-blue-200">{levelOfPlay || "available"}</span> to play
              {" "}
              <span className="font-bold underline">{chipSport}</span>
              {location && <> at <span className="font-semibold">{location}</span></>}
              {date && (
                <>
                  {" on "}
                  <span>{format(date, "eeee, MMM d")}</span>
                  {" at "}
                  <span className="font-bold">{format(date, "h:mm a")}</span>
                </>
              )}
              {message ? `: ${message}` : "."}
            </>
          ) : (
            <>
              {message}
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-0 mb-1 ml-0.5">
          {message
            .split(" ")
            .filter((w) => w.startsWith("#"))
            .map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-50 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer hover:underline"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      {/* Connect / CTA */}
      {showConnect && (
        <div className="flex justify-end items-center px-3 pb-2 pt-1 bg-gradient-to-r from-blue-100/70 via-white/95 to-blue-50/70 dark:from-blue-950/60 dark:via-blue-950/40 dark:to-blue-900/40 border-t border-blue-100/10 dark:border-blue-800/10">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-sm hover:scale-[1.04] transition-all text-xs focus:ring-1 ring-indigo-400 min-w-[84px]"
            title="Connect"
            onClick={handleConnect}
          >
            <UsersRound size={13} /> Connect
            {date && (
              <span className="ml-1 bg-blue-500/40 text-white text-xs px-1.5 py-0.5 rounded font-semibold tracking-tight">
                {format(date, "h:mm a")}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WallPostCard;
