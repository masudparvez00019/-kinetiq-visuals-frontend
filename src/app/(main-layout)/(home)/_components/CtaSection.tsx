"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TAGS = ["Travel", "Cooking", "Fitness", "Gardening", "Tech Reviews"];

const CTA_STYLE_CSS = `
  .cta-tag-pill {
    position: relative;
    background: #070D1B !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .cta-tag-pill:hover {
    transform: translateY(-3px);
    background: #0f1a35 !important;
    box-shadow: 0 10px 25px rgba(44, 130, 245, 0.2);
  }
  .cta-tag-pill svg {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    opacity: 0.85;
  }
  .cta-tag-pill:hover svg {
    transform: scaleX(1.1);
    opacity: 1;
  }
`;

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    // Animate the tapered SVG lens borders horizontally from the center
    tl.fromTo(
      ".cta-border-line-svg",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" }
    );

    // Stagger layout fade-up
    tl.fromTo(
      ".cta-fade-item",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-[#000000] px-4 sm:px-6 md:px-12 relative overflow-hidden"
    >
      {/* Inject custom CSS */}
      <style>{CTA_STYLE_CSS}</style>

      {/* Background Ambient Glow Behind Glass Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[450px] bg-gradient-to-r from-blue-600/25 via-indigo-600/15 to-cyan-500/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Transparent Glossy Glass Container */}
      <div className="max-w-[1360px] mx-auto w-full py-12 md:py-16 px-6 md:px-14 flex flex-col gap-8 relative z-10 text-left bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-black/40 backdrop-blur-2xl rounded-[32px]  shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_inset_0_-1px_1px_rgba(0,0,0,0.5),_0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Top Specular Edge Highlight Line */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" />

        {/* Top Half Glossy Glass Reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none rounded-t-[32px]" />

        {/* Top Tapered Lens Border */}
        <svg className="cta-border-line-svg origin-center absolute top-0 left-0 w-full h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cta-glow-grad-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
              <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cta-pill-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
              <stop offset="25%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="75%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#cta-glow-grad-top)" />
        </svg>

        {/* Subtitle */}
        <div className="cta-fade-item flex items-center gap-2 text-white font-heading font-normal tracking-wide text-xs md:text-sm select-none relative z-10">
          <span className="w-2.5 h-2.5 bg-blue-500 shrink-0" />
          <span>Let's Create Engaging Contents</span>
        </div>

        {/* Main Heading */}
        <h2 className="cta-fade-item font-heading font-normal text-2xl sm:text-3xl md:text-[40px] lg:text-[44px] text-white leading-tight tracking-wide max-w-5xl select-none relative z-10">
          Ready to Turn Raw Footage <br />
          Into High-Performing <br />
          Content?
        </h2>

        {/* Description */}
        <p className="cta-fade-item font-satoshi text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mt-2 select-none relative z-10">
          In today's crowded digital landscape, great content alone isn't enough—presentation matters. <br className="hidden md:inline" />
          Professionally edited videos help your brand stand out, communicate your message clearly, and <br className="hidden md:inline" />
          keep viewers engaged from the first second to the last.
        </p>

        {/* Bottom Area: Tags & Buttons */}
        <div className="cta-fade-item flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-6 w-full relative z-10">
          {/* Tags List (Left Column) */}
          <div className="flex flex-wrap gap-3 max-w-2xl">
            {TAGS.map((tag, idx) => (
              <span
                key={idx}
                className="cta-tag-pill px-6 py-3 rounded-[30px] text-sm font-satoshi font-medium text-white transition-all duration-300 cursor-default select-none relative"
              >
                {/* Top Mini Tapered SVG Lens Border */}
                <svg className="absolute top-0 left-4 right-4 w-[calc(100%-32px)] h-[1.5px] pointer-events-none" viewBox="0 0 100 1.5" preserveAspectRatio="none">
                  <path d="M 0,0.75 Q 50,0 100,0.75 Q 50,1.5 0,0.75 Z" fill="url(#cta-pill-grad)" />
                </svg>

                {tag}

                {/* Bottom Mini Tapered SVG Lens Border */}
                <svg className="absolute bottom-0 left-4 right-4 w-[calc(100%-32px)] h-[1.5px] pointer-events-none" viewBox="0 0 100 1.5" preserveAspectRatio="none">
                  <path d="M 0,0.75 Q 50,0 100,0.75 Q 50,1.5 0,0.75 Z" fill="url(#cta-pill-grad)" />
                </svg>
              </span>
            ))}
          </div>

          {/* Action CTA Buttons (Right Column) */}
          <div className="flex items-center gap-3 shrink-0 select-none">
            <Link
              href="#services"
              className="px-8 py-3.5 bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white rounded-full font-satoshi font-semibold text-sm tracking-wide hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Get Started Today
            </Link>
            
            <Link
              href="#services"
              className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white flex items-center justify-center hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <FiArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        {/* Bottom Tapered Lens Border */}
        <svg className="cta-border-line-svg origin-center absolute bottom-0 left-0 w-full h-[3.5px] pointer-events-none" viewBox="0 0 100 3.5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cta-glow-grad-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
              <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#cta-glow-grad-bottom)" />
        </svg>

      </div>
    </section>
  );
}
