"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ArchiveSheetProps {
  open: boolean;
  onClose: () => void;
  years: number[];
  onSelectYear: (year: number) => void;
}

export default function ArchiveSheet({
  open,
  onClose,
  years,
  onSelectYear,
}: ArchiveSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/10 bg-[#1a1a1a] px-6 pb-10 pt-0 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-6">
              <div className="h-1 w-12 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl text-white">
                Past Christmases
              </h3>
              <button
                onClick={onClose}
                className="rounded p-2 text-white/60 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Year cards */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => onSelectYear(year)}
                  className="flex h-24 w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-[14px] border border-[rgba(251,44,54,0.3)] bg-[rgba(130,24,26,0.4)] transition-colors hover:bg-[rgba(130,24,26,0.6)]"
                >
                  <span className="font-display text-2xl font-semibold text-white">
                    {year}
                  </span>
                  <span className="font-body text-xs text-white/60">
                    View Card
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
