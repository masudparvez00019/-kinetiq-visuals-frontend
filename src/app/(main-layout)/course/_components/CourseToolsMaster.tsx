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
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00005b] border border-[#1e1e78] flex items-center justify-center shadow-inner shrink-0">
        <span className="font-sans font-bold text-2xl md:text-3xl text-[#9999ff] tracking-tight">Pr</span>
      </div>
    ),
  },
  {
    name: "After Effect",
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00005b] border border-[#1e1e78] flex items-center justify-center shadow-inner shrink-0">
        <span className="font-sans font-bold text-2xl md:text-3xl text-[#9999ff] tracking-tight">Ae</span>
      </div>
    ),
  },
  {
    name: "DaVinci Resolve",
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center shadow-md shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="50" fill="#f83b54" />
          <circle cx="50" cy="36" r="22" fill="#ff7b92" />
          <circle cx="37" cy="58" r="22" fill="#ff5c77" />
          <circle cx="63" cy="58" r="22" fill="#ff9ebb" />
          <circle cx="50" cy="48" r="10" fill="#ffffff" />
        </svg>
      </div>
    ),
  },
  {
    name: "Photoshop",
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#001e36] border border-[#00345e] flex items-center justify-center shadow-inner shrink-0">
        <span className="font-sans font-bold text-2xl md:text-3xl text-[#31a8ff] tracking-tight">Ps</span>
      </div>
    ),
  },
  {
    name: "Premier Pro",
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00005b] border border-[#1e1e78] flex items-center justify-center shadow-inner shrink-0">
        <span className="font-sans font-bold text-2xl md:text-3xl text-[#9999ff] tracking-tight">Pr</span>
      </div>
    ),
  },
  {
    name: "After Effect",
    icon: (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00005b] border border-[#1e1e78] flex items-center justify-center shadow-inner shrink-0">
        <span className="font-sans font-bold text-2xl md:text-3xl text-[#9999ff] tracking-tight">Ae</span>
      </div>
    ),
  },
];

function TiltCard3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 14;
    const rotateY = (x / (rect.width / 2)) * 14;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;
    cardRef.current.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardRef.current.style.transition = "transform 0.5s ease-out";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

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
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-10 relative z-10">

        {/* Section Label */}
        <h2 className="tools-label font-heading font-normal text-xs sm:text-sm md:text-base text-[#0080ff] tracking-[0.25em] uppercase text-center select-none">
          TOOLS YOU'LL MASTER
        </h2>

        {/* Tools Grid Row */}
        <div className="tools-grid-row flex flex-wrap justify-center items-center gap-4 md:gap-5 w-full">
          {TOOLS.map((tool, i) => (
            <TiltCard3D
              key={i}
              className="tool-card w-36 h-44 sm:w-40 sm:h-48 md:w-44 md:h-52 rounded-[24px] bg-[#060c17] border border-[#14243b] p-5 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_12px_35px_rgba(0,100,255,0.18)] group cursor-pointer"
            >
              <div style={{ transform: "translateZ(25px)" }} className="flex flex-col items-center gap-4">
                {tool.icon}
                <span className="font-satoshi text-xs md:text-sm text-slate-300 font-medium text-center group-hover:text-white transition-colors">
                  {tool.name}
                </span>
              </div>
            </TiltCard3D>
          ))}
        </div>

      </div>
    </section>
  );
}
