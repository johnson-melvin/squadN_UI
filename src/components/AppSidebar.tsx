
import SportsSidebar, { SportType } from "@/components/SportsSidebar";
import React from "react";

type AppSidebarProps = {
  sports: SportType[];
  selectedSport: string;
  onSelect: (sport: string) => void;
  onAddSport: () => void;
};

/**
 * Facebook-like sidebar: white, rounded, subtle border, sticky on desktop,
 * collapses/drawer on mobile (handled by sidebar provider). Uses fb-blue for active.
 */
const AppSidebar = ({
  sports,
  selectedSport,
  onSelect,
  onAddSport,
}: AppSidebarProps) => (
  <aside
    className="
      hidden
      md:flex
      flex-col
      sticky
      top-[64px]
      h-[calc(100vh-64px)]
      w-[270px]
      bg-surface
      border-r border-border
      shadow-sm
      z-10
      px-0 pt-4 pb-6
      font-fb
    "
    style={{
      minWidth: 240,
      maxWidth: 320,
      background: "#fff3e9"
    }}
  >
    <div className="w-full">
      <SportsSidebar
        sports={sports}
        selectedSport={selectedSport}
        onSelect={onSelect}
        onAddSport={onAddSport}
      />
    </div>
  </aside>
);

export default AppSidebar;
