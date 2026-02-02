"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeUntilChristmas(): TimeLeft {
  const now = new Date();
  const year = now.getFullYear();
  const christmas = new Date(year, 11, 25);
  if (now >= christmas) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = christmas.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeUntilChristmas);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilChristmas());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const segments = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <span
              className="font-countdown text-2xl sm:text-4xl font-light tracking-wider text-white tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(seg.value).padStart(2, "0")}
            </span>
            <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="text-white/20 text-xl sm:text-2xl font-light -mt-4">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
