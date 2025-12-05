"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StrangerThingsHero = ({
    normalImage,
    upsideDownImage,
    className,
    children,
    isUpsideDown = false,
    isActive = false,
    onToggle,
}: {
    normalImage: string;
    upsideDownImage: string;
    className?: string;
    children?: React.ReactNode;
    isUpsideDown?: boolean;
    isActive?: boolean;
    onToggle?: () => void;
}) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateMousePosition = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", updateMousePosition);
            container.addEventListener("mouseleave", () => setMousePosition(null));
        }
        return () => {
            if (container) {
                container.removeEventListener("mousemove", updateMousePosition);
                container.removeEventListener("mouseleave", () => setMousePosition(null));
            }
        };
    }, []);

    // Determine which images to use based on current dimension
    const baseImage = isUpsideDown ? upsideDownImage : normalImage;
    const revealImage = isUpsideDown ? normalImage : upsideDownImage;

    return (
        <div
            ref={containerRef}
            className={cn("h-screen w-full relative overflow-hidden bg-black", className)}
        >
            {/* Layer 1: Base Image (Changes based on dimension) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isUpsideDown ? "upside-down" : "normal"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={baseImage}
                        alt="Background"
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Layer 2: Reveal Image (Masked by cursor) */}
            <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={{
                    WebkitMaskImage: mousePosition
                        ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`
                        : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
                    maskImage: mousePosition
                        ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`
                        : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
                } as any}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            >
                <img
                    src={revealImage}
                    alt="Reveal"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Glitch overlay effect during transition */}
            <AnimatePresence>
                {isUpsideDown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 pointer-events-none bg-red-900 mix-blend-multiply"
                    />
                )}
            </AnimatePresence>

            {/* Dimensional Glitch Effect (Flashes the other world) */}
            <DimensionalGlitch image={revealImage} isActive={isActive} />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {children}
            </div>
        </div>
    );
};

const DimensionalGlitch = ({ image, isActive }: { image: string; isActive: boolean }) => {
    const [triggerKey, setTriggerKey] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!isActive) return;

        audioRef.current = new Audio("/audio/lightning.mp3");
        audioRef.current.volume = 0.6;

        const triggerGlitch = () => {
            // Play audio
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }

            // Trigger animation
            setTriggerKey(prev => prev + 1);

            // Chance for a double flash (30%)
            if (Math.random() < 0.3) {
                setTimeout(() => {
                    setTriggerKey(prev => prev + 1);
                }, 150);
            }

            // Schedule next glitch (Natural pacing: 8s - 20s)
            const nextGlitch = Math.random() * 12000 + 8000;
            setTimeout(triggerGlitch, nextGlitch);
        };

        const timeout = setTimeout(triggerGlitch, 4000);
        return () => clearTimeout(timeout);
    }, [isActive]);

    return (
        <AnimatePresence>
            {triggerKey > 0 && (
                <>
                    {/* Frame 2: Bright Flash (Reveal Counterpart World) */}
                    <motion.div
                        key={`flash-${triggerKey}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: 0.2,
                            times: [0, 0.1, 0.4, 1], // Fast in, hold briefly, fast out
                            ease: "linear"
                        }}
                        className="absolute inset-0 z-30 pointer-events-none"
                    >
                        <img
                            src={image}
                            alt="Dimensional Glitch"
                            className="w-full h-full object-cover object-center filter brightness-150 contrast-125"
                        />
                        {/* White overlay for extra brightness punch */}
                        <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
                    </motion.div>

                    {/* Frame 3: Quick Darkening Fade (Eye Adaptation) */}
                    <motion.div
                        key={`dark-${triggerKey}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 0.4, 0] }}
                        transition={{
                            duration: 0.4,
                            times: [0, 0.4, 0.5, 1], // Starts after flash fades
                            ease: "easeOut"
                        }}
                        className="absolute inset-0 z-40 pointer-events-none bg-black"
                    />
                </>
            )}
        </AnimatePresence>
    );
};
