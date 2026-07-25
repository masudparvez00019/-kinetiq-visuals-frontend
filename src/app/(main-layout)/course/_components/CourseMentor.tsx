"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/context/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CourseMentor() {
  const { siteConfig } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const MENTOR_STATS = [
    { value: siteConfig.mentorExp || "6+", label: "Years Experience" },
    { value: siteConfig.mentorProj || "100+", label: "Projects Delivered" },
    { value: siteConfig.mentorStud || "1200+", label: "Students Trained" },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".mentor-card",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".mentor-border-line-svg",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Main Outer Card with Special Top & Bottom Gradient Borders (Exact CaseStudies Lens Style) */}
        <div className="mentor-card relative w-full rounded-[32px] bg-[#000716] p-6 md:p-10 shadow-2xl overflow-hidden">
          
          {/* SPECIAL TOP SHINY BORDER LINE (Tapered Lens Shape from CaseStudies) */}
          <svg
            className="mentor-border-line-svg origin-center absolute top-0 left-[24px] right-[24px] w-[calc(100%-48px)] h-[3.5px] pointer-events-none z-20"
            viewBox="0 0 100 3.5"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mentor-glow-grad-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#mentor-glow-grad-top)" />
          </svg>

          {/* SPECIAL BOTTOM SHINY BORDER LINE (Tapered Lens Shape from CaseStudies) */}
          <svg
            className="mentor-border-line-svg origin-center absolute bottom-0 left-[24px] right-[24px] w-[calc(100%-48px)] h-[3.5px] pointer-events-none z-20"
            viewBox="0 0 100 3.5"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mentor-glow-grad-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#mentor-glow-grad-bottom)" />
          </svg>

          {/* Background Glow */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">

            {/* Left: Photo Box */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full aspect-[4/4.5] rounded-[24px] overflow-hidden border border-[#142642] bg-[#040a16] shadow-xl group">
                {/* Rich Deep Blue Radial Glow behind head */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#0044cc_0%,_#021235_55%,_#040814_100%)] opacity-95 z-0" />
                <img
                  src="/jowel-avatar.png"
                  alt={siteConfig.mentorName || "Jowel Mahmud"}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-95 z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Info Content */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-5">
              
              {/* Header Label */}
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
                <span className="font-heading font-normal text-xs md:text-sm text-white tracking-normal select-none">
                  Your Mentor
                </span>
              </div>

              {/* Mentor Name */}
              <h2 className="font-heading font-normal text-3xl sm:text-4xl md:text-[48px] text-white leading-tight tracking-normal">
                {siteConfig.mentorName || "Jowel Mahmud"}
              </h2>

              {/* Title / Role */}
              <p className="font-satoshi font-semibold text-sm md:text-base text-[#0080ff]">
                {siteConfig.mentorTitle || "Founder Of 'KinetiQ Visuals'"}
              </p>

              {/* Bio Description */}
              <p className="font-satoshi font-light text-xs md:text-sm text-slate-300 leading-relaxed max-w-[520px]">
                {siteConfig.mentorBio || "I've helped 100+ businesses and creators elevate their brand with cinematic videos that drive results. Now I'm teaching the exact system I use."}
              </p>

              {/* Bottom Stats Card */}
              <div className="mt-4 bg-[#081220]/90 border border-[#142642] rounded-2xl p-5 md:px-6 md:py-5 grid grid-cols-3 divide-x divide-[#142642] shadow-inner">
                {MENTOR_STATS.map((stat, i) => (
                  <div key={i} className={`flex flex-col items-start px-3 md:px-5 gap-1 ${i === 0 ? "pl-1" : ""}`}>
                    <span className="font-satoshi font-bold text-lg sm:text-xl md:text-2xl text-[#0080ff] leading-none">
                      {stat.value}
                    </span>
                    <span className="font-satoshi text-[11px] md:text-xs text-slate-400 font-light leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
