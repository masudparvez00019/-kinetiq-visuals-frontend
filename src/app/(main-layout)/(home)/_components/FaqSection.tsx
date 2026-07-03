"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPlus, FiMinus } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    question: "What video editing services do you provide?",
    answer: "We provide a comprehensive range of video editing services tailored to meet your needs. Our offerings include social media video edits, promotional video production, real estate video editing, and corporate video editing. Each service is designed to enhance your content and engage your audience effectively. For a detailed overview of our services, please check our Services page.",
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

export default function FaqSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first one by default as shown in 2nd image
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Reveal header
    gsap.fromTo(
      ".faq-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Staggered accordion lines entry
    gsap.fromTo(
      ".faq-accordion-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list-wrapper",
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
    <section
      ref={containerRef}
      className="w-full py-24 bg-[#020205] px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-16 relative z-10">
        
        {/* Section Header with Overlapping Emblem badges */}
        <div className="text-center flex flex-col gap-8 items-center select-none">
          {/* Emblem Badges */}
          <div className="faq-header flex items-center justify-center select-none">
            {/* Left Circle: Your RAW Footage */}
            <div className="w-[136px] h-[136px] rounded-full bg-gradient-to-b from-[#4F46E5] to-[#001A49] flex flex-col items-center justify-center text-center p-4 text-white z-10 select-none">
              <span className="text-[12px] md:text-[14px] font-satoshi font-light opacity-95 leading-tight">Your RAW</span>
              <span className="text-[14px] md:text-[16px] font-satoshi font-bold leading-tight mt-0.5">Footage</span>
            </div>
            
            {/* Right Circle: KQ Visuals */}
            <div className="w-[136px] h-[136px] rounded-full bg-gradient-to-b from-[#4F46E5] to-[#001A49] border-[4px] border-[#020205] flex flex-col items-center justify-center text-center p-4 text-white -ml-[24px] z-20 shadow-[0_0_35px_rgba(79,70,229,0.25)] select-none">
              <span className="font-heading font-normal text-[26px] md:text-[30px] leading-none tracking-tight">KQ</span>
              <span className="text-[10px] md:text-[11px] font-satoshi font-bold uppercase tracking-widest mt-1.5 leading-none">Visuals</span>
            </div>
          </div>

          <h2 className="faq-header font-heading font-normal text-2xl sm:text-3xl md:text-[40px] text-white leading-tight tracking-wide">
            Have any questions? <br />
            Read popular answers below
          </h2>
        </div>

        {/* FAQ Accordion List Wrapper */}
        <div className="faq-list-wrapper flex flex-col gap-4 w-full">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-accordion-item rounded-xl transition-all duration-500 relative overflow-hidden ${
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
                      <linearGradient id={`faq-glow-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                        <stop offset="20%" stopColor="#504EEA" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="80%" stopColor="#504EEA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,1.25 Q 50,0 100,1.25 Q 50,2.5 0,1.25 Z" fill={`url(#faq-glow-grad-${idx})`} />
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
