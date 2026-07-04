"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
    name: "Sara Austin",
    role: "Senior Video Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    quote: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
    name: "Sara Austin",
    role: "Senior Video Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    quote: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
    name: "Sara Austin",
    role: "Senior Video Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 4,
    quote: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
    name: "Sara Austin",
    role: "Senior Video Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 5,
    quote: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
    name: "Sara Austin",
    role: "Senior Video Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function ProductsTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMaxIndex = () => {
    if (windowWidth < 640) return TESTIMONIALS.length - 1;
    if (windowWidth < 1024) return TESTIMONIALS.length - 2;
    return TESTIMONIALS.length - 3;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, getMaxIndex()));
  };

  useGSAP(() => {
    gsap.fromTo(
      ".testimonials-header-block",
      { y: 35, opacity: 0 },
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

    gsap.fromTo(
      ".testimonial-card-element",
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-slider-track-container",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  // Slide track calculations
  const gap = 24;
  let translateValue = 0;
  if (windowWidth > 0) {
    if (windowWidth < 640) {
      // Mobile (full-width cards, subtracting container padding)
      const containerPadding = 40; // px-5 is 20px on each side
      const cardWidth = windowWidth - containerPadding;
      translateValue = activeIndex * (cardWidth + gap);
    } else if (windowWidth < 1024) {
      // Tablet (2 cards visible, subtracting container padding)
      const containerPadding = 96; // px-12 is 48px on each side
      const containerWidth = Math.min(windowWidth - containerPadding, 1280);
      const cardWidth = (containerWidth - gap) / 2;
      translateValue = activeIndex * (cardWidth + gap);
    } else {
      // Desktop (3 cards visible, subtracting container padding)
      const containerPadding = 96; // px-12 is 48px on each side
      const containerWidth = Math.min(windowWidth - containerPadding, 1280);
      const cardWidth = (containerWidth - (gap * 2)) / 3;
      translateValue = activeIndex * (cardWidth + gap);
    }
  }

  return (
    <section ref={containerRef} className="products-testimonials-section w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-14">
        
        {/* Header Block */}
        <div className="testimonials-header-block w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0">
          
          <div className="flex flex-col gap-4">
            {/* Sub-heading */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
              <span className="font-heading font-normal text-xs uppercase tracking-widest text-[#F2F5FA] opacity-80">
                Trusted by Thousands of Creators
              </span>
            </div>
            {/* Title */}
            <h2 className="font-heading font-normal text-xl sm:text-2xl md:text-[36px] lg:text-[44px] text-white leading-[1.2] tracking-wide max-w-[800px]">
              Our templates and resources help creators work faster and achieve better results.
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-11 h-11 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex >= getMaxIndex()}
              className="w-11 h-11 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Testimonials Slider viewport */}
        <div className="testimonial-slider-track-container w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translateValue}px)`,
              gap: `${gap}px`
            }}
          >
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="testimonial-card-element w-[calc(100vw-40px)] sm:w-[calc((100vw-120px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 bg-[#070914] border border-white/5 rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px] group transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Glow & Quote Icon */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent blur-xl pointer-events-none rounded-full" />
                
                {/* SVG Quote Icon */}
                <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.985v1.272c-4.084 1.157-6.902 4.195-7.29 8.243h6.273v8.861h-8zm-14 0v-7.391c0-5.704 3.748-9.762 9-10.985v1.272c-4.084 1.157-6.902 4.195-7.29 8.243h6.273v8.861h-8z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-[#F2F5FA] opacity-90 text-sm md:text-base leading-relaxed font-satoshi font-light mt-6 relative z-10 flex-grow">
                  "{item.quote}"
                </p>

                {/* Profile block */}
                <div className="flex items-center gap-3.5 mt-8 relative z-10">
                  <img
                    src={item.avatar}
                    className="w-11 h-11 rounded-full object-cover border border-white/10"
                    alt={item.name}
                  />
                  <div className="flex flex-col">
                    <span className="font-satoshi font-semibold text-sm md:text-base text-white tracking-wide">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-500 shrink-0" />
                      <span className="font-satoshi text-xs text-slate-400 font-light">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
