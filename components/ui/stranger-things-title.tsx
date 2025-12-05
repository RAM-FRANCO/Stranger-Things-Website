"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StrangerThingsTitleProps {
    line1?: string;
    line2?: string;
    className?: string;
    scale?: number;
}

export const StrangerThingsTitle = ({
    line1 = "STRANGER",
    line2 = "THINGS",
    className,
    scale = 1,
}: StrangerThingsTitleProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center font-serif select-none", className)}
            style={{ transform: `scale(${scale})` }}
        >
            {/* Top Bar */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8),0_0_20px_rgba(220,38,38,0.6)] mb-2"
            />

            {/* Line 1 */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-transparent tracking-widest relative"
                style={{
                    fontFamily: "var(--font-libre-baskerville), serif",
                    WebkitTextStroke: "2px #dc2626",
                    textShadow: "0 0 10px rgba(220,38,38,0.6), 0 0 20px rgba(220,38,38,0.4)",
                }}
            >
                <span className="text-6xl sm:text-8xl md:text-9xl -mr-2 inline-block transform translate-y-1">{line1.charAt(0)}</span>
                {line1.slice(1, -1)}
                <span className="text-6xl sm:text-8xl md:text-9xl -ml-2 inline-block transform translate-y-1">{line1.charAt(line1.length - 1)}</span>
            </motion.h1>

            {/* Line 2 */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent tracking-widest mt-[-10px] relative"
                style={{
                    fontFamily: "var(--font-libre-baskerville), serif",
                    WebkitTextStroke: "2px #dc2626",
                    textShadow: "0 0 10px rgba(220,38,38,0.6), 0 0 20px rgba(220,38,38,0.4)",
                }}
            >
                {line2}
            </motion.h2>

            {/* Bottom Bar */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-[2px] w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8),0_0_20px_rgba(220,38,38,0.6)] mt-2"
            />
        </div>
    );
};
