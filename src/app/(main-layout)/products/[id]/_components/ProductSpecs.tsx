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
      className="w-full bg-[#000000] border-t border-b border-white/5 py-20 px-5 md:px-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-stretch gap-10 lg:gap-12">
        {SPECS.map((spec, index) => (
          <React.Fragment key={index}>
            {/* Feature Block */}
            <div className="spec-item-block flex flex-col flex-1 gap-3 max-w-[380px] text-left">
              <h3 className="font-satoshi font-medium text-[#70a3f3] text-lg md:text-[22px] tracking-normal">
                {spec.title}
              </h3>
              <p className="font-satoshi text-xs md:text-[14px] text-[#c4ceea] leading-[1.65] font-light mt-1">
                {spec.description}
              </p>
            </div>

            {/* Vertical Shiny Lens Separator (rendered between columns on desktop) */}
            {index < SPECS.length - 1 && (
              <div
                className="hidden lg:block w-[1.5px] shrink-0 self-stretch my-1"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(80,78,234,0.1) 15%, rgba(80,78,234,0.8) 35%, #FFFFFF 50%, rgba(80,78,234,0.8) 65%, rgba(80,78,234,0.1) 85%, transparent 100%)"
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
