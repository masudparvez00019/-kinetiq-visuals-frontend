"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductsCta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".products-cta-card",
      { y: 50, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-20 px-5 md:px-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full products-cta-card rounded-[32px] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
        
        {/* Left Column (Vibrant Blue side) */}
        <div className="flex-[1.1] bg-[#005cfa] bg-gradient-to-br from-[#0066ff] to-[#004cd9] p-10 md:p-12 lg:p-16 flex flex-col justify-center gap-6 text-white">
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] leading-[1.2] tracking-wide">
            Need a Custom <br className="hidden md:inline" /> Asset Pack?
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-white/85 leading-relaxed font-light max-w-[480px]">
            Can't find exactly what you're looking for? We create custom asset packs tailored to your project, brand, and creative requirements. Get the specific resources you need, organized and ready for production.
          </p>
          
          {/* Action Row */}
          <div className="flex items-center gap-3 mt-2">
            <button className="bg-black hover:bg-zinc-900 text-white font-heading font-normal text-xs md:text-sm px-7 py-3.5 rounded-full transition-colors shadow-lg">
              Book a Free Strategy Call
            </button>
            <button className="w-12 h-12 rounded-full bg-black hover:bg-zinc-900 text-white flex items-center justify-center transition-colors shadow-lg">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column (Illustration side) */}
        <div className="flex-1 bg-[#05060b] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden min-h-[300px]">
          {/* Circular Glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 blur-[80px] pointer-events-none rounded-full" />
          
          <img
            src="/custom-pack-illustration.png"
            alt="Custom Pack Specifications"
            className="w-full max-w-[400px] object-contain relative z-10 animate-pulse-slow"
            style={{ animationDuration: '4s' }}
          />
        </div>

      </div>
    </section>
  );
}
