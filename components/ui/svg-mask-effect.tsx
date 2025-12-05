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
    onToggle,
}: {
    normalImage: string;
    upsideDownImage: string;
    className?: string;
    children?: React.ReactNode;
    isUpsideDown?: boolean;
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
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${baseImage})` }}
                />
            </AnimatePresence>

            {/* Layer 2: Reveal Image (Masked by cursor) */}
            <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: `url(${revealImage})`,
                }}
                animate={{
                    WebkitMaskImage: mousePosition
                        ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`
                        : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
                    maskImage: mousePosition
                        ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`
                        : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
                } as any}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />

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

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {children}
            </div>
        </div>
    );
};
