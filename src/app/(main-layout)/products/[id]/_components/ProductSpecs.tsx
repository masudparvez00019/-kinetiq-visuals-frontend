"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SPECS = [
  {
    title: "Royalty-Free License",
    description: "Use every sound with confidence. All assets come with a royalty-free license, making them suitable for commercial and personal projects."
  },
  {
    title: "Ready for Any Project",
    description: "Perfect for trailers, YouTube videos, advertisements, films, podcasts, and social media content."
  },
  {
    title: "Curated by Professionals",
    description: "Carefully selected and organized assets to help creators streamline their workflow, save time, and produce high-quality content with ease."
  }
];

export default function ProductSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".spec-item-block",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] border-t border-b border-white/5 py-20 px-5 md:px-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-stretch gap-10 lg:gap-8">
        {SPECS.map((spec, index) => (
          <React.Fragment key={index}>
            {/* Feature Block */}
            <div className="spec-item-block flex flex-col flex-1 gap-4 max-w-[380px]">
              <h3 className="font-heading font-normal text-[#0080ff] text-base md:text-lg tracking-wide uppercase">
                {spec.title}
              </h3>
              <p className="font-satoshi text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                {spec.description}
              </p>
            </div>

            {/* Separator (rendered between elements, only visible on desktop) */}
            {index < SPECS.length - 1 && (
              <div className="hidden lg:block w-[1px] h-auto bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
