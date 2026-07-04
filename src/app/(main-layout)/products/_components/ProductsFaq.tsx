"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPlus, FiMinus } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "1. What's included in the asset packs?",
    answer: "Each pack includes professionally crafted resources such as transitions, motion graphics, sound effects, LUTs, overlays, templates, and other creative assets depending on the product. Our assets are designed for popular creative tools including Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, and more. Compatibility details are listed on each product page.",
  },
  {
    question: "What types of video editing services do you offer?",
    answer: "We offer reels/shorts editing, drone mapping overlays, custom corporate explainers, high-end YouTube video production, and property walkthrough videos.",
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Our standard turnaround time is 48 hours for standard social reels and property walkthroughs. Highly complex explainers or CGI integrations can take up to 4-5 business days.",
  },
  {
    question: "What is your pricing structure for video editing?",
    answer: "We offer transparent project-based pricing starting at $249 per project, as well as customized monthly retainer packages for active content creators.",
  },
];

interface ProductsFaqProps {
  faqs?: FaqItem[];
  gradientIdPrefix?: string;
}

export default function ProductsFaq({ faqs, gradientIdPrefix = "products" }: ProductsFaqProps) {
  const FAQS = faqs ?? DEFAULT_FAQS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first one by default as shown in the UI image
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Reveal header
    gsap.fromTo(
      ".products-faq-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Staggered accordion lines entry
    gsap.fromTo(
      ".products-faq-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".products-faq-wrapper",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  // Make sure the first open index answer height is set on mount
  useEffect(() => {
    if (openIndex !== null && answerRefs.current[openIndex]) {
      const activeEl = answerRefs.current[openIndex];
      if (activeEl) {
        gsap.set(activeEl, { height: "auto", opacity: 1 });
      }
    }
  }, []);

  const toggleFaq = (idx: number) => {
    const isOpening = openIndex !== idx;
    
    // Animate closing of currently open accordion
    if (openIndex !== null) {
      const prevAnswer = answerRefs.current[openIndex];
      if (prevAnswer) {
        gsap.to(prevAnswer, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      }
    }

    // Animate opening of the new accordion
    if (isOpening) {
      const curAnswer = answerRefs.current[idx];
      if (curAnswer) {
        gsap.set(curAnswer, { height: "auto" });
        const height = curAnswer.scrollHeight;
        gsap.fromTo(
          curAnswer,
          { height: 0, opacity: 0 },
          { height: height, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
      setOpenIndex(idx);
    } else {
      setOpenIndex(null);
    }
  };

  return (
    <section ref={containerRef} className="products-faq-section w-full bg-[#020205] py-24 px-5 md:px-12 relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col gap-4 items-center select-none products-faq-header">
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[40px] text-white leading-tight tracking-wide">
            Have any questions? <br />
            Read popular answers below
          </h2>
        </div>

        {/* FAQ Accordion List Wrapper */}
        <div className="products-faq-wrapper flex flex-col gap-4 w-full">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`products-faq-item rounded-xl transition-all duration-500 relative overflow-hidden ${
                  isOpen 
                    ? "bg-[#000716] bg-gradient-to-b from-[#12233F]/20 to-[#000716]/80 text-white shadow-2xl" 
                    : "bg-white text-black"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left gap-4 select-none cursor-pointer"
                >
                  <span className={`text-sm md:text-[17px] font-satoshi font-bold transition-colors duration-300 ${isOpen ? "text-white" : "text-black"}`}>
                    {faq.question}
                  </span>
                  
                  <div className={`transition-colors duration-300 ${isOpen ? "text-white" : "text-black"} shrink-0`}>
                    {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                  </div>
                </button>

                {/* Collapsible Answer container */}
                <div
                  ref={(el) => {
                    answerRefs.current[idx] = el;
                  }}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="px-8 pb-6 text-xs md:text-sm text-slate-300 leading-relaxed font-satoshi font-light">
                    {faq.answer}
                  </div>
                </div>

                {/* Bottom Tapered SVG Lens Border (Only rendered on expanded active card) */}
                {isOpen && (
                  <svg className="origin-center absolute bottom-0 left-6 right-6 w-[calc(100%-48px)] h-[2.5px] pointer-events-none" viewBox="0 0 100 2.5" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`faq-glow-grad-${gradientIdPrefix}-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                        <stop offset="20%" stopColor="#504EEA" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="80%" stopColor="#504EEA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,1.25 Q 50,0 100,1.25 Q 50,2.5 0,1.25 Z" fill={`url(#faq-glow-grad-${gradientIdPrefix}-${idx})`} />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
