"use client";

import React from "react";

type Schedule = {
  time: string;
  subject: string;
};

type DayData = {
  day: string;
  schedule: Schedule[];
};

type TimeTableDayProps = {
  day: DayData;
};

export const TimeTableDay = ({ day }: TimeTableDayProps) => {
  return (
    <div className="flex size-full flex-col">
      <h3 className="mb-4 text-center text-2xl text-[var(--text)]">
        {day.day}
      </h3>
      <div className="flex-1 space-y-2">
        {day.schedule.map((period) => (
          <div
            key={`${period.time}-${period.subject}`} // Unique composite key
            className="flex items-center justify-around rounded-lg p-3 border border-[var(--text)]"
          >
            <span className="text-[var(--text)]">{period.subject}</span>
            <span className="font-medium text-[var(--text)]">
              {period.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
