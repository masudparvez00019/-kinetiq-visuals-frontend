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
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="3" y="5" width="26" height="22" rx="4" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 11H29" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M7 5V11M12 5V11M17 5V11M22 5V11M27 5V11" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M7 16V21M12 16V21M17 16V21M22 16V21M27 16V21" stroke="#2563eb" strokeWidth="1.5" />
        <polygon points="13,13 21,16 13,19" fill="#3b82f6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Cinematic Color Grading",
    lessons: "8 LESSONS",
    description: "Create professional color and mood that stands out and tells a story.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="11" stroke="url(#colorGradWheel)" strokeWidth="4.5" fill="none" />
        <defs>
          <linearGradient id="colorGradWheel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f59e0b" />
            <stop offset="40%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Content That Converts",
    lessons: "6 LESSONS",
    description: "Edit videos that grab attention and generate clients.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="5" y="19" width="4" height="8" rx="1" fill="#2563eb" />
        <rect x="11" y="14" width="4" height="13" rx="1" fill="#3b82f6" />
        <rect x="17" y="9" width="4" height="18" rx="1" fill="#60a5fa" />
        <path d="M7 14L16 6L21 11L27 5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 5H27V10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Sound Design & Music",
    lessons: "6 LESSONS",
    description: "Elevate your videos with the right sound, music and audio flow.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="5" y="11" width="3.5" height="10" rx="1.75" fill="#3b82f6" />
        <rect x="11" y="6" width="3.5" height="20" rx="1.75" fill="#60a5fa" />
        <rect x="17" y="9" width="3.5" height="14" rx="1.75" fill="#2563eb" />
        <rect x="23" y="13" width="3.5" height="6" rx="1.75" fill="#3b82f6" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Short Form Strategy",
    lessons: "5 LESSONS",
    description: "Create viral reels and short form content that performs.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="9" y="4" width="14" height="24" rx="3" stroke="#3b82f6" strokeWidth="2" fill="#1e3a8a" fillOpacity="0.3" />
        <line x1="13" y1="7" x2="19" y2="7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="24" r="1" fill="#60a5fa" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Client Workflow",
    lessons: "5 LESSONS",
    description: "Learn the complete client process from start to finish.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="13" cy="11" r="4.5" fill="#3b82f6" />
        <path d="M5 23C5 18.5817 8.58172 15 13 15C17.4183 15 21 18.5817 21 23H5Z" fill="#3b82f6" />
        <circle cx="22" cy="12" r="3.5" fill="#60a5fa" opacity="0.8" />
        <path d="M17 23C17 20.3 19 18.2 21.5 18C23.5 18 25.5 19.5 26 21.5C26 22 26 22.5 26 23H17Z" fill="#60a5fa" opacity="0.8" />
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
            <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
            <span className="font-heading font-normal text-xs md:text-sm text-white tracking-normal">
              What we Learn
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[48px] text-white leading-tight md:leading-[56px] tracking-normal max-w-[902px]">
            Create High Converting <br className="hidden md:block" /> Video Content
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
              className="wwl-card group relative flex flex-col justify-between gap-6 p-7 md:p-8 bg-[#08141F] border border-[#142036] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#1d3557] hover:shadow-[0_12px_40px_rgba(0,100,255,0.08)]"
            >
              {/* Subtle Blue glow on hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/0 group-hover:bg-blue-600/10 blur-[40px] transition-all duration-500 rounded-full pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                {/* Top Row: Icon Box + Number */}
                <div className="flex items-start justify-between">
                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0e172a] border border-[#1b2b48] flex items-center justify-center shrink-0 shadow-inner">
                    {mod.icon}
                  </div>
                  {/* Number */}
                  <span className="font-heading font-semibold text-lg md:text-xl text-[#0080ff] tracking-wider">
                    {mod.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-normal text-lg md:text-[20px] text-white leading-snug tracking-wide">
                  {mod.title}
                </h3>

                {/* Lessons Pill */}
                <div>
                  <span className="inline-block bg-[#0d1627] border border-[#1b2b48] text-[#0080ff] text-[10px] md:text-[11px] font-satoshi font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {mod.lessons}
                  </span>
                </div>

                {/* Description */}
                <p className="font-satoshi font-light text-xs md:text-sm text-[#94a3b8] leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
