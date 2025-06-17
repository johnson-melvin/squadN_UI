
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users2, ChevronLeft } from "lucide-react";

const group = {
  name: "Downtown Football (NYC)",
  members: 21,
  description: "Weekly games & banter at Central Park.",
  avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=DFC",
  gallery: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80"
  ],
  nextEvent: {
    title: "Sunday Game",
    time: "Sun 10:00 AM, Central Park",
  },
};

const CommunityView = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-[#202432] rounded-lg shadow-lg">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/community")}>
        <ChevronLeft className="mr-2" size={18} /> Back to Community
      </Button>
      <div className="flex items-center gap-4 mb-3">
        <img src={group.avatar} className="w-16 h-16 rounded-full border-2 border-blue-400" alt={group.name} />
        <div>
          <div className="text-2xl font-bold text-white">{group.name}</div>
          <div className="text-sm text-gray-400">{group.members} members</div>
        </div>
        <Button variant="secondary" size="sm" className="ml-auto">
          <Users2 className="mr-1" size={16} /> Join Group
        </Button>
      </div>
      <div className="mb-3 text-gray-300">{group.description}</div>
      <div className="mb-3">
        <div className="font-semibold text-blue-200 mb-1">Next Event</div>
        <div className="bg-[#23272f] p-3 rounded-md text-sm text-gray-200">
          {group.nextEvent.title} &mdash; {group.nextEvent.time}
        </div>
      </div>
      <div>
        <div className="font-semibold text-blue-200 mb-1">Gallery</div>
        <div className="flex gap-3">
          {group.gallery.map((url, i) => (
            <img key={i} src={url} alt="" className="w-28 h-20 rounded-md object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
