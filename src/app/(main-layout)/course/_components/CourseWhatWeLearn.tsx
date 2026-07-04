"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MODULES = [
  {
    number: "01",
    title: "Professional Editing",
    lessons: "12 LESSONS",
    description: "Master industry-standard editing techniques used by top creators and production houses.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7 text-[#0080ff]">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
        <path d="M2 8h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Cinematic Color Grading",
    lessons: "8 LESSONS",
    description: "Create professional color and mood that stands out and tells a story.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#0080ff" strokeWidth={1.5} />
        <path d="M12 2 a10 10 0 0 1 0 20" fill="#22c55e" opacity="0.85" />
        <path d="M12 2 a10 10 0 0 0 0 20" fill="#ef4444" opacity="0.75" />
        <circle cx="12" cy="12" r="4" fill="#f59e0b" opacity="0.9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Content That Converts",
    lessons: "6 LESSONS",
    description: "Edit videos that grab attention and generate clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={1.7} className="w-7 h-7">
        <path d="M3 20h18" strokeLinecap="round" />
        <path d="M5 14l4-4 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8l2-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Sound Design & Music",
    lessons: "6 LESSONS",
    description: "Elevate your videos with the right sound, music and audio flow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={1.7} className="w-7 h-7">
        <path d="M2 12 Q5 6 8 12 Q11 18 14 12 Q17 6 20 12 Q22 15 24 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Short Form Strategy",
    lessons: "3 LESSONS",
    description: "Create viral reels and short form content that performs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={1.7} className="w-7 h-7">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M7 6h10M7 18h10" strokeLinecap="round" />
        <circle cx="12" cy="19.5" r="0.7" fill="#0080ff" stroke="none" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Client Workflow",
    lessons: "5 LESSONS",
    description: "Learn the complete client process from start to finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={1.7} className="w-7 h-7">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
        <path d="M17 13c2 0 4 1.5 4 4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function CourseWhatWeLearn() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".wwl-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".wwl-card",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".wwl-grid", start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle center glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 relative z-10">

        {/* Section Header */}
        <div className="wwl-header flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
            <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
              What we Learn
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[44px] text-white leading-[1.15] tracking-wide max-w-[700px]">
            Create High Converting <br className="hidden md:inline" /> Video Content
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[640px]">
            Learn how to create engaging videos that capture attention, build trust, and drive results. Master proven editing and content strategies to turn viewers into customers.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="wwl-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {MODULES.map((mod, i) => (
            <div
              key={i}
              className="wwl-card group relative flex flex-col gap-5 p-7 bg-[#070914] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Blue glow on hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/0 group-hover:bg-blue-600/8 blur-[40px] transition-all duration-500 rounded-full pointer-events-none" />

              {/* Top Row: Icon Box + Number */}
              <div className="flex items-start justify-between relative z-10">
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-xl bg-[#0a0d1a] border border-white/5 flex items-center justify-center shrink-0">
                  {mod.icon}
                </div>
                {/* Number */}
                <span className="font-heading font-semibold text-sm text-[#0080ff] tracking-wider">
                  {mod.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-normal text-lg md:text-xl text-white leading-snug tracking-wide relative z-10">
                {mod.title}
              </h3>

              {/* Lessons Pill */}
              <div className="relative z-10">
                <span className="inline-block bg-[#0a0d1a] border border-white/5 text-[#0080ff] text-[9px] font-satoshi font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {mod.lessons}
                </span>
              </div>

              {/* Description */}
              <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed relative z-10">
                {mod.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
