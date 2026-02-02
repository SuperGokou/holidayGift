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
    { value: time.minutes, label: "Mins" },
    { value: time.seconds, label: "Secs" },
  ];

  return (
    <div className="flex items-start gap-4 sm:gap-6">
      {segments.map((seg) => (
        <div key={seg.label} className="flex flex-col items-center gap-1">
          <span
            className="font-countdown text-4xl sm:text-5xl font-bold text-white tabular-nums"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(seg.value).padStart(2, "0")}
          </span>
          <span className="font-body text-[10px] sm:text-xs uppercase tracking-[0.6px] text-white/60">
            {seg.label}
          </span>
        </div>
      ))}
    </div>
  );
}
