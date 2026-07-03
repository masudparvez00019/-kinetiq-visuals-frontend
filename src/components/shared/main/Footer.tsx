"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Fade in text elements when they scroll into view
    gsap.fromTo(
      footerRef.current?.querySelectorAll(".fade-up-item") || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-20 pb-0 px-6 md:px-12 bg-[#020205] border-t border-white/5 overflow-hidden"
    >
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end relative z-10 pb-8">
        
        {/* Left Side: Socials and Heading */}
        <div className="flex flex-col gap-6 fade-up-item text-left">
          {/* Social Links (Rounded Squares) */}
          <div className="flex gap-4 select-none">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <FaTwitter size={18} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <FaInstagram size={18} />
            </Link>
          </div>

          {/* Heading (White, sentence-case, no gradient) */}
          <h2 className="font-heading font-normal text-3xl sm:text-4xl md:text-[44px] text-white leading-tight tracking-wide mt-2 select-none">
            Let's Create <br />
            Something Worth <br />
            Watching
          </h2>
        </div>

        {/* Right Side: Brand details & Copyright */}
        <div className="flex flex-col md:items-end justify-end h-full fade-up-item select-none text-left md:text-right">
          <div className="flex flex-col md:items-end gap-2">
            <span className="font-heading font-normal text-3xl sm:text-4xl md:text-[38px] tracking-[0.06em] text-white leading-none">
              KQ VISUALS
            </span>
            <p className="text-slate-400 text-sm md:text-base font-satoshi font-light mt-2">
              © KQ Visuals All Rights Reserved {new Date().getFullYear()}
            </p>
          </div>
        </div>

      </div>

      {/* Navigation Menu (Renders directly inside footer layout with relative positioning) */}
      <div className="relative z-20 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 font-satoshi tracking-wide mt-20 mb-10 pb-8 select-none">
        <Link href="#services" className="hover:text-white transition-colors duration-300">Services</Link>
        <Link href="#works" className="hover:text-white transition-colors duration-300">Works</Link>
        <Link href="#process" className="hover:text-white transition-colors duration-300">Process</Link>
        <Link href="#products" className="hover:text-white transition-colors duration-300">Products</Link>
        <Link href="#course" className="hover:text-white transition-colors duration-300">Course</Link>
      </div>

      {/* Planet Horizon Image Asset (Positioned absolutely at the very bottom of the entire footer) */}
      <img
        src="/planet-horizon.png"
        alt="Planet Horizon"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-auto object-contain pointer-events-none z-10"
      />

    </footer>
  );
}
