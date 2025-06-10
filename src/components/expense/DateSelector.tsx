'use client';

import { useEffect, useState, useRef } from 'react';


type DateItem = {
  iso: string;
  date: number;
  day: string;
  fullDate: Date;
  month:string;
  year:number
};

type DateSelectorProps = {
  selectedDate: string; // typically a string in 'YYYY-MM-DD' format
  onDateChange: (date: string) => void;
};

function getDatesAroundToday(range = 2): DateItem[] {
  const today = new Date();
  const dates: DateItem[] = [];

  for (let i = -range; i <= range; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    dates.push({
      date: d.getDate(),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: d,
      iso: d.toISOString().split('T')[0], // 'YYYY-MM-DD'
      month: d.toLocaleDateString('en-US', { month: 'long' }), // e.g. "June"
      year: d.getFullYear(),
    });
  }
  return dates;
}

export default function DateSelector({ selectedDate, onDateChange }:DateSelectorProps) {
  const [dates, setDates] = useState<DateItem[]>([]);

const containerRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledOnce = useRef(false);
  useEffect(() => {
    const initialDates = getDatesAroundToday(15);
    setDates(initialDates);
  }, []);

  useEffect(() => {
  if (!selectedDate || !containerRef.current) return;

  const index = dates.findIndex((d) => d.iso === selectedDate);
  if (index === -1) return;

  const container = containerRef.current;
  const itemWidth = 58 + 12 + 12; // Width + margin + approx padding in px (adjust if needed)
  const scrollPosition = itemWidth * index - container.clientWidth / 2 + itemWidth / 2;

  container.scrollTo({ 
    left: scrollPosition, 
    behavior: hasScrolledOnce.current ? 'smooth' : 'auto' 
  });

  hasScrolledOnce.current = true;
}, [selectedDate, dates]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto gap-3 mt-4 px-2 scrollbar-hide"
    >
      {dates && dates.map(({ day, date, month, year, iso }, i) => {
        const isFirstOfMonth =
                                i === 0 ||
                                dates[i - 1]?.month !== month ||
                                dates[i - 1]?.year !== year;
        const active = iso === selectedDate;

        return (
          <div
            key={i}
            className="relative flex items-center cursor-pointer"
            onClick={() => onDateChange(iso)}
          >
            <div
              className={`flex flex-col items-center justify-between border-black border-2 rounded-[21px] w-[58px] h-[91.46px] py-[11px] px-[15px] text-sm ${
                active ? 'bg-blue-400 text-white' : ''
              }`}
            >
              <span className="text-gray-700">{day}</span>
              <span className="font-bold">{date}</span>
            </div>

            {isFirstOfMonth && (
              <div className="flex flex-col justify-center items-center text-center text-xs leading-none font-semibold mt-1 pl-[12px]">
                <div className="underline w-[54px] h-[24px] font-inter font-medium text-[20px] leading-[100%]">
                  {month}
                </div>
                <div className="w-[54px] h-[19px] font-inter font-medium text-[16px] leading-[100%]">
                  {year}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
