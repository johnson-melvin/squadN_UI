
import { Plus } from "lucide-react";

const QuickActions = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {/* Find a Game */}
    <div className="rounded-2xl px-8 py-8 flex flex-col justify-between bg-white shadow-md border border-border">
      <div>
        <div className="text-2xl font-bold text-black mb-2">Find a Game</div>
        <div className="text-gray-600 mb-6">Discover players and games near you</div>
        <button className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow">
          <Plus size={18} className="mr-2" /> Find Players
        </button>
      </div>
    </div>
    {/* Create a Game */}
    <div className="rounded-2xl px-8 py-8 flex flex-col justify-between bg-white shadow-md border border-border">
      <div>
        <div className="text-2xl font-bold text-black mb-2">Create a Game</div>
        <div className="text-gray-700 mb-6">Start your own match and invite others</div>
        <button className="flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow">
          <Plus size={18} className="mr-2" /> Create Game
        </button>
      </div>
    </div>
  </div>
);

export default QuickActions;
