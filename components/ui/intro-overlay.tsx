"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface IntroOverlayProps {
    onEnter: () => void;
}

export const IntroOverlay = ({ onEnter }: IntroOverlayProps) => {
    const [isExiting, setIsExiting] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const diffX = Math.abs(e.clientX - startPos.x);
        const diffY = Math.abs(e.clientY - startPos.y);

        // Only trigger if movement is small (click, not drag)
        if (diffX < 5 && diffY < 5) {
            setIsExiting(true);
            onEnter();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer ${isExiting ? "pointer-events-none" : "pointer-events-auto"}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2.5 // Wait for title animation
                }}
                className="text-center mt-64 sm:mt-80" // Increased margin to avoid overlap with larger image logos
            >
                <p className="text-red-600 font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                    Click to Enter
                </p>
                <p className="text-neutral-500 text-xs sm:text-sm mt-2 tracking-widest">
                    The Upside Down Awaits
                </p>
            </motion.div>
        </motion.div>
    );
};
