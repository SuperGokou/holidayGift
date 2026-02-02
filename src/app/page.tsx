"use client";

import { useMemo } from "react";
import Snow from "@/components/Snow";
import ChristmasGift from "@/components/ChristmasGift";
import yearsConfig from "@/data/years.json";
import type { YearsConfig } from "@/lib/types";

const data = yearsConfig as YearsConfig;

export default function Home() {
  const { yearData, isChristmas, currentYear } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed: 11 = December
    const day = now.getDate();

    const isXmas = month === 11 && day >= 25;

    const matched = data.years.find((y) => y.year === year);
    const resolved = matched ?? { ...data.fallback, year };

    return {
      yearData: resolved,
      isChristmas: isXmas,
      currentYear: year,
    };
  }, []);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      {/* Background gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(100, 10, 20, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(10, 40, 20, 0.1) 0%, transparent 50%)",
        }}
      />

      <Snow />

      <div className="relative z-20">
        <ChristmasGift
          yearData={yearData}
          isChristmas={isChristmas}
          currentYear={currentYear}
        />
      </div>
    </main>
  );
}
