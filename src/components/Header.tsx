import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkle,
  Bell,
  Users,
  Calendar,
  MessageSquare,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Find Players", icon: <Search size={18} />, path: "/find-players" },
  { label: "Matches", icon: <Calendar size={18} />, path: "/matches" },
  { label: "Community", icon: <MessageSquare size={18} />, path: "/community" },
  { label: "Messages", icon: <MessageSquare size={18} />, path: "/messages" },
];

const Header = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-40 w-full px-2 md:px-7 py-0 flex items-center justify-between bg-primary text-white border-b border-[#2051e550] shadow-xl h-[64px]">
      {/* Logo + App Name (Logo clickable, links to dashboard) */}
      <Link to="/" className="flex items-center gap-2 select-none group">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-accent to-highlight flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-accent group-hover:scale-105 transition-transform">
          <Sparkle size={24} />
        </div>
        <span className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-accent transition-all">
          ESPN
        </span>
      </Link>
      {/* Main Nav */}
      <nav className="flex items-center gap-1 md:gap-2 ml-2 md:ml-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`group flex items-center px-3 py-2 rounded-xl font-semibold transition-all ${
              pathname === link.path
                ? "bg-highlight text-white shadow"
                : "text-white/90 hover:bg-accent/80 hover:text-white"
            }`}
          >
            <span className="mr-1">{link.icon}</span>
            <span className="font-medium hidden sm:inline">{link.label}</span>
          </Link>
        ))}
      </nav>
      {/* Profile or Auth Buttons */}
      <div className="flex items-center gap-3 md:gap-5">
        {user ? (
          <>
            <button
              className="bg-accent text-white rounded-2xl w-9 h-9 flex items-center justify-center font-bold text-lg select-none shadow border border-accent"
              title={user.name}
              onClick={() => navigate("/profile")}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              )}
            </button>
            <button
              className="text-xs text-white/60 hover:text-orange-400 transition px-2 py-1 rounded"
              onClick={signOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-orange-600 text-orange-400 hover:bg-orange-600/10 hover:text-orange-500"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
              onClick={() => navigate("/registration")}
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
