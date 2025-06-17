
export type AvailabilityPost = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  sports: string[];
  date: Date;
  message: string;
};

let nextId = 100;

export function getInitialAvailabilities(): AvailabilityPost[] {
  // Mock, returns some sample users
  return [
    {
      id: 1,
      user: { name: "Alex Lee", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      sports: ["Football"],
      date: new Date(),
      message: "Available for Football! Let's connect!",
    },
    {
      id: 2,
      user: { name: "Sophia Lin", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      sports: ["Tennis", "Basketball"],
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      message: "Ready for Tennis or Basketball! Who's in?",
    },
  ];
}

export function createAvailability(post: Omit<AvailabilityPost, "id">): AvailabilityPost {
  return { ...post, id: nextId++ };
}
