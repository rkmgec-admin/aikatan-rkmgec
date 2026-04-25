"use client";

import Image from "next/image";
import { Zap, ShieldCheck, Ticket, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const ETicketSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [enableTilt, setEnableTilt] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [currentPassIndex, setCurrentPassIndex] = useState(0);
  const ticketFormUrl = "https://forms.gle/JdWc6cryAi2GkWcN8";

  const passImages = [
    {
      src: "/event_pass_frontside.jpeg",
      alt: "Event pass front side",
    },
    {
      src: "/event_pass_backside.jpeg",
      alt: "Event pass back side",
    },
  ];

  // Slight 3D rotation based on mouse position
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setEnableTilt(!reducedMotion && !coarsePointer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentPassIndex((prev) => (prev + 1) % passImages.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [passImages.length]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Determine mouse pos relative to center
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleBuyTicket = () => {
    window.open(ticketFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative py-12 md:py-24 overflow-hidden font-sans">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-3 md:space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-foreground tracking-wider">
              E-Ticket{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron">
                Pass
              </span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-outfit tracking-widest uppercase">
              Get Your Digital Access
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* REDESIGNED WIDE TICKET CARD */}
        <div
          className="relative perspective-1000"
          onMouseMove={enableTilt ? handleMouseMove : undefined}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

          <motion.div
            style={{
              rotateX: enableTilt ? rotateX : 0,
              rotateY: enableTilt ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] border border-accent/20 bg-secondary-bg/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
          >
            {/* TOP SECTION: 1600x400 IMAGE BANNER */}
            {/* aspect-[4/1] guarantees the container matches your exact image dimensions */}
            <div className="relative w-full aspect-[4/1] bg-black/50 border-b border-dashed border-accent/30 [transform:translateZ(30px)]">
              <motion.div
                key={passImages[currentPassIndex].src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={passImages[currentPassIndex].src}
                  alt={passImages[currentPassIndex].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain object-center"
                />
              </motion.div>
              {/* Inner Glass border overlay */}
              <div className="absolute inset-0 border-[2px] sm:border-[3px] md:border-[4px] border-white/5 rounded-t-[1.25rem] sm:rounded-t-[1.5rem] md:rounded-t-[2rem] pointer-events-none" />
            </div>

            {/* TICKET CUTOUTS (The circles on the edges to simulate a physical ticket) */}
            <div className="absolute left-[-15px] top-[calc(100%-120px)] md:top-[calc(100%-140px)] w-[30px] h-[30px] rounded-full bg-background border-r border-accent/20 z-10 hidden sm:block" />
            <div className="absolute right-[-15px] top-[calc(100%-120px)] md:top-[calc(100%-140px)] w-[30px] h-[30px] rounded-full bg-background border-l border-accent/20 z-10 hidden sm:block" />

            {/* BOTTOM SECTION: TICKET STUB / INFO */}
            <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8 bg-gradient-to-b from-background/40 to-background/80 text-center md:text-left [transform:translateZ(20px)]">
              {/* Left Side: Specs */}
              <div className="w-full md:w-1/2 flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(184,92,56,0.2)]">
                  <Ticket className="text-primary w-7 h-7" />
                </div>

                <div className="space-y-3 max-w-xl">
                  <div>
                    <h4 className="text-accent/80 font-inter tracking-[0.2em] text-[10px] uppercase mb-1">
                      Item Class
                    </h4>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron tracking-wider">
                      Digital Access Pass
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-3 sm:gap-6 text-muted-foreground text-sm font-spaceGrotesk tracking-wide">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent" /> Instant
                      Delivery
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" /> Full Access
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 font-inter">
                    Valid for Outsiders & Other Institution Students.
                  </p>
                </div>
              </div>

              {/* Right Side: Price & CTA */}
              <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-accent/10 pt-5 md:pt-0 md:pl-8">
                <div className="text-center md:text-right">
                  <h2 className="text-muted-foreground font-inter text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-1">
                    FESTIVAL / 2026
                  </h2>
                  <div className="flex items-baseline justify-center md:justify-end gap-2">
                    {/* Updated Price Here */}
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-spaceGrotesk tracking-widest">
                      ₹899
                    </span>
                    <span className="text-accent/40 text-[10px] md:text-xs font-kodeMono font-semibold uppercase">
                      / Person
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyTicket}
                  className="w-full md:w-auto px-8 h-12 md:h-14 bg-fest-pink/10 hover:bg-fest-pink/20 border border-fest-pink text-fest-pink font-outfit font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(227,74,123,0.15)] hover:shadow-[0_0_25px_rgba(227,74,123,0.3)] backdrop-blur-sm rounded-lg"
                >
                  {showComingSoon ? "Coming Soon!" : "Secure Your Pass"}
                  {!showComingSoon && (
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ETicketSection;
