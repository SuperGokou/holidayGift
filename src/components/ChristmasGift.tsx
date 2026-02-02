"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Lock, Play } from "lucide-react";
import type { YearData } from "@/lib/types";
import Countdown from "./Countdown";

interface ChristmasGiftProps {
  yearData: Omit<YearData, "year"> & { year?: number };
  isChristmas: boolean;
  currentYear: number;
}

type Stage = "wrapped" | "unwrapping" | "revealed";

export default function ChristmasGift({
  yearData,
  isChristmas,
  currentYear,
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
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {stage !== "revealed" ? (
          <motion.div
            key="gift-scene"
            className="flex flex-col items-center gap-8 sm:gap-10"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Title */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-lg sm:text-xl tracking-[0.3em] uppercase text-white/70 font-light">
                {currentYear}
              </h1>
              <p className="font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-white/30 mt-2">
                {isChristmas ? "Tap to unwrap your gift" : "A gift awaits you"}
              </p>
            </motion.div>

            {/* Gift Box */}
            <motion.button
              onClick={handleClick}
              className="relative cursor-pointer focus:outline-none group"
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
                  : { duration: 0.6, delay: 0.4 }
              }
              aria-label={
                isChristmas ? "Open your Christmas gift" : "Gift is locked until December 25"
              }
            >
              {/* Glow effect */}
              <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-b from-amber-500/10 to-red-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Lid */}
              <motion.div
                className="relative z-10"
                animate={
                  stage === "unwrapping"
                    ? { y: -100, opacity: 0, rotateX: -30 }
                    : {}
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Lid shape */}
                <div className="relative w-52 h-14 sm:w-64 sm:h-16">
                  <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-[#d42a3a] to-[#b81c2c] shadow-lg" />
                  {/* Ribbon on lid */}
                  <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center">
                    <div className="w-8 sm:w-10 h-full bg-gradient-to-b from-amber-300/90 to-amber-500/90" />
                  </div>
                  {/* Bow */}
                  <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 flex items-end gap-0">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[3px] border-amber-400 bg-amber-400/20 -rotate-[30deg] -mr-1" />
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 z-10 mb-0" />
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[3px] border-amber-400 bg-amber-400/20 rotate-[30deg] -ml-1" />
                  </div>
                </div>
              </motion.div>

              {/* Box body */}
              <motion.div
                className="relative w-48 h-36 sm:w-60 sm:h-44 mx-auto -mt-1"
                animate={
                  stage === "unwrapping"
                    ? { scale: 0.8, opacity: 0, y: 20 }
                    : {}
                }
                transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
              >
                <div className="absolute inset-0 rounded-b-xl bg-gradient-to-b from-[#c41e30] to-[#a01525] shadow-2xl" />
                {/* Vertical ribbon */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-b from-amber-300/80 to-amber-500/80" />
                {/* Horizontal ribbon */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 sm:h-10 bg-gradient-to-r from-amber-300/80 via-amber-400/80 to-amber-300/80" />

                {/* Lock icon overlay */}
                {!isChristmas && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                    </div>
                  </div>
                )}

                {/* Subtle gift icon for unlocked state */}
                {isChristmas && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white/20" />
                  </div>
                )}
              </motion.div>
            </motion.button>

            {/* Countdown or instruction */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {!isChristmas ? (
                <div className="flex flex-col items-center gap-4">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-white/30">
                    Opens in
                  </p>
                  <Countdown />
                </div>
              ) : (
                <p className="font-body text-sm text-white/40 tracking-wide">
                  Tap the gift to open
                </p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Revealed Card */
          <motion.div
            key="card"
            className="flex flex-col items-center w-full max-w-lg px-4"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative line */}
            <motion.div
              className="w-12 h-[1px] bg-white/20 mb-8"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Greeting */}
            <motion.h1
              className="font-display text-3xl sm:text-5xl text-white text-center leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {yearData.greeting}
            </motion.h1>

            {/* Message */}
            <motion.p
              className="font-body text-base sm:text-lg text-white/60 text-center mt-6 sm:mt-8 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {yearData.message}
            </motion.p>

            {/* Decorative star */}
            <motion.div
              className="my-8 sm:my-10 text-white/15 text-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              *
            </motion.div>

            {/* Video link */}
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

            {/* Footer love note */}
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
    </div>
  );
}
