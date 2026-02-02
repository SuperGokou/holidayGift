"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import type { YearData } from "@/lib/types";

interface ChristmasGiftProps {
  yearData: Omit<YearData, "year"> & { year?: number };
  isChristmas: boolean;
}

type Stage = "wrapped" | "unwrapping" | "revealed";

export default function ChristmasGift({
  yearData,
  isChristmas,
}: ChristmasGiftProps) {
  const [stage, setStage] = useState<Stage>("wrapped");
  const [shaking, setShaking] = useState(false);

  const handleClick = useCallback(() => {
    if (!isChristmas) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return;
    }
    if (stage === "wrapped") {
      setStage("unwrapping");
      setTimeout(() => setStage("revealed"), 800);
    }
  }, [isChristmas, stage]);

  return (
    <AnimatePresence mode="wait">
      {stage !== "revealed" ? (
        <motion.div
          key="gift-scene"
          className="flex flex-col items-center"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.button
            onClick={handleClick}
            className="relative cursor-pointer focus:outline-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...(shaking
                ? {
                    x: [0, -8, 8, -6, 6, -3, 3, 0],
                    rotate: [0, -3, 3, -2, 2, -1, 1, 0],
                  }
                : {}),
            }}
            transition={
              shaking
                ? { duration: 0.5, ease: "easeInOut" }
                : { duration: 0.6, delay: 0.2 }
            }
            aria-label={
              isChristmas
                ? "Open your Christmas gift"
                : "Gift is locked until December 25"
            }
          >
            {/* Gift box container */}
            <motion.div
              className="relative h-60 w-60 overflow-hidden rounded-[10px] border-4 border-[#82181a] shadow-2xl sm:h-80 sm:w-80"
              animate={
                stage === "unwrapping"
                  ? { scale: 0.8, opacity: 0, y: 20 }
                  : {}
              }
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              {/* Red background */}
              <div className="absolute inset-0 bg-[#9f0712]" />

              {/* Snowflake pattern overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: "url('/gift-pattern.png')" }}
              />

              {/* Yellow ribbon - vertical */}
              <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-[#fdc700] shadow-sm sm:w-12" />

              {/* Yellow ribbon - horizontal */}
              <div className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2 bg-[#fdc700] shadow-sm sm:h-12" />

              {/* "For You" tag */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-white px-4 py-2 shadow-lg">
                <span className="font-display text-base font-semibold text-[#9f0712]">
                  For You
                </span>
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="card"
          className="flex flex-col items-center w-full max-w-lg px-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-12 h-[1px] bg-white/20 mb-8"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.h1
            className="font-display text-3xl sm:text-5xl text-white text-center leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {yearData.greeting}
          </motion.h1>

          <motion.p
            className="font-body text-base sm:text-lg text-white/60 text-center mt-6 sm:mt-8 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {yearData.message}
          </motion.p>

          <motion.div
            className="my-8 sm:my-10 text-white/15 text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            *
          </motion.div>

          {yearData.videoUrl && (
            <motion.a
              href={yearData.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Play className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors fill-current" />
              <span className="font-body text-sm tracking-wide text-white/50 group-hover:text-white/80 transition-colors">
                Watch our family video
              </span>
            </motion.a>
          )}

          <motion.p
            className="font-body text-xs text-white/20 tracking-[0.15em] uppercase mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            With love, always
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
