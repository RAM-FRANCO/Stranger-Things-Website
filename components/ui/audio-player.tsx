"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const AudioPlayer = ({ start = false }: { start?: boolean }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio("/audio/stranger-things-theme.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (start && audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                setIsMuted(false);
            }).catch(e => {
                console.error("Playback failed:", e);
                setIsMuted(true);
            });
        }
    }, [start]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
            if (!isMuted && audioRef.current.paused && start) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
                setIsPlaying(true);
            }
        }
    }, [isMuted, start]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className="bg-black/50 border-red-900/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500/50 backdrop-blur-sm transition-all duration-300 rounded-full w-12 h-12 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <VolumeX className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Volume2 className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </div>
    );
};
