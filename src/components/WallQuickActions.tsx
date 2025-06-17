import React from "react";
import { PlusCircle, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  onCreatePost: () => void;
  onFindPlayers: () => void;
};

const WallQuickActions: React.FC<Props> = ({ onCreatePost, onFindPlayers }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex gap-4 mt-2 mb-4">
      <button
        onClick={onCreatePost}
        className="flex-1 flex items-center gap-2 px-5 py-2 rounded-xl bg-white border border-primary text-primary text-sm font-semibold shadow hover:bg-primary hover:text-white transition-all"
        type="button"
      >
        <PlusCircle size={18} /> Create a Post
      </button>
      <button
        onClick={() => navigate("/find-players")}
        className="flex-1 flex items-center gap-2 px-5 py-2 rounded-xl bg-white border border-black text-black text-sm font-semibold shadow hover:bg-black hover:text-white transition-all"
        type="button"
      >
        <Users size={18} /> Find Players
      </button>
      {/* Add more quick actions as needed */}
    </div>
  );
};

export default WallQuickActions;
