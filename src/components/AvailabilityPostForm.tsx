import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, Image as ImageIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  sportsList: string[];
  onPost: (data: {
    sports: string[];
    date: Date;
    message: string;
    availabilityOption?: string;
    levelOfPlay?: string;
    image?: string;
  }) => void;
  compact?: boolean;
  onMessageFocus?: () => void;
  oneLiner?: boolean;
};

const mockUser = {
  name: "You",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const LEVELS_OF_PLAY = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const AVAILABILITY_OPTIONS = [
  "Available",
  "Looking for players",
  "Looking for game",
];

const AvailabilityPostForm: React.FC<Props> = ({
  sportsList,
  onPost,
  compact = false,
  onMessageFocus,
  oneLiner = false,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [message, setMessage] = useState("");
  const [availabilityOption, setAvailabilityOption] = useState<string>("");
  const [levelOfPlay, setLevelOfPlay] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };
  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSport || !date || !levelOfPlay) return;
    onPost({
      sports: [selectedSport],
      date,
      message,
      levelOfPlay,
      image: imagePreview,
      availabilityOption,
    });
    setSelectedSport("");
    setDate(undefined);
    setMessage("");
    setAvailabilityOption("");
    setLevelOfPlay("");
    setImagePreview("");
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Compact / One-liner form mode
  if (oneLiner) {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full shadow-xl rounded-xl px-3 py-2 flex items-center gap-2 
          bg-gradient-to-tl from-[#1c2031] via-[#23253c] to-[#1a1d26] min-h-[66px]
          border border-blue-200/30"
        style={{ position: "relative" }}
      >
        <img
          src={mockUser.avatar}
          alt="User"
          className="w-8 h-8 rounded-full border-2 border-blue-200 object-cover flex-shrink-0 mr-1"
        />
        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="w-[84px] bg-[#23272f] text-white border border-blue-100/40 rounded-lg text-[11px] h-8 focus:ring-1 focus:ring-blue-200/80 py-1 px-2">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent className="bg-[#212332] z-40">
            <SelectGroup>
              {sportsList.map((sport) => (
                <SelectItem
                  key={sport}
                  value={sport}
                  className="capitalize"
                >
                  {sport}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-[75px] justify-start text-left font-normal bg-[#23272f] border border-blue-100/30 rounded-lg text-[11px] h-8 text-blue-100 py-1 px-2"
            >
              <CalendarIcon className="mr-1 h-3 w-3" />
              {date ? format(date, "MMM d") : (
                <span className="text-gray-400">Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#181d29] border-blue-200 z-50">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-2 pointer-events-auto rounded-xl shadow"
            />
          </PopoverContent>
        </Popover>
        {/* New: Level of Play dropdown, squeezed for one-liner */}
        <Select
          value={levelOfPlay}
          onValueChange={setLevelOfPlay}
        >
          <SelectTrigger className="w-[74px] bg-[#23272f] text-white border border-blue-100/40 rounded-lg text-[11px] h-8 focus:ring-1 focus:ring-blue-200/80 py-1 px-2">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent className="bg-[#212332] z-40">
            <SelectGroup>
              {LEVELS_OF_PLAY.map((level) => (
                <SelectItem key={level} value={level} className="text-xs">
                  {level}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="flex-1 h-8 rounded-lg bg-[#23272f] text-blue-100 border border-blue-200/20 px-2 py-1 text-xs focus:ring-2 focus:ring-blue-200/30 shadow-sm"
          placeholder="Say something…"
          value={message}
          onFocus={onMessageFocus}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={120}
          style={{ minWidth: 0 }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          aria-label="Add image"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#23272f] border border-blue-100/20 text-blue-100 hover:bg-blue-900/60 p-1.5 focus:outline-none focus:ring-1"
          onClick={() => fileInputRef.current?.click()}
          title="Add photo"
        >
          <ImageIcon size={15} />
        </Button>
        <Button
          size="sm"
          className="px-3 py-1 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white font-semibold shadow disabled:opacity-50 transition h-8 text-xs ml-1"
          type="submit"
          disabled={!selectedSport || !date || !levelOfPlay}
        >
          <Plus size={13} className="mr-0.5" /> Post
        </Button>
        {imagePreview && (
          <div className="absolute top-full left-16 mt-2 z-50 bg-[#23253c] rounded-md shadow-lg border border-blue-300/60 p-1">
            <div className="relative w-28 h-16 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-1 right-1 p-0.5 rounded-full bg-black/50 hover:bg-black/80 text-white"
                onClick={removeImage}
                title="Remove"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
      </form>
    );
  }

  // Full form mode
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-7 max-w-xl w-full mx-auto"
    >
      <div className="bg-gradient-to-tl from-[#1c2031] via-[#23253c] to-[#1a1d26] shadow-xl rounded-2xl px-4 py-4 flex gap-2 min-h-[92px] border border-blue-200/30">
        <img
          src={mockUser.avatar}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-blue-200 shadow object-cover flex-shrink-0 mt-2"
        />
        <div className="flex-1 flex flex-col gap-1 w-full min-w-0">
          {/* Drop-downs and calendar row - more compact */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-1">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full sm:w-[100px] bg-[#23272f] text-white font-semibold border border-blue-100/40 shadow rounded-lg text-xs h-8">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent className="bg-[#212332] z-40">
                <SelectGroup>
                  {sportsList.map((sport) => (
                    <SelectItem key={sport} value={sport} className="capitalize">
                      {sport}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-[90px] justify-start text-left font-normal bg-[#23272f] border border-blue-100/30 rounded-lg text-xs h-8"
                >
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {date ? format(date, "MMM d") : (
                    <span className="text-gray-300">Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-[#181d29] z-40 border-blue-200/70 w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-2 pointer-events-auto rounded-xl shadow"
                />
              </PopoverContent>
            </Popover>
            <Select
              value={levelOfPlay}
              onValueChange={setLevelOfPlay}
            >
              <SelectTrigger className="w-full sm:w-[90px] bg-[#23272f] text-white font-semibold border border-blue-100/40 shadow rounded-lg text-xs h-8">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-[#212332] z-40">
                <SelectGroup>
                  {LEVELS_OF_PLAY.map((level) => (
                    <SelectItem key={level} value={level} className="text-xs">
                      {level}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={availabilityOption}
              onValueChange={setAvailabilityOption}
            >
              <SelectTrigger className="w-full sm:w-[110px] bg-[#23272f] text-white font-semibold border border-blue-100/40 shadow rounded-lg text-xs h-8">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="bg-[#212332] z-40">
                <SelectGroup>
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option} className="text-xs">
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full items-stretch">
            <Input
              className="flex-1 h-8 rounded-lg bg-[#23272f] text-white border border-blue-100/20 px-2 py-1 text-xs focus:ring-2 focus:ring-blue-200/30 shadow-sm"
              placeholder="Say something…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={120}
              style={{ minWidth: 0 }}
            />
            <div className="relative flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                aria-label="Add image"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full bg-[#23272f] border border-blue-100/20 text-blue-100 hover:bg-blue-900/40 p-1.5 focus:outline-none focus:ring-1"
                onClick={() => fileInputRef.current?.click()}
                title="Add photo"
              >
                <ImageIcon size={16} />
              </Button>
            </div>
            <Button
              size="sm"
              className="ml-0 md:ml-1 px-4 py-1.5 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white font-semibold shadow disabled:opacity-50 transition h-8 text-xs"
              type="submit"
              disabled={
                !selectedSport ||
                !date ||
                !availabilityOption ||
                !levelOfPlay
              }
            >
              <Plus size={13} className="mr-1" /> Post
            </Button>
          </div>
          {imagePreview && (
            <div className="relative mt-1 w-28 h-16 rounded-lg overflow-hidden shadow border border-blue-100/60">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 p-0.5 rounded-full bg-black/50 hover:bg-black/80 text-white"
                onClick={removeImage}
                title="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AvailabilityPostForm;
