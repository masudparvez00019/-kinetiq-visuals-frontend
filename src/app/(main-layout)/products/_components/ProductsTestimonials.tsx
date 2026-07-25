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

const PRODUCTS_TESTIMONIALS_SPOTLIGHT_CSS = `
  .testimonial-card-element {
    position: relative;
    overflow: hidden;
    transform: perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
    transition: transform 0.15s ease-out;
    transform-style: preserve-3d;
  }
  .testimonial-card-element::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: radial-gradient(
      350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(255, 255, 255, 0.25),
      transparent 60%
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 2;
  }
  .testimonial-card-element:hover::before {
    opacity: 1;
  }
  .testimonial-cursor-glow-element {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(0, 128, 255, 0.12),
      transparent 80%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  .testimonial-card-element:hover .testimonial-cursor-glow-element {
    opacity: 1;
  }
`;

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (-(y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", `0deg`);
    card.style.setProperty("--rotate-y", `0deg`);
  };

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
      {/* Inject Spotlight CSS */}
      <style>{PRODUCTS_TESTIMONIALS_SPOTLIGHT_CSS}</style>

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
            <h2 className="font-heading font-normal text-xl sm:text-2xl md:text-[36px] lg:text-[44px] text-white leading-[1.2] tracking-wide max-w-[920px]">
              Our templates and <br className="hidden sm:block" />
              resources help creators <br className="hidden sm:block" />
              work faster and achieve <br className="hidden sm:block" />
              better results.
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(44,130,245,0.2)]"
              style={{
                border: "1.5px solid transparent",
                background: "linear-gradient(#070914, #070914) padding-box, linear-gradient(135deg, #032688, #2c82f5) border-box"
              }}
            >
              <ChevronLeft className="w-5 h-5 text-white stroke-[2]" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex >= getMaxIndex()}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(44,130,245,0.2)]"
              style={{
                border: "1.5px solid transparent",
                background: "linear-gradient(#070914, #070914) padding-box, linear-gradient(135deg, #032688, #2c82f5) border-box"
              }}
            >
              <ChevronRight className="w-5 h-5 text-white stroke-[2]" />
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
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="testimonial-card-element w-[calc(100vw-40px)] sm:w-[calc((100vw-120px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 bg-[#020309] border border-white/20 rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[310px] group transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(0,128,255,0.15)] cursor-pointer"
              >
                {/* Top-Left Blue Gradient Glow (Figma UI Match) */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0066ff]/85 via-[#0044cc]/25 via-45% to-transparent pointer-events-none z-0" />

                {/* SVG Quote Icon (Exact Geometric Match: Vertical rectangle with diagonal bottom cut) */}
                <div className="relative z-10 pt-1">
                  <svg className="w-10 h-8 text-white drop-shadow-md shrink-0" viewBox="0 0 44 32" fill="currentColor">
                    <path d="M 0 0 H 16 V 17.5 L 0 32 Z M 24 0 H 40 V 17.5 L 24 32 Z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-[#F2F5FA] opacity-95 text-sm md:text-base leading-relaxed font-satoshi font-light mt-5 relative z-10 flex-grow">
                  "{item.quote}"
                </p>

                {/* Profile Block (One Line Name & Role with Truncate + Hover Full Name) */}
                <div className="flex items-center gap-3.5 mt-6 relative z-10 w-full overflow-hidden">
                  <img
                    src={item.avatar}
                    className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
                    alt={item.name}
                  />
                  <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
                    <span
                      title={item.name}
                      className="font-heading font-semibold text-sm md:text-base text-white tracking-wide truncate max-w-[130px] sm:max-w-[150px] group-hover:max-w-none group-hover:overflow-visible transition-all duration-300 shrink-0"
                    >
                      {item.name}
                    </span>
                    <div className="w-2.5 h-2.5 bg-[#0080ff] shrink-0" />
                    <span className="font-satoshi text-xs md:text-sm text-[#d0d4e4] font-normal whitespace-nowrap shrink-0">
                      {item.role}
                    </span>
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
