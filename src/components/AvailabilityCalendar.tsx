
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { AvailabilityPost } from "@/utils/availability";

type Props = {
  availabilities: AvailabilityPost[];
  onSelectDate?: (date: Date) => void;
};

const AvailabilityCalendar: React.FC<Props> = ({ availabilities, onSelectDate }) => {
  // Which days have availabilities
  const markedDays = availabilities.map((av) => av.date);

  // For rendering marks, pass a modifiers prop to Calendar
  const modifiers = {
    available: (date: Date) => markedDays.some((d) => isSameDay(d, date)),
  };

  // Highlight "available" days differently
  const modifiersClassNames = {
    available: "bg-blue-500/60 text-white font-bold rounded-full border-2 border-blue-300",
  };

  return (
    <div className="mb-8 bg-[#181c23] rounded-xl border border-[#23253b] p-3 w-fit">
      <div className="text-gray-200 font-semibold mb-2 px-1">Community Availability</div>
      <Calendar
        showOutsideDays
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        mode="single"
        onSelect={onSelectDate}
        className="p-3 pointer-events-auto"
      />
      <div className="mt-2 px-1 text-xs text-gray-400">
        Days highlighted have users available for sports!
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
