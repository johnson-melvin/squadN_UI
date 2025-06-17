
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type CreatePostModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (data: { message: string; image?: string; location?: string; levelOfPlay?: string; sport?: string }) => void;
};

const levels = ["Beginner", "Intermediate", "Advanced"];
const sports = ["Football", "Basketball", "Tennis", "Cricket", "Volleyball", "Running", "Yoga"];

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, setOpen, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState(sports[0]);
  const [level, setLevel] = useState(levels[1]);
  const [image, setImage] = useState("");

  function handlePost() {
    if (!message.trim()) {
      toast({ title: "Post can't be empty." });
      return;
    }
    onSubmit({ message, location, sport, levelOfPlay: level, image });
    setMessage("");
    setLocation("");
    setSport(sports[0]);
    setLevel(levels[1]);
    setOpen(false);
    toast({ title: "Post created!", description: "Your post has been added to the wall." });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 bg-white rounded-xl shadow-2xl">
        <form
          className="flex flex-col gap-2 px-6 py-5"
          onSubmit={e => {
            e.preventDefault();
            handlePost();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2 font-bold text-fb-blue">Create post</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full p-3 rounded border border-fb-border bg-fb-background text-fb-text resize-none mb-1"
            rows={3}
            placeholder="What's on your mind? (e.g. Looking for a game...)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            style={{ fontFamily: "inherit", fontSize: 16 }}
          />
          <div className="flex gap-2 mb-1 text-[14px]">
            <select value={sport} onChange={e => setSport(e.target.value)} className="rounded px-2 py-1 border text-fb-text border-fb-border">
              {sports.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className="rounded px-2 py-1 border text-fb-text border-fb-border">
              {levels.map(l => <option key={l}>{l}</option>)}
            </select>
            <Input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Location (optional)"
              className="w-[140px] text-fb-text border-fb-border"
              type="text"
            />
          </div>
          <Input
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="mb-2 text-fb-text border-fb-border"
            type="text"
          />
          <DialogFooter>
            <Button type="submit" className="bg-fb-blue hover:bg-fb-blue_dark text-white font-bold text-sm px-6 py-2 rounded-full">
              Post
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
