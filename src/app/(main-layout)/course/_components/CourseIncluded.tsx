"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      {/* Subtle center glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center gap-10 relative z-10">

        {/* Header */}
        <div className="included-header flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
            <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
              Included in
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[48px] text-white leading-[1.1] tracking-wide">
            What's Included in This Course
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[620px] text-center">
            Unlock your video editing journey with Lifetime Access, Downloadable Assets, and real-world Project Files. Get Free Future Updates, access exclusive Community Assets, and earn a Certification upon completion.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="included-pills-row flex flex-wrap justify-center gap-3">
          {INCLUDES.map((item, i) => (
            <div
              key={i}
              className="included-pill px-5 py-2.5 rounded-full border border-white/10 bg-[#070914] text-slate-300 font-satoshi text-xs md:text-sm font-medium hover:border-blue-500/40 hover:text-white transition-all duration-300 cursor-default select-none"
            >
              {item}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="included-cta flex items-center gap-3">
          <button className="bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-sm px-10 py-3.5 rounded-full transition-colors shadow-[0_0_24px_rgba(0,128,255,0.40)] whitespace-nowrap">
            Enroll Now
          </button>
          <button className="w-12 h-12 rounded-full bg-[#0080ff] hover:bg-[#0070e6] text-white flex items-center justify-center transition-colors shadow-[0_0_18px_rgba(0,128,255,0.30)]">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
