"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".contact-hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
    );

    tl.fromTo(
      ".contact-hero-desc",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[55vh] flex flex-col items-center justify-center pt-32 pb-16 px-5 md:px-12 overflow-hidden bg-[#020310]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#0040cc]/25 blur-[130px] rounded-full" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#0066ff]/15 blur-[80px] rounded-full" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-6">
        <h1 className="contact-hero-title font-heading font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-white leading-[1.1] tracking-wide">
          Questions? Ideas? Let's
          <br /> Connect.
        </h1>
        <p className="contact-hero-desc font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[520px]">
          Every great project starts with a conversation. If you're looking for professional video editing, creative support, or simply want to explore what's possible, send us a message. We're always happy to help.
        </p>
      </div>
    </section>
  );
}
