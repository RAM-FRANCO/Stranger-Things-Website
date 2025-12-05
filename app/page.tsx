"use client";
import { useState } from "react";
import { StrangerThingsHero } from "@/components/ui/svg-mask-effect";
import { StrangerThingsTitle } from "@/components/ui/stranger-things-title";
import { AudioPlayer } from "@/components/ui/audio-player";
import { IntroOverlay } from "@/components/ui/intro-overlay";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleDimension = () => {
    setIsUpsideDown(!isUpsideDown);
  };

  const handleIntroComplete = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000); // Wait for fade out
  };

  return (
    <main className="min-h-dvh bg-black font-sans relative overflow-hidden">
      <AudioPlayer start={isPlaying} />

      {/* Intro Overlay & Title Animation Container */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 1, delay: 1 } }}
          >
            <StrangerThingsTitle
              line1="STRANGER"
              line2="RAM"
              imageSrc="/images/stranger-ram.png"
              introMode={true}
              className="animate-pulse-subtle mb-16" // Increased margin-bottom to prevent overlap
            />
            <IntroOverlay onEnter={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <StrangerThingsHero
        normalImage="/images/hero-normal.png"
        upsideDownImage="/images/hero-upside-down-cropped.png"
        isUpsideDown={isUpsideDown}
        isActive={isPlaying}
      >
        {/* Black Curtain for Intro */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 bg-black z-0 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Top Content */}
          <div className="text-center space-y-3 sm:space-y-6 pt-12 sm:pt-16 lg:pt-20 max-w-4xl w-full">
            <div className="relative z-20 h-32 sm:h-40 md:h-48 flex items-center justify-center">
              {!showIntro && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {isUpsideDown ? (
                    <StrangerThingsTitle
                      line1="THE UPSIDE"
                      line2="DOWN"
                      imageSrc="/images/upsidedown.png"
                      className="animate-pulse-subtle"
                    />
                  ) : (
                    <StrangerThingsTitle
                      line1="STRANGER"
                      line2="RAM"
                      imageSrc="/images/stranger-ram.png"
                      className="animate-pulse-subtle"
                    />
                  )}
                </motion.div>
              )}
            </div>
            <motion.p
              key={isUpsideDown ? "upside-down-desc" : "normal-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1 }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="pb-8 sm:pb-12 lg:pb-16 space-y-4"
          >
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
          </motion.div>
        </div>
      </StrangerThingsHero>
    </main>
  );
}
