"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StrangerThingsTitleProps {
    line1?: string;
    line2?: string;
    imageSrc?: string;
    className?: string;
    scale?: number;
    introMode?: boolean;
}

export const StrangerThingsTitle = ({
    line1 = "STRANGER",
    line2 = "THINGS",
    imageSrc,
    className,
    scale = 1,
    introMode = false,
}: StrangerThingsTitleProps) => {
    return (
        <motion.div
            layoutId="stranger-things-title-container"
            className={cn("flex flex-col items-center justify-center select-none", className)}
            style={{ transform: `scale(${scale})` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {imageSrc ? (
                <motion.div
                    layoutId="title-image"
                    initial={{
                        opacity: 0,
                        clipPath: "inset(0 50% 0 50%)",
                        filter: "brightness(2) drop-shadow(0 0 30px red)"
                    }}
                    animate={{
                        opacity: 1,
                        clipPath: "inset(0 0% 0 0%)",
                        filter: "brightness(1) drop-shadow(0 0 15px rgba(220,38,38,0.6))"
                    }}
                    transition={{
                        duration: 2.5,
                        ease: [0.22, 1, 0.36, 1] // Custom ease for smooth "laser" feel
                    }}
                    className={cn(
                        "relative transition-all duration-1000",
                        introMode ? "w-[300px] sm:w-[500px] md:w-[700px]" : "w-[280px] sm:w-[400px] md:w-[500px]"
                    )}
                >
                    <img
                        src={imageSrc}
                        alt={`${line1} ${line2}`}
                        className="w-full h-auto"
                    />
                </motion.div>
            ) : (
                <>
                    {/* Top Bar */}
                    <motion.div
                        layoutId="title-top-bar"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-[2px] w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8),0_0_20px_rgba(220,38,38,0.6)] mb-2"
                    />

                    {/* Line 1 */}
                    <motion.h1
                        layoutId="title-line-1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                            "font-bold text-transparent tracking-widest relative transition-all duration-1000",
                            introMode ? "text-6xl sm:text-8xl md:text-9xl" : "text-5xl sm:text-7xl md:text-8xl"
                        )}
                        style={{
                            fontFamily: "var(--font-benguiat), serif",
                            WebkitTextStroke: "2px #dc2626",
                            textShadow: "0 0 10px rgba(220,38,38,0.8), 0 0 20px rgba(220,38,38,0.6)",
                        }}
                    >
                        <span className="text-[1.2em] -mr-2 inline-block transform translate-y-1">{line1.charAt(0)}</span>
                        {line1.slice(1, -1)}
                        <span className="text-[1.2em] -ml-2 inline-block transform translate-y-1">{line1.charAt(line1.length - 1)}</span>
                    </motion.h1>

                    {/* Line 2 */}
                    <motion.h2
                        layoutId="title-line-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={cn(
                            "font-bold text-transparent tracking-widest mt-[-10px] relative transition-all duration-1000",
                            introMode ? "text-5xl sm:text-7xl md:text-8xl" : "text-4xl sm:text-6xl md:text-7xl"
                        )}
                        style={{
                            fontFamily: "var(--font-benguiat), serif",
                            WebkitTextStroke: "2px #dc2626",
                            textShadow: "0 0 10px rgba(220,38,38,0.8), 0 0 20px rgba(220,38,38,0.6)",
                        }}
                    >
                        {line2}
                    </motion.h2>

                    {/* Bottom Bar */}
                    <motion.div
                        layoutId="title-bottom-bar"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-[2px] w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8),0_0_20px_rgba(220,38,38,0.6)] mt-2"
                    />
                </>
            )}
        </motion.div>
    );
};
