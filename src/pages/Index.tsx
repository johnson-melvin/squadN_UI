import React, { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import WallPostCard from "@/components/WallPostCard";
import WallQuickActions from "@/components/WallQuickActions";
import WelcomeHero from "@/components/WelcomeHero";
import CreatePostModal from "@/components/CreatePostModal";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Example posts (mocked data)
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Priya Mehra",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    sport: "Football",
    postedAt: new Date(Date.now() - 80 * 60 * 1000),
    message:
      "Looking for friendly and energetic defenders for our 7v7 game tomorrow! Kickoff at 7:30pm, Central Park Pitch 2.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    location: "Central Park Pitch 2",
    levelOfPlay: "Intermediate",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    requestType: "request",
  },
  {
    id: 2,
    user: {
      name: "Nina Park",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
    sport: "Tennis",
    postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    message:
      "Court #5 free at noon – doubles? 🎾#NYCtennis",
    location: "Eastside Rec",
    levelOfPlay: "Advanced",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000),
    requestType: "availability",
  },
  {
    id: 3,
    user: {
      name: "Jayden Clark",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    },
    sport: "Running",
    postedAt: new Date(Date.now() - 160 * 60 * 1000),
    message: "Morning run complete! Who’s in for tomorrow? 🏃‍♂️ #runningmates",
    location: "Riverside Trail",
    levelOfPlay: "",
    date: undefined,
    requestType: undefined,
  },
  // NEW: More engaging, dynamic posts
  {
    id: 4,
    user: { name: "Lucas Kim", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
    sport: "Basketball",
    postedAt: new Date(Date.now() - 200 * 60 * 1000),
    message: "Looking for a pickup basketball game at the YMCA tonight. All levels welcome!",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    location: "YMCA Downtown",
    levelOfPlay: "Beginner",
    date: new Date(Date.now() + 6 * 60 * 60 * 1000),
    requestType: "request"
  },
  {
    id: 5,
    user: { name: "Fiona Grant", avatar: "https://randomuser.me/api/portraits/women/60.jpg" },
    sport: "Volleyball",
    postedAt: new Date(Date.now() - 40 * 60 * 1000),
    message: "Friendly beach volleyball group forming for the weekend. Who’s interested?",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
    location: "Coney Island Beach",
    levelOfPlay: "Intermediate",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    requestType: "availability"
  },
  {
    id: 6,
    user: { name: "Marta Paredes", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    sport: "Yoga",
    postedAt: new Date(Date.now() - 220 * 60 * 1000),
    message: "Sunrise yoga session in Prospect Park tomorrow! Bring a mat 🌅",
    location: "Prospect Park East",
    levelOfPlay: "All Levels",
    date: new Date(Date.now() + 15 * 60 * 60 * 1000),
    requestType: "request"
  },
  {
    id: 7,
    user: { name: "Patrick Song", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
    sport: "Cricket",
    postedAt: new Date(Date.now() - 360 * 60 * 1000),
    message: "Need a batsman for our friendly club match this Saturday. DM if interested!",
    location: "Chelsea Field",
    levelOfPlay: "Advanced",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    requestType: "request"
  },
  {
    id: 8,
    user: { name: "Jasmine Patel", avatar: "https://randomuser.me/api/portraits/women/42.jpg" },
    sport: "Running",
    postedAt: new Date(Date.now() - 25 * 60 * 1000),
    message: "Jogging group for beginners—meet at the park entrance every Mon/Wed!",
    location: "Greenpoint Park",
    levelOfPlay: "Beginner",
    date: undefined,
    requestType: "availability"
  },
];

const defaultSports = [
  { name: "Football", icon: <span className="text-lg">⚽️</span> },
  { name: "Basketball", icon: <span className="text-lg">🏀</span> },
  { name: "Tennis", icon: <span className="text-lg">🎾</span> },
  { name: "Cricket", icon: <span className="text-lg">🏏</span> },
  { name: "Volleyball", icon: <span className="text-lg">🏐</span> },
  { name: "Running", icon: <span className="text-lg">🏃‍♂️</span> },
  { name: "Yoga", icon: <span className="text-lg">🧘‍♂️</span> },
];

const Index = () => {
  const [sports, setSports] = useState(defaultSports);
  const [selectedSport, setSelectedSport] = useState(defaultSports[0].name);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Handler for posting (now called from modal):
  const handlePost = (data: any) => {
    setUserPosts([
      {
        ...data,
        id: Date.now(),
        user: {
          name: "You",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        postedAt: new Date(),
        location: data.location || "",
      },
      ...userPosts,
    ]);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full font-fb bg-background">
        {/* Fixed Header Space */}
        <div className="h-[64px] w-full"></div>
        <div className="flex flex-1 w-full gap-0">
          {/* Sidebar */}
          <AppSidebar
            sports={sports}
            selectedSport={selectedSport}
            onSelect={setSelectedSport}
            onAddSport={() =>
              setSports([
                ...sports,
                {
                  name: `Sport ${sports.length + 1}`,
                  icon: <span className="text-lg">⚽️</span>,
                },
              ])
            }
          />
          {/* Mobile menu trigger */}
          <div className="fixed left-1.5 top-[72px] z-40 block md:hidden">
            <SidebarTrigger />
          </div>
          {/* Main Content */}
          <main className="flex flex-col w-full max-w-[640px] mx-auto pt-2 pb-8 px-0 sm:px-2 min-h-screen">
            {/* --- ESPN-Style Welcome Hero --- */}
            <WelcomeHero />
            {/* --- ESPN-Style Quick Actions --- */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mt-2 mb-4">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white border border-primary text-primary font-semibold shadow hover:bg-primary hover:text-white transition-all"
                type="button"
              >
                <span className="inline-flex items-center"><span className="mr-2">+</span> Create a Post</span>
              </button>
              <button
                onClick={() => window.location.assign("/find-players")}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white border border-black text-black font-semibold shadow hover:bg-black hover:text-white transition-all"
                type="button"
              >
                <span className="inline-flex items-center"><span className="mr-2">👥</span> Find Players</span>
              </button>
            </div>
            <CreatePostModal open={modalOpen} setOpen={setModalOpen} onSubmit={handlePost} />
            <div className="flex flex-col gap-4 mt-1">
              {userPosts.concat(mockPosts).map((post) => (
                <WallPostCard
                  key={post.id}
                  user={post.user}
                  sport={post.sport}
                  sports={post.sports}
                  postedAt={post.postedAt}
                  date={post.date}
                  message={post.message}
                  image={post.image}
                  location={post.location}
                  levelOfPlay={post.levelOfPlay}
                  showLevel={!!post.levelOfPlay}
                  showConnect
                  requestType={post.requestType}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
