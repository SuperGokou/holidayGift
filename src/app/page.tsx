"use client";

import { useMemo, useState } from "react";
import Snow from "@/components/Snow";
import ChristmasGift from "@/components/ChristmasGift";
import Countdown from "@/components/Countdown";
import ArchiveSheet from "@/components/ArchiveSheet";
import yearsConfig from "@/data/years.json";
import type { YearsConfig } from "@/lib/types";
import { Archive, ChevronRight } from "lucide-react";

const data = yearsConfig as YearsConfig;

export default function Home() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { yearData, isChristmas, currentYear } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const isXmas = month === 11 && day >= 25;
    const matched = data.years.find((y) => y.year === year);
    const resolved = matched ?? { ...data.fallback, year };
    return { yearData: resolved, isChristmas: isXmas, currentYear: year };
  }, []);

  const displayData = useMemo(() => {
    if (!selectedYear) return yearData;
    const matched = data.years.find((y) => y.year === selectedYear);
    return matched ?? { ...data.fallback, year: selectedYear };
  }, [selectedYear, yearData]);

  const displayIsChristmas = selectedYear ? true : isChristmas;
  const pastYears = data.years.map((y) => y.year);

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-christmas.jpg')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <Snow />

      {/* Main content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          {!displayIsChristmas && (
            <div className="mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 px-8 py-6 shadow-xl backdrop-blur-sm">
                <p className="mb-4 text-center font-body text-sm tracking-[2px] uppercase text-white/80">
                  Unlocks In
                </p>
                <Countdown />
              </div>
            </div>
          )}

          <ChristmasGift
            yearData={displayData}
            isChristmas={displayIsChristmas}
          />
        </div>
      </div>

      {/* Memory Lane button */}
      <div className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2">
        <button
          onClick={() => setArchiveOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/20 py-3 pl-6 pr-4 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <Archive className="h-5 w-5 text-white" />
          <span className="font-body text-base text-white">Memory Lane</span>
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Archive bottom sheet */}
      <ArchiveSheet
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        years={pastYears}
        onSelectYear={(year) => {
          setSelectedYear(year);
          setArchiveOpen(false);
        }}
      />
    </main>
  );
}
