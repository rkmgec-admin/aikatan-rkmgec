"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LoaderProps {
  finishLoading: () => void;
}

// --- Faster Floating Gold Dust Particles ---
interface GoldDustProps {
  count: number;
  lite: boolean;
}

const GoldDust = memo(({ count, lite }: GoldDustProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        duration: (lite ? 4 : 3) + Math.random() * (lite ? 3 : 4),
        delay: Math.random() * (lite ? 2 : 3),
        size: (lite ? 1.5 : 2) + Math.random() * (lite ? 2 : 3),
        drift: Math.random() * (lite ? 16 : 40) - (lite ? 8 : 20),
      })),
    [count, lite]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle, i) => {
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-[#FAD961] ${lite ? "" : "blur-[1px]"}`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              bottom: "-10%",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: lite ? [0, particle.drift] : [0, particle.drift, 0],
              opacity: lite ? [0, 0.55, 0] : [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
});

GoldDust.displayName = "GoldDust";

const EtherealLoomLoader = ({ finishLoading }: LoaderProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isLiteMode, setIsLiteMode] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowCpu = (nav.hardwareConcurrency ?? 8) <= 4;
    const lowMemory = (nav.deviceMemory ?? 8) <= 4;
    const smallViewport = window.innerWidth <= 768;
    setIsLiteMode(prefersReducedMotion || lowCpu || lowMemory || smallViewport);
  }, [prefersReducedMotion]);

  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;
    let finishTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          exitTimeout = setTimeout(() => setIsExiting(true), isLiteMode ? 250 : 500);
          finishTimeout = setTimeout(finishLoading, isLiteMode ? 850 : 1300);
          return 100;
        }
        const increment = isLiteMode
          ? prev > 85
            ? 1.2
            : prev > 40
              ? 2.2
              : 3.4
          : prev > 85
            ? 0.8
            : prev > 40
              ? 1.8
              : 3.0;
        return Math.min(prev + increment, 100);
      });
    }, isLiteMode ? 70 : 40);

    return () => {
      clearInterval(interval);
      if (exitTimeout) clearTimeout(exitTimeout);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [finishLoading, isLiteMode]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const progressRatio = progress / 100;
  const particleCount = isLiteMode ? 6 : 15;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, ...(isLiteMode ? {} : { filter: "blur(20px)" }) }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} // Quicker fade out
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070303] select-none font-sans"
        >
          {/* Deep Ambient Aura */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,156,56,0.12)_0%,rgba(7,3,3,1)_70%)]"
            animate={isLiteMode ? { opacity: 0.85 } : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={isLiteMode ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }} // Faster aura pulse
          />
          
          <GoldDust count={particleCount} lite={isLiteMode} />

          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center z-10">
            
            {/* Pulsing Glow behind the mandala */}
            <motion.div 
              className={`absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#F47920] ${isLiteMode ? "blur-[36px]" : "blur-[80px]"}`}
              animate={isLiteMode ? { opacity: 0.2 } : { opacity: [0.15, 0.4, 0.15] }}
              transition={isLiteMode ? { duration: 0.2 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }} // Faster heartbeat
            />

            <svg viewBox="0 0 300 300" className={`w-full h-full ${isLiteMode ? "" : "drop-shadow-[0_0_20px_rgba(198,156,56,0.25)]"}`}>
              <defs>
                {/* The Shimmering Metallic Gradient */}
                <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A6B27" />
                  <stop offset="30%" stopColor="#FAD961">
                    {/* Sped up the metallic shimmer sweep */}
                    {!isLiteMode && <animate attributeName="offset" values="0; 1; 0" dur="2s" repeatCount="indefinite" />}
                  </stop>
                  <stop offset="70%" stopColor="#C69C38" />
                  <stop offset="100%" stopColor="#5B1229" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <g transform="translate(150, 150)">
                {/* 1. Outer Orbit (Dotted & Counter-Rotating) */}
                <motion.g 
                  animate={isLiteMode ? undefined : { rotate: -360 }} 
                  transition={isLiteMode ? undefined : { duration: 25, repeat: Infinity, ease: "linear" }} // 2x Faster
                >
                  <circle r="135" fill="none" stroke="#5B1229" strokeWidth="1" strokeDasharray="4 12" opacity="0.6"/>
                  <circle r="125" fill="none" stroke="#C69C38" strokeWidth="0.5" strokeDasharray="1 6" opacity="0.4"/>
                </motion.g>

                {/* 2. Middle Layer: The 12-Point Sunburst */}
                <motion.g 
                  animate={isLiteMode ? undefined : { rotate: 360 }} 
                  transition={isLiteMode ? undefined : { duration: 35, repeat: Infinity, ease: "linear" }} // 2x+ Faster
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.path
                      key={`sunburst-${i}`}
                      d="M 0 -115 L 5 -90 L 0 -105 L -5 -90 Z"
                      fill="none"
                      stroke="url(#shimmerGrad)"
                      strokeWidth="1"
                      transform={`rotate(${i * 30})`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: progressRatio > (i / 12) * 0.5 ? 0.9 : 0,
                        scale: progressRatio > (i / 12) * 0.5 ? 1 : 0.8
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }} // Snappier reveal
                    />
                  ))}
                </motion.g>

                {/* 3. Core Masterpiece: The Blooming Lotus */}
                <motion.g
                  animate={isLiteMode ? undefined : { scale: [1, 1.03, 1] }}
                  transition={isLiteMode ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }} // Faster Heartbeat
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={`petal-${i}`} transform={`rotate(${angle})`}>
                      <motion.path
                        d="M 0 -45 C 30 -45, 45 -85, 0 -110 C -45 -85, -30 -45, 0 -45 Z"
                        fill={progressRatio > 0.8 ? "rgba(198,156,56,0.08)" : "none"}
                        stroke="url(#shimmerGrad)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: Math.min(1, progressRatio * 1.5) }}
                        transition={{ duration: 0.1 }}
                        filter={isLiteMode ? undefined : "url(#glow)"}
                      />
                      <motion.path
                        d="M 0 -45 C 15 -45, 20 -65, 0 -80 C -20 -65, -15 -45, 0 -45 Z"
                        fill="none"
                        stroke="#F47920"
                        strokeWidth="1.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: Math.max(0, (progressRatio - 0.3) * 1.5),
                          opacity: progressRatio > 0.3 ? 0.9 : 0
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </g>
                  ))}
                </motion.g>

                {/* 4. Center Progress Ring */}
                <motion.circle
                  r="42"
                  fill="none"
                  stroke="url(#shimmerGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="264" 
                  strokeDashoffset={264 - (264 * progressRatio)}
                  transform="rotate(-90)"
                  filter={isLiteMode ? undefined : "url(#glow)"}
                />
              </g>
            </svg>

            {/* Typography Centered in Mandala */}
            <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                className="text-[#FAD961] font-serif tracking-widest flex items-center justify-center leading-none"
                style={{
                  fontSize: progress >= 99 ? "2.9rem" : "2.4rem",
                  textShadow: isLiteMode ? "none" : "0px 0px 14px rgba(250, 217, 97, 0.5)",
                  transition: "font-size 0.5s cubic-bezier(0.25, 1, 0.5, 1)", // Faster snap to full size
                }}
              >
                <span className="font-light">{Math.floor(progress)}</span>
                <span className="text-base text-[#F47920] ml-1 opacity-90 font-sans leading-none">%</span>
              </motion.div>
            </div>
          </div>

          {/* Majestic Typography Footer */}
          <div className="absolute bottom-16 flex flex-col items-center w-full z-10">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }} // Quicker text reveal
              className="flex flex-col items-center gap-4"
            >
              {/* Filigree Ornament top */}
              <svg width="60" height="12" viewBox="0 0 60 12" className="opacity-60">
                <path d="M0,6 L20,6 M40,6 L60,6 M30,0 L36,6 L30,12 L24,6 Z" fill="#C69C38" stroke="#C69C38"/>
              </svg>

              <div className="text-center">
                <span className="block text-[#C69C38]/80 text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-2">
                  Curating Legacy
                </span>
                <motion.h2 
                  className="text-[#FAD961] text-2xl md:text-3xl tracking-[0.2em] font-serif uppercase font-light"
                  animate={isLiteMode ? undefined : { textShadow: ["0 0 8px rgba(250,217,97,0.3)", "0 0 24px rgba(250,217,97,0.8)", "0 0 8px rgba(250,217,97,0.3)"] }}
                  transition={isLiteMode ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }} // Faster text pulse
                >
                  Gathering the Arts
                </motion.h2>
              </div>

              {/* Filigree Ornament bottom */}
              <svg width="60" height="12" viewBox="0 0 60 12" className="opacity-60 rotate-180">
                <path d="M0,6 L20,6 M40,6 L60,6 M30,0 L36,6 L30,12 L24,6 Z" fill="#C69C38" stroke="#C69C38"/>
              </svg>
            </motion.div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EtherealLoomLoader;