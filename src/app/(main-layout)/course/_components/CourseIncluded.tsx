"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INCLUDES = [
  "Lifetime Access",
  "Downloadable Assets",
  "Project Files",
  "Future Updates",
  "Community Assets",
  "Certification",
];

export default function CourseIncluded() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".included-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".included-pill",
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".included-pills-row", start: "top 88%" },
      }
    );
    gsap.fromTo(
      ".included-cta",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".included-cta", start: "top 92%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Center ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center gap-12 relative z-10">

        {/* Header */}
        <div className="included-header flex flex-col items-center text-center gap-4">
          {/* Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
            <span className="font-heading font-normal text-xs md:text-sm text-white tracking-normal select-none">
              Included in
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading font-normal text-3xl sm:text-4xl md:text-[52px] text-white leading-tight tracking-normal mt-1">
            What's Included in This Course
          </h2>

          {/* Subtitle */}
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[760px] text-center mt-1">
            Unlock your video editing journey with Lifetime Access, Downloadable Assets, and real-world Project Files. Get Free Future Updates, access exclusive Community Assets, and earn a Certification upon completion.
          </p>
        </div>

        {/* Feature Pills Row */}
        <div className="included-pills-row flex flex-wrap justify-center items-center gap-3.5">
          {INCLUDES.map((item, i) => (
            <div
              key={i}
              className="included-pill relative overflow-hidden px-6 py-2.5 rounded-full border border-[#142642] bg-[#070e1b] text-slate-200 font-satoshi text-xs md:text-sm font-medium transition-all duration-300 hover:border-blue-500/50 hover:text-white shadow-md cursor-default select-none group"
            >
              {/* Special Top Shiny Border Line */}
              <svg className="absolute top-0 left-3 right-3 w-[calc(100%-24px)] h-[2px] pointer-events-none" viewBox="0 0 100 2" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`pill-glow-top-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="20%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="80%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,1 Q 50,0 100,1 Q 50,2 0,1 Z" fill={`url(#pill-glow-top-${i})`} />
              </svg>

              {/* Special Bottom Shiny Border Line */}
              <svg className="absolute bottom-0 left-3 right-3 w-[calc(100%-24px)] h-[2px] pointer-events-none" viewBox="0 0 100 2" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`pill-glow-bottom-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="20%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="80%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,1 Q 50,0 100,1 Q 50,2 0,1 Z" fill={`url(#pill-glow-bottom-${i})`} />
              </svg>

              <span className="relative z-10">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="included-cta flex items-center gap-3.5 mt-2">
          <Link href="/contact" className="bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white font-satoshi font-semibold text-sm md:text-base px-10 py-3.5 rounded-full cursor-pointer whitespace-nowrap inline-flex items-center justify-center">
            Enroll Now
          </Link>
          <Link href="/contact" className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white flex items-center justify-center cursor-pointer shrink-0">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
