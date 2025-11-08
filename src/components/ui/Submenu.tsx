"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { SubmenuProps } from "@/types/submenu";

export default function Submenu({
  icon,
  label,
  isExpanded,
  onToggle,
  children,
}: SubmenuProps) {
  return (
    <div>
      {/* Menu principale */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
      >
         <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center">
            {icon}
          </div>
          <span className="leading-none">{label}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Contenuto espandibile */}
      <AnimatePresence>
        {isExpanded && (
            <motion.div
                initial={{height:0, opacity:0}}
                animate={{height:"auto",opacity:1}}
                exit={{height:0, opacity:0}}
                transition={{duration:0.2}}
                className="overflow-hidden"
            >
                <div className="pl-4 pr-4 pt-2 space-y-1">{children}</div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
