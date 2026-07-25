"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";

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
      className="w-full bg-[#000000] py-20 px-5 md:px-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto w-full products-cta-card lg:h-[409px] rounded-[30px] border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        
        {/* Left Column (Vibrant Blue side - Figma Linear Gradient: to bottom #0D5FD4 -> #133C8B) */}
        <div className="bg-gradient-to-b from-[#0D5FD4] to-[#133C8B] p-10 md:p-12 lg:p-14 flex flex-col justify-center text-white h-full">
          <h2 className="font-heading font-normal text-3xl sm:text-4xl md:text-[40px] leading-[1.18] tracking-normal mb-5">
            Need a Custom <br className="hidden sm:inline" /> Asset Pack?
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-white/90 leading-[1.65] font-light max-w-[500px] mb-7">
            Can't find exactly what you're looking for? We create custom asset packs tailored to your project, brand, and creative requirements. Get the specific resources you need, organized and ready for production.
          </p>
          
          {/* Action Row */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="bg-[#070D1B] hover:bg-black text-white font-satoshi font-semibold text-xs md:text-sm px-8 py-3.5 rounded-full transition-colors shadow-lg cursor-pointer inline-flex items-center justify-center">
              Book a Free Strategy Call
            </Link>
            <Link href="/contact" className="w-12 h-12 rounded-full bg-[#070D1B] hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Column (3D Custom Pack Illustration side - Full Cover Image) */}
        <div className="relative w-full h-full min-h-[300px] lg:min-h-full overflow-hidden bg-[#04060c]">
          <img
            src="/custom-pack-illustration.png"
            alt="Custom Asset Pack Illustration"
            className="w-full h-full object-cover object-center relative z-10 transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

      </div>
    </section>
  );
}
