"use client";
import type { DayData } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { timetableData } from "./TimeTableData";
import { TimeTableDay } from "./TimeTableDay";

type TimeTableSliderProps = {
  currentDay: number;
  onPrevDay: () => void;
  onNextDay: () => void;
};

const defaultDayData: DayData = { day: "No Data", schedule: [] };

export const TimeTableSlider = ({
  currentDay,
  onPrevDay,
  onNextDay,
}: TimeTableSliderProps) => {
  const currentDayData: DayData = timetableData[currentDay] ?? defaultDayData;

  return (
    <div className="group relative w-full h-full min-h-0 flex flex-col">
      {/* Main timetable content - expands to fill available space */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-lg">
        <div className="w-full h-full">
          <TimeTableDay day={currentDayData} />
        </div>
      </div>

      {/* Left Navigation Button */}
      <button
        type="button"
        onClick={onPrevDay}
        disabled={currentDay <= 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 opacity-0 transition-opacity disabled:opacity-50 group-hover:opacity-100 z-10"
      >
        <ChevronLeft className="size-5 text-white" />
      </button>

      {/* Right Navigation Button */}
      <button
        type="button"
        onClick={onNextDay}
        disabled={currentDay >= timetableData.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 opacity-0 transition-opacity disabled:opacity-50 group-hover:opacity-100 z-10"
      >
        <ChevronRight className="size-5 text-white" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 z-10">
        {timetableData.map((day, index) => (
          <div
            key={day.day}
            className={`size-2 rounded-full ${
              currentDay === index ? "bg-black" : "bg-black/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
