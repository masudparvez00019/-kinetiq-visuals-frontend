"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function InitialLoader() {
  const [isDone, setIsDone] = useState(false);
  const [dotIndex, setDotIndex] = useState(0);

  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. Cycling Dot Animation & Auto Timer
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 7);
    }, 190);

    const timer = setTimeout(() => {
      triggerExitAnimation();
    }, 2400);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // 2. GSAP Exit Transition
  const triggerExitAnimation = () => {
    if (!loaderRef.current || !contentRef.current) {
      setIsDone(true);
      document.body.style.overflow = "";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        document.body.style.overflow = "";
      },
    });

    // 60FPS Hardware-accelerated exit: fade out center content smoothly
    tl.to(contentRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Smooth curtain lift & fade out without filter blur stutter
    tl.to(
      loaderRef.current,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.2"
    );
  };

  if (isDone) return null;

  const totalDots = 7;
  const activeDotCount = (dotIndex % 3) + 3;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#020208]/65 backdrop-blur-2xl text-white overflow-hidden pointer-events-auto select-none will-change-[transform,opacity]"
    >
      {/* Soft Ambient Purple/Indigo Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-[#4f46e5]/20 blur-[140px] rounded-full" />
      </div>

      {/* Main Center Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Proportional Neon Arc Circle */}
        <div className="relative w-44 h-44 md:w-48 md:h-48 flex items-center justify-center">
          {/* Animated Rotating SVG Neon Arc Ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-[spin_2.6s_linear_infinite] drop-shadow-[0_0_14px_rgba(99,102,241,0.95)] drop-shadow-[0_0_28px_rgba(79,70,229,0.7)]"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="refPurpleBlueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c7d2fe" />
                <stop offset="35%" stopColor="#818cf8" />
                <stop offset="70%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3730a3" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Faint Outer Guide Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(129, 140, 248, 0.12)"
              strokeWidth="1.2"
            />

            {/* Glowing Active Neon Trail Arc */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#refPurpleBlueGradient)"
              strokeWidth="2.2"
              strokeDasharray="210 70"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Content: Small Elegant Loading Text + Subtagline + 7 Dots */}
          <div className="flex flex-col items-center justify-center text-center gap-1.5 z-10">
            {/* Main "Loading" Text */}
            <span className="font-satoshi font-medium text-base md:text-lg tracking-[0.2em] text-[#e0e7ff] uppercase drop-shadow-[0_0_12px_rgba(129,140,248,0.85)]">
              Loading
            </span>

            {/* Subtagline */}
            <span className="font-satoshi text-[9px] font-medium tracking-[0.28em] uppercase text-indigo-200/80">
              KinetiQ Visuals
            </span>

            {/* 7 Animated Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalDots }).map((_, i) => {
                const isFilled = i < activeDotCount;
                return (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isFilled
                        ? "bg-[#ffffff] shadow-[0_0_8px_#ffffff] scale-100"
                        : "border border-[#818cf8]/70 bg-transparent scale-90"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
