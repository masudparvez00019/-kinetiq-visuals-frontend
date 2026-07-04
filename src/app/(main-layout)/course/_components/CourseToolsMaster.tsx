"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOOLS = [
  {
    name: "Premier Pro",
    bg: "bg-[#1a1566]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#9999FF">
          Pr
        </text>
      </svg>
    ),
  },
  {
    name: "After Effect",
    bg: "bg-[#1a0e3d]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#9999FF">
          Ae
        </text>
      </svg>
    ),
  },
  {
    name: "DaVinci Resolve",
    bg: "bg-[#1a0a0a]",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        {/* DaVinci Resolve sphere icon approximation */}
        <defs>
          <radialGradient id="dv-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ff6b8a" />
            <stop offset="60%" stopColor="#e8273f" />
            <stop offset="100%" stopColor="#9b0020" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="url(#dv-grad)" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="white" strokeWidth="2.5" opacity="0.9" />
        <circle cx="24" cy="24" r="3" fill="white" opacity="0.95" />
        {/* Top dot */}
        <circle cx="24" cy="6" r="2.5" fill="white" opacity="0.85" />
        {/* Bottom dot */}
        <circle cx="24" cy="42" r="2.5" fill="white" opacity="0.85" />
      </svg>
    ),
  },
  {
    name: "Photoshop",
    bg: "bg-[#001e36]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#31A8FF">
          Ps
        </text>
      </svg>
    ),
  },
  {
    name: "Premier Pro",
    bg: "bg-[#1a1566]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#9999FF">
          Pr
        </text>
      </svg>
    ),
  },
  {
    name: "After Effect",
    bg: "bg-[#1a0e3d]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="#9999FF">
          Ae
        </text>
      </svg>
    ),
  },
];

export default function CourseToolsMaster() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".tools-label",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".tool-card",
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".tools-grid-row", start: "top 88%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-20 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center gap-10 relative z-10">

        {/* Section Label */}
        <span className="tools-label font-satoshi font-bold text-[11px] uppercase tracking-[0.3em] text-[#0080ff] select-none">
          Tools You'll Master
        </span>

        {/* Tools Grid Row */}
        <div className="tools-grid-row flex flex-wrap justify-center gap-6 md:gap-8">
          {TOOLS.map((tool, i) => (
            <div
              key={i}
              className="tool-card flex flex-col items-center gap-3 group"
            >
              {/* Icon Card */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${tool.bg} border border-white/5 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/10`}
              >
                {tool.icon}
              </div>
              {/* Tool Name */}
              <span className="font-satoshi text-[11px] md:text-xs text-slate-400 font-light text-center group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
