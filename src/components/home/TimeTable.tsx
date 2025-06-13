import { useState } from "react";
import { TimeTableSlider } from "./TimeTableSlider";

export const TimeTableBlock = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);

  const nextDay = () => {
    setCurrentDay((prev) => (prev === 4 ? 0 : prev + 1));
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev === 0 ? 4 : prev - 1));
  };

  return (
    <div
      className="border border-[var(--text)] rounded-lg p-4 h-96 flex flex-col"
      data-testid="timetable-block"
    >
      <div className="relative flex-shrink-0">
        <img
          className="absolute h-16 z-10"
          src="/scribble-circle.svg"
          alt="Scribbled circle overlay"
        />
        <h2 className="flex ml-2 p-3 w-fit text-[2rem] font-medium text-[var(--text)]">
          Time Table
        </h2>
      </div>

      <div className="flex-1 flex rounded-xl min-h-0">
        <TimeTableSlider
          currentDay={currentDay}
          onPrevDay={prevDay}
          onNextDay={nextDay}
        />
      </div>
    </div>
  );
};
