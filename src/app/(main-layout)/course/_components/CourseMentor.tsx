"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useAppStore } from "@/context/store";

export default function CourseMentor() {
  const { siteConfig } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const MENTOR_STATS = [
    { value: siteConfig.mentorExp,    label: "Years Experience" },
    { value: siteConfig.mentorProj,  label: "Projects Delivered" },
    { value: siteConfig.mentorStud, label: "Students Trained" },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".mentor-card",
      { y: 50, opacity: 0, scale: 0.98 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".mentor-info > *",
      { x: 20, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".mentor-card", start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">

        {/* Main Mentor Card */}
        <div className="mentor-card relative w-full rounded-3xl overflow-hidden border border-blue-500/15 shadow-[0_0_60px_rgba(0,60,200,0.12)] flex flex-col md:flex-row">

          {/* Left: Photo */}
          <div className="relative w-full md:w-[40%] min-h-[300px] md:min-h-[380px] flex-shrink-0 bg-[#060b1a] overflow-hidden">
            {/* Blue radial glow behind photo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,80,200,0.35)_0%,_rgba(2,3,16,0.95)_70%)] z-0" />
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop&crop=face,top"
              alt={siteConfig.mentorName}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-90 z-10"
            />
            {/* Right edge gradient to blend with card */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060c1e] to-transparent z-20 hidden md:block" />
          </div>

          {/* Right: Info Content */}
          <div
            className="mentor-info relative flex flex-col justify-center gap-5 px-8 py-10 md:px-12 md:py-12 flex-1"
            style={{ background: "linear-gradient(135deg, #060c1e 0%, #070914 100%)" }}
          >
            {/* Blue glow top-right */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/8 blur-[80px] pointer-events-none rounded-full" />

            {/* Label */}
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
              <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
                Your Mentor
              </span>
            </div>

            {/* Name */}
            <h2 className="font-heading font-normal text-3xl md:text-4xl lg:text-[48px] text-white leading-none tracking-wide relative z-10">
              {siteConfig.mentorName}
            </h2>

            {/* Title */}
            <p className="font-satoshi text-sm text-[#0080ff] font-medium tracking-wide relative z-10">
              {siteConfig.mentorTitle}
            </p>

            {/* Bio */}
            <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[460px] relative z-10">
              {siteConfig.mentorBio}
            </p>

            {/* Stats Row */}
            <div className="flex items-stretch bg-[#0a0d1a] border border-white/5 rounded-2xl overflow-hidden mt-2 relative z-10 self-start w-full max-w-[420px]">
              {MENTOR_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-col items-center justify-center py-4 px-3 gap-1 ${
                    i < MENTOR_STATS.length - 1 ? "border-r border-white/5" : ""
                  }`}
                >
                  <span className="font-heading font-semibold text-lg md:text-2xl text-[#0080ff] leading-none">
                    {stat.value}
                  </span>
                  <span className="font-satoshi text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
