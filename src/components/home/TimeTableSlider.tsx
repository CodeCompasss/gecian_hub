"use client";

import type { DayData } from "@/types/types"; // Ensure you import the correct type
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { timetableData } from "./TimeTableData";
import { TimeTableDay } from "./TimeTableDay";

type TimeTableSliderProps = {
  currentDay: number;
  onPrevDay: () => void;
  onNextDay: () => void;
};

// Default empty schedule to prevent errors
const defaultDayData: DayData = { day: "No Data", schedule: [] };

export const TimeTableSlider = ({
  currentDay,
  onPrevDay,
  onNextDay,
}: TimeTableSliderProps) => {
  // Ensure currentDay is within valid range
  const currentDayData: DayData = timetableData[currentDay] ?? defaultDayData;

  return (
    <div className="group relative h-full w-full">
      <div className="h-full overflow-hidden rounded-lg">
        <TimeTableDay day={currentDayData} />
      </div>

      {/* Left Navigation Button */}
      <button
        type="button" // Fixed missing type
        onClick={onPrevDay}
        disabled={currentDay <= 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 opacity-0 transition-opacity disabled:opacity-50 group-hover:opacity-100"
      >
        <ChevronLeft className="size-5 text-white" />
      </button>

      {/* Right Navigation Button */}
      <button
        type="button" // Fixed missing type
        onClick={onNextDay}
        disabled={currentDay >= timetableData.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 opacity-0 transition-opacity disabled:opacity-50 group-hover:opacity-100"
      >
        <ChevronRight className="size-5 text-white" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {timetableData.map((day, index) => (
          <div
            key={day.day} // Use 'day.day' instead of index if it's unique
            className={`size-2 rounded-full ${
              currentDay === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
