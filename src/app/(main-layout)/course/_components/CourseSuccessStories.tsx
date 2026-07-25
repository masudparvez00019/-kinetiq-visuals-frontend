"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORIES = [
  {
    name: "JAMES CARTER",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+250%", label: "Client Growth" },
      { value: "$0-%7K", label: "Monthly Revenue" },
    ],
  },
  {
    name: "SOPHIA LEE",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+175%", label: "Client Growth" },
      { value: "$1K-$10K", label: "Monthly Revenue" },
    ],
  },
  {
    name: "MICHAEL SMITH",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+300%", label: "Client Growth" },
      { value: "$3K-$15K", label: "Monthly Revenue" },
    ],
  },
];

function TiltCard3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 14; // 14 deg tilt on X axis
    const rotateY = (x / (rect.width / 2)) * 14; // 14 deg tilt on Y axis

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
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

export default function CourseSuccessStories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".success-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".success-card",
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".success-grid", start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-14 relative z-10">

        {/* Header */}
        <div className="success-header flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
            <span className="font-heading font-normal text-xs md:text-sm text-white tracking-normal select-none">
              Success Stories
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[48px] text-white leading-tight tracking-normal max-w-[850px] mt-2">
            Real Student Results. Real Impact.
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[620px]">
            See how creators transformed their skills and landed real projects after the course.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="success-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <TiltCard3D
              key={i}
              className="success-card group flex flex-col justify-between p-5 md:p-6 rounded-[24px] bg-[#060c17] border border-[#14243b] transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(0,100,255,0.2)] cursor-pointer"
            >
              {/* Card Top & Body Content */}
              <div className="flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
                {/* Photo Inset */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#091524] border border-white/5 shadow-md">
                  <img
                    src={story.photo}
                    alt={story.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h3 className="font-heading font-normal text-sm md:text-base text-[#0080ff] tracking-wider text-center uppercase mt-1">
                  {story.name}
                </h3>

                {/* Quote */}
                <p className="font-satoshi text-xs md:text-sm text-slate-300 font-light leading-relaxed text-center px-1">
                  <span className="text-[#0080ff] text-base font-serif font-bold mr-1">“</span>
                  {story.quote}
                </p>

                {/* Star Rating */}
                <div className="flex items-center justify-center gap-1.5 my-1">
                  {Array.from({ length: story.rating }).map((_, s) => (
                    <svg key={s} viewBox="0 0 16 16" fill="#f59e0b" className="w-4 h-4">
                      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Row */}
              <div className="pt-4 mt-4 border-t border-[#122036] grid grid-cols-2 gap-3" style={{ transform: "translateZ(20px)" }}>
                {story.stats.map((stat, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    {/* Icon Box */}
                    <div className="w-9 h-9 rounded-xl bg-[#091524] border border-[#162d4a] flex items-center justify-center shrink-0 text-[#0080ff] shadow-inner">
                      <TrendingUp className="w-4 h-4 text-[#0080ff]" />
                    </div>
                    {/* Stat values */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-satoshi font-bold text-xs md:text-sm text-white leading-tight">
                        {stat.value}
                      </span>
                      <span className="font-satoshi text-[10px] md:text-xs text-slate-400 font-light leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard3D>
          ))}
        </div>

      </div>
    </section>
  );
}
