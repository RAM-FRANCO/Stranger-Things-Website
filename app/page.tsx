"use client";
import { useState } from "react";
import { StrangerThingsHero } from "@/components/ui/svg-mask-effect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  const toggleDimension = () => {
    setIsUpsideDown(!isUpsideDown);
  };

  return (
    <main className="min-h-screen bg-black font-sans">
      <StrangerThingsHero
        normalImage="/images/hero-normal.png"
        upsideDownImage="/images/hero-upside-down.png"
        isUpsideDown={isUpsideDown}
      >
        <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Top Content */}
          <div className="text-center space-y-3 sm:space-y-6 pt-12 sm:pt-16 lg:pt-20 max-w-4xl">
            <motion.h1
              key={isUpsideDown ? "upside-down-title" : "normal-title"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-tight animate-pulse-subtle"
              style={{
                fontFamily: "Georgia, serif",
                color: isUpsideDown ? "#dc2626" : "#dc2626",
              }}
            >
              {isUpsideDown ? "The Upside Down" : "Stranger Things"}
            </motion.h1>
            <div className="h-px w-24 sm:w-32 md:w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto opacity-60" />
            <motion.p
              key={isUpsideDown ? "upside-down-desc" : "normal-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto drop-shadow-lg font-light tracking-wide"
            >
              {isUpsideDown
                ? "You've crossed into the parallel dimension. Hover to find your way back."
                : "Hover to reveal the parallel dimension beneath our world."}
              <span className="block mt-2 text-sm sm:text-base text-neutral-400">
                Season 5 - Now Streaming
              </span>
            </motion.p>
          </div>

          {/* Bottom Content / CTA */}
          <div className="pb-8 sm:pb-12 lg:pb-16 space-y-4">
            <Button
              onClick={toggleDimension}
              size="lg"
              className={`${isUpsideDown
                ? "bg-blue-700 hover:bg-blue-800 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.9)]"
                : "bg-red-700 hover:bg-red-800 border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_40px_rgba(220,38,38,0.9)]"
                } text-white border transition-all duration-300 text-sm sm:text-base md:text-lg px-6 sm:px-10 py-4 sm:py-6 md:py-7 rounded-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold hover:scale-105 active:scale-95`}
            >
              <motion.span
                key={isUpsideDown ? "return" : "enter"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isUpsideDown ? "Return to Normal World" : "Enter The Upside Down"}
              </motion.span>
            </Button>
            <p className="text-xs sm:text-sm text-neutral-500 text-center">
              {isUpsideDown
                ? "Click to escape the darkness"
                : "Move your cursor to explore • Click to cross over"}
            </p>
          </div>
        </div>
      </StrangerThingsHero>
    </main>
  );
}
