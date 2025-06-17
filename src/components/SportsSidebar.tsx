
import { PlusCircle } from "lucide-react";

type SportType = {
  name: string;
  icon: React.ReactNode;
};

type SportsSidebarProps = {
  sports: SportType[];
  selectedSport: string;
  onSelect: (s: string) => void;
  onAddSport?: () => void;
};

const SportsSidebar = ({
  sports,
  selectedSport,
  onSelect,
  onAddSport,
}: SportsSidebarProps) => (
  <aside className="flex flex-col gap-3 py-3 px-1 min-w-[190px] w-full">
    <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide 
      text-primary/60">
      Your Sports
    </div>
    <nav className="flex flex-col gap-1 w-full">
      {sports.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`group flex items-center gap-3 px-4 py-2 rounded-xl 
            transition-all capitalize
            ${
              selectedSport === name
                ? "bg-primary/90 text-white font-bold shadow-md border border-primary"
                : "bg-surface hover:bg-accent/50 text-primary border border-transparent"
            } drop-shadow-sm 
          `}
          type="button"
        >
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
              selectedSport === name
                ? "bg-white/10 text-white"
                : "bg-transparent group-hover:bg-accent/15 group-hover:text-primary"
            }`}
          >
            {icon}
          </span>
          <span className="truncate text-sm font-semibold">{name}</span>
        </button>
      ))}
    </nav>
    <button
      className="flex items-center gap-2 px-4 py-2 mt-3 rounded-xl
      bg-accent/40 hover:bg-accent/70
      text-primary
      font-semibold shadow-sm transition-all border border-transparent"
      onClick={onAddSport}
      type="button"
    >
      <PlusCircle size={18} className="opacity-70" />
      <span className="text-sm">Add Sport</span>
    </button>
  </aside>
);

export type { SportType };
export default SportsSidebar;
